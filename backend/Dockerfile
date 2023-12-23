FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD sh -c "npx prisma generate && npx prisma db push && (npx prisma studio & node /app/dist/main.js)"
# CMD sh -c "npx prisma generate && npx prisma db push && npm run start:dev"
