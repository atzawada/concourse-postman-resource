FROM node:8-slim
RUN npm install -g newman
RUN npm install get-stdin

COPY scripts/in.js      /opt/resource/in
COPY scripts/out.js     /opt/resource/out
COPY scripts/check.js   /opt/resource/check

RUN chmod +x /opt/resource/in /opt/resource/out /opt/resource/check

#RUN /opt/resource/out

