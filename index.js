const express = require('express');
const bodyParser = require('body-parser');
const expressFileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(expressFileUpload());
app.use(express.static('public'));

const PORT = process.env.PORT || 5000; 

app.get('/', (req, res) => {
    console.log("Received a GET request");
    res.json({message: "Hello there"});
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.uploadedFile;
    uploadedFile.mv(`./incoming/${uploadedFile.name}`, (err) => {
        if(err) {
            console.error(err);
            res.status(500).send(err);
        }

        res.send(`File ${req.files.uploadedFile.name} uploaded successfully`);
    })

});


app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is listening on port ${PORT} ...`);
})