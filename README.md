# Record Filtering API

API written in ExpressJS that filters the data in existing mongodb instance.

## Features

* `POST /api/v1/records`
* Input Validation
* Error Handling
## 1. Clone the repo and install dependencies
````
git clone <repo-url>
npm i
````
## 2. Modify the .env file
Set environment variables as described in environment variables section.
## 3. Start the server
Run the following command at the root:
`````
npm start
`````



### Environment Variables

Please see below to configure service using environment variables. 

`DB_URL` : set to MongoDB instance that you'd like to run the app against.
                     
`NODE_ENV` : set to "development" to run on development mode

`PORT` : set to port number that you'd like to run the app through, defaulted to 5000.
