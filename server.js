const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(cors());

//Body Parsing
app.use( express.json() );
app.use(express.urlencoded({    
    extended: true})); 
app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/media'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
})

