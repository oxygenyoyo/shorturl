'use strict'
const express = require('express');
const app = express();
const https = require('https');
const path = require('path');
let Promise = require('bluebird');
const fs = require('fs');

const bodyParser = require('body-parser');
const shortUrlController = require('./controllers/shortUrl');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

https.createServer(options, app).listen(443);


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', shortUrlController.postShortenUrl);
app.get('/:encoded_id', shortUrlController.redirectToRealUrl);


