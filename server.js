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
                const notesParsed = JSON.parse(data);
                notesParsed.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(notesParsed),
                (writeError) => 
                    writeError ? console.error(writeError) : connsole.info('Sucessfully Updated Notes!')
                );
            }
        });
        const response = { 
            status: 'success',
            body: newNote,
        };
    }
})
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    );

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
    );

app.listen(PORT, () => 
    console.log(`APP LISTENING AT http://localhost:${PORT}`)
);

