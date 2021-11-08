# Record Filtering API

API written in ExpressJS that filters the data in existing mongodb instance.

## Features

* `POST /api/v1/records`
* Input Validation
* Error Handling

## To Run locally
For running the service, run `npm install` on the root folder, and then start the service with `npm start`.


### Environment Variables

Please see below to configure service using environment variables. 

`DB_URL` : set to MongoDB instance that you'd like to run the app against.
                     
`NODE_ENV` : set to "development" to run on development mode

`PORT` : set to port number that you'd like to run the app through.
