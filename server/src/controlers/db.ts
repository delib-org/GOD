//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
//local:
// const mongoDB = 'mongodb://127.0.0.1/global_online'; 
//atlas:
const mongoDB = 'mongodb://mongo/global_online';
// const mongoDB = 'mongodb+srv://tal1:9jNgEw4y7l9wjkkI@tal-test1.m39if.mongodb.net/global_online?retryWrites=true&w=majority';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
export const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));