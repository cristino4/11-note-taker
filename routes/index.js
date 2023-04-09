const express = require('express');

//get router to be used
const notesRoutes = require('./notes.js');
//inst app to apply routes
const app = express(); 
//apply routes
app.use('/notes', notesRoutes);
//export the app that contains the imported routes
module.exports = app;