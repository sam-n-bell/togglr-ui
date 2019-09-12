FROM node:8.11.3-alpine as node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app

ENV HOST 0.0.0.0
ENV NODE_ENV production
EXPOSE 3000

RUN npm run build

ENV USER=runner \
    UID=10001 \
    GID=10001

RUN addgroup -g "$GID" "$USER" \
    && adduser \
    -D \
    -g "" \
    -G "$USER" \
    -u "$UID" \
    "$USER"

RUN chown "$USER" /app

USER "$USER"

ENTRYPOINT ["npm"]

CMD ["start"]
