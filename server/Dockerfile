FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY . /app

RUN npm install mariadb express dotenv

EXPOSE 30000

ENTRYPOINT ["node"]

CMD ["server.js"]
