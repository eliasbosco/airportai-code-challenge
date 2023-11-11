FROM node:15.4.0-alpine

# Create app directory
WORKDIR /usr/src/app
ADD . .

#Install NPM packages
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start" ]
