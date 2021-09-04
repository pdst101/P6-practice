// MongoDB Pass: 0Lt5z09GP90DPl7R
// MongoDB Connection: mongodb+srv://natalia:<password>@cluster0.j18s9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// Ask about: no else in if/else
//
const express = require('express'); //Import framework files es5
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); 
//import express from 'express'  //es6
const stuffRoutes = require('./routes/stuff'); // Import stuff routes
const userRoutes = require('./routes/user');

const app = express(); //Run express app

mongoose.connect('mongodb+srv://natalia:0Lt5z09GP90DPl7R@cluster0.j18s9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

//Middleware
app.use((req, res, next) => { //Headers for Cross Origin Resource Sharing (CORS) errors handling
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()); // express.json

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;  //Export app so it can be accessed from outside