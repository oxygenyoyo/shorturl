'use strict'
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const shortUrlController = require('./controllers/shortUrl');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.post('/api/shorten', shortUrlController.postShortenUrl);
app.get('/:encoded_id', shortUrlController.redirectToRealUrl);

const server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});