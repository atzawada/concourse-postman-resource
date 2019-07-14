FROM node:8-slim
RUN npm install -g newman
RUN npm install get-stdin

COPY in.js      /opt/resource/in
COPY out.js     /opt/resource/out
COPY check.js   /opt/resource/check

RUN ls /opt/resource

RUN chmod +x /opt/resource/in /opt/resource/out /opt/resource/check

#RUN ls -alrt /usr/bin/env
#RUN /opt/resource/out

