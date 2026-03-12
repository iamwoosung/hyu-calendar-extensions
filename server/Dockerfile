# node:20-alpine : Node.js 20 + Alpine Linux (경량 이미지, 약 50MB)
# Alpine 기반이라 빌드/배포 속도가 빠름
FROM node:20-alpine

WORKDIR /app

# package.json을 소스코드보다 먼저 복사하는 이유:
# Docker는 레이어 단위로 캐시함. package.json이 안 바뀌면
# npm ci 결과를 캐시에서 재사용 → 코드 수정 시 빌드 속도 대폭 단축
COPY package*.json ./
RUN npm ci --only=production

# 소스코드 복사 (node_modules는 위에서 이미 설치됨)
COPY . .

EXPOSE 3000

CMD ["node", "src/app.js", "production"]
