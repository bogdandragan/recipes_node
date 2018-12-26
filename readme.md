## Node JS recipe book backend

### 1. Download repository

### 2. Install MongoDB (If you have it already installed, omit this step)

For MongoDB installation instructions you can refer official documentation.
Installation on ubuntu:
> https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

### 3. Restore DB Dump

Go to application folder and run

> mongorestore dump

### 4. After installing MongoDb and restoring database, go to application folder and execute the folowing commands:

> npm install

> export NODE_ENV=production

> node index.js

> You app should be accessible on http://localhost:3001

> To check if DB restored successfully, go to http://localhost:3001/crudtest/categories. You should see categories list from DB.

#### Used technologies:
* NodeJS
* Express 4.16
* MongoDB
* Mongoose 5.4

#### Application components description:
* NodeJS and Express was used for api creation, communication with DB and other backend logic.
 Also NodeJS will be able to serve frontend index.html and bundle.
* MongoDB was used as database to store json data.

