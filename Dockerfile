FROM node:11.9.0
VOLUME /opt/cmaj-legend
ADD . /opt/cmaj-legend
WORKDIR /opt/cmaj-legend
EXPOSE 3000
RUN bash -c 'npm install'
ENTRYPOINT [ "npm", "start" ]
