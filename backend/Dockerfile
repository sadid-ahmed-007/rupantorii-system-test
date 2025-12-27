FROM node:18-bullseye-slim

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN npm install
RUN npm run prisma:generate

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
