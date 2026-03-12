const amqplib = require('amqplib');
const { v4: uuidv4 } = require('uuid');
const logger = require('../../modules/logger');

const EXCHANGE = 'hyu.notifier';

let channel = null;

async function init() {
  const url = process.env.MQ_URL || 'amqp://guest:guest@localhost:5672';
  try {
    const conn = await amqplib.connect(url);
    channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
    logger.info('RabbitMQ Connection : success');

    conn.on('error', (err) => logger.error(`[MQ] 연결 오류: ${err.message}`));
    conn.on('close', () => logger.warn('[MQ] 연결 종료'));
  } catch (err) {
    logger.error(`RabbitMQ Connection : error ${err.message}`);
    throw err;
  }
}

async function publish(routingKey, payload) {
  if (!channel) throw new Error('MQ channel not initialized');

  const message = {
    type: routingKey.toUpperCase().replace(/\./g, '_'),
    messageId: uuidv4(),
    timestamp: new Date().toISOString(),
    payload,
  };

  channel.publish(
    EXCHANGE,
    routingKey,
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );

  logger.info(`[MQ PUBLISH] ${routingKey} | messageId: ${message.messageId}`);
  return message.messageId;
}

module.exports = { init, publish };
