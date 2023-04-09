const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid'); 


//route to return saved notes to client
notes.get('/', (req,res) => {
    console.info(`Received ${req.method} request for ${req.path} to get notes`);

    res.sendFile(path.join(__dirname, '../db/db.json'));
});

notes.post('/', (req,res) => {
    console.info(`Received ${req.method} request for ${req.path} to save note`);
    const dbData = fs.readFileSync('./db/db.json','utf8', (err,data) => {
        if(err) throw err;
        console.info(data);
    });
    const dataObj = JSON.parse(dbData);    
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: uniqid.time()
    }
    dataObj.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(dataObj), (err) => {
        if(err) {
            throw err;
        } else {
            console.info('Note added to database');
        }
    });
});

notes.delete('/:id', (req,res) => {
    const noteId = req.params.id;
    console.info(`Received ${req.method} request for ${req.path} to delete note ${noteId}`);
    const dbData = fs.readFileSync('./db/db.json','utf8', (err,data) => {
        if(err) throw err;
        console.info(data);
    });
    const dataObj = JSON.parse(dbData); 
    const deletedNotes = []
    for (let i = 0; i < dataObj.length; i++){
        console.log(dataObj[i].id)
        if(dataObj[i].id === noteId){
            deletedNotes.push(dataObj.splice(i,1));
            console.info(`Removed note ${noteId}`)
        }
    };
    fs.writeFileSync('./db/db.json', JSON.stringify(dataObj), (err) => {
        if(err) {
            throw err;
        } else {
            console.info('Database updated');
        };
    });
    res.json(deletedNotes);    
});

//export the modular routes
module.exports = notes;