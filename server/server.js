// import
const express = require('express');
const bodyParser = require('body-parser');
const calculation = require('./modules/calculations')

// make a server
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));

let history = [];



app.post('/calculations', (req, res) =>{
    let calcObject = calculation(req.body);
    history.push(calcObject);
    res.sendStatus(200);
})

app.get('/calculations', (req, res) =>{
    res.send(history);    
});


// sever out static files
app.use(express.static('server/public'));


// look for PORT 5000
app.listen(PORT, () =>{
    console.log('APP IS RUNNING ON: ', PORT);
    
});