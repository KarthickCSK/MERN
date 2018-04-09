FROM ubuntu

RUN apt-get update
RUN apt-get -y install git
RUN apt-get -y install npm
RUN apt-get -y install nodejs

WORKDIR /opt/app

COPY . /opt/app

RUN npm install

CMD nodejs server.js
