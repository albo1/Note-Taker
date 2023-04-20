const express = require("express");
const path =  require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if (err) {
            throw (err)
        }
        res.status(200).json(JSON.parse (data));
    })
    console.log(`${req.method} request for notes`)
});

// app.get('notes??')
// send file?


app.listen(PORT, () => 
    console.log('http://localhost:${PORT}')
);

