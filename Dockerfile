FROM node:8-alpine
RUN npm install -g newman
RUN npm install get-stdin

COPY in.js      /opt/resource/in
COPY out.js     /opt/resource/out
COPY check.js   /opt/resource/check

RUN chmod +x /opt/resource/in /opt/resource/out /opt/resource/check
