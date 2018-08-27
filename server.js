const express = require('express');
const validate = require('validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})

app.get('/timestamp/:date?', (req, res) => {
    let result = {
        unix: '',
        utc: ''
    }
    let date = req.params.date;
    if(!date) {
        date = new Date();
    }
    else if((/^\d+$/).test(date)){
        date = new Date(parseInt(date));
    }
    else {
        date = new Date(date);
    }
    console.log(date.toString());
    if(isNaN(date)) {
        return res.status(200).send(JSON.stringify({error: 'Invalid Date'}));
    }
    result.unix = date.getTime();
    result.utc =date.toUTCString(); 
    res.status(200).send(JSON.stringify(result));
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
})