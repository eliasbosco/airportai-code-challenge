# NodeJS Skeleton for Airport AI

This repository includes a NodeJS / Express / MongoDB skeleton app.

## Setup

### Requirements
Make sure you have MongoDB installed and running on your computer as well as NodeJS/NPM installed.

### Steps
On the root of this app, run the following command to install dependencies:
```
npm install
```

On the root of this app, run the following command to run the application:
```
npm start
```

If everything is ok, you should see a 'Hello world!' message when you go to 'http://localhost:3000' on your browser.

# Code Challange Implemented

App was implemented using layers controllers, services, models and is available in docker-compose environment.

To start the application, install docker and docker-compose in your local machine, so go into docker folder and type:
```
docker-compose up -d
```

For seed:
```
docker exec -it airportai /bin/sh -c 'DATABASE_URL=mongodb://mongoadmin:secret@172.21.35.10:27017/Ai
rportAI?authMechanism=DEFAULT&authSource=admin npm run seed'
```

For test the application, go to the app root folder and type:
```
# First stop airportai container

npm install

DATABASE_URL="mongodb://mongoadmin:secret@127.0.0.1:27017/AirportAI?authMechanism
=DEFAULT&authSource=admin" npm run test
```

A Postman collection can be imported on folder ``$APP_ROOT/docs/AirportAI.postman_collection.json``