const amqplib = require('amqplib');
const logger = require('../modules/logger');

const EXCHANGE = 'hyu.notifier';
const QUEUE = 'lms_sync_queue';

async function connect(handlers) {
  const url = process.env.MQ_URL || 'amqp://guest:guest@localhost:5672';
  const conn = await amqplib.connect(url);
  const channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, EXCHANGE, 'lms.sync');

  channel.prefetch(1); // 한 번에 하나씩 처리

  logger.info(`RabbitMQ Consumer : ready [exchange=${EXCHANGE}, queue=${QUEUE}, key=lms.sync]`);

  channel.consume(QUEUE, async (msg) => {
    if (!msg) return;

    let content;
    try {
      content = JSON.parse(msg.content.toString());
    } catch (e) {
      logger.error(`[MQ] 메시지 파싱 실패: ${e.message}`);
      channel.nack(msg, false, false); // 파싱 불가 → 폐기
      return;
    }

    logger.info(`[MQ RECEIVE] type=${content.type} | messageId=${content.messageId}`);

    const handler = handlers[content.type];
    if (!handler) {
      logger.warn(`[MQ] 알 수 없는 메시지 타입: ${content.type}`);
      channel.nack(msg, false, false); // 폐기
      return;
    }

    try {
      await handler(content);
      channel.ack(msg);
    } catch (e) {
      logger.error(`[MQ] 핸들러 처리 실패 (type=${content.type}): ${e.message}`);
      channel.nack(msg, false, true); // 재큐
    }
  });

  conn.on('error', (err) => logger.error(`[MQ] 연결 오류: ${err.message}`));
  conn.on('close', () => {
    logger.warn('[MQ] 연결 종료. 재연결 시도...');
    setTimeout(() => connect(handlers), 5000);
  });
}

module.exports = { connect };
