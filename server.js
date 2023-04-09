const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 3001;
const homeURL = '/';
const rootURL = 'http://localhost:';
const notesURL = '/notes';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api);

//home page route
app.get(homeURL, (req,res) => {
    console.info(`Received ${req.method} for ${req.url} to send homepage`)
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.use(express.static('public'));

//notes page route
app.get(notesURL, (req,res) => {
    console.info(`Received ${req.method} for ${req.url} to send notes page`);
    res.sendFile(path.join(__dirname,'/public/notes.html'));
});

//fallback route 
app.get('*', (req,res) => {
    console.info(`Received ${req.method} for ${req.url} for fallback`);
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.listen(PORT, () => {
    console.info(`Server Listening on ${rootURL}${PORT}\nGOOD LUCK!`);
});