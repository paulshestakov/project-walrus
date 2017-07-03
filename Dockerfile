FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
#COPY package.json /usr/src/app
#RUN cd /usr/src/app; \
#    npm install
RUN cd /usr/src/app
#RUN npm install

EXPOSE 8090

#ENTRYPOINT npm run build & npm run server
ENTRYPOINT npm run server