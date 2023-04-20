const express = require("express");
const path =  require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const generateUniqueId = require("generate-unique-id");
const id = generateUniqueId();

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

app.post('/api/notes', (req, res) => {
    res.status(200).json(`${req.method} request to add note`);
    console.info(`${req.method} request to add note`);

    const {title, text} = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            id: generateUniqueId(),
        };

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const
            }
        })
    }

})

// app.get('notes??')
// send file?
// generate id download??


app.listen(PORT, () => 
    console.log('http://localhost:${PORT}')
);

