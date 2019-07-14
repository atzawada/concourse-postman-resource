FROM node:8-alpine
RUN npm install -g newman
RUN npm install get-stdin

COPY in.js      /in
COPY out.js     /out
COPY check.js   /check

RUN chmod +x /in /out /check
