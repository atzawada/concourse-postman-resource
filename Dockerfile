FROM node:8-alpine
RUN npm install -g newman

COPY in.js      /in
COPY out.js     /out
COPY check.js   /check

RUN chmod +x /in /out /check

RUN apk add --no-cache
ARG PYTHON_VERSION='3.7.0'


