const Promise = require('bluebird');
const config = require('../config');
const utility = require('../helper/utility');
const firebase = require('firebase');
const mongoose = require('mongoose');
const Url = require('../models/url');


// create a connection to our MongoDB
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name, {useMongoClient: true});

exports.postShortenUrl = (req, res) => {
  const longUrl = req.body.url;
  let resultShortUrl = '';
  
  // check if url already exists in database
  Url.findOne({long_url: longUrl}, function (err, doc){
    const hasFoundThenReturnShortUrlFromDB = doc;
    if ( hasFoundThenReturnShortUrlFromDB ) {
      // URL has already been shortened
      resultShortUrl = config.webhost + utility.encodeShortenUrl(doc._id);
      res.send({'shortUrl': shortUrl});
    } else {
      // The long URL was not found in the long_url field in our urls
      // collection, so we need to create a new entry:
      var newUrl = Url({
        long_url: longUrl
      });

      // save the new link
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }
        // construct the short URL
        resultShortUrl = config.webhost + utility.encodeShortenUrl(newUrl._id);
        res.send({'shortUrl': resultShortUrl});
      });
    }
  });
};


exports.redirectToRealUrl = (req, res) => {
  var shortCode = req.params.encoded_id;
  var id = utility.decodeShortenUrl(shortCode);
  console.log('id', id);
  // check if url already exists in database
  Url.findOne({_id: id}, (err, doc) => {
    const hasFoundThenRedirectToRealUrl = doc;
    console.log('doc.long_url', doc.long_url);
    if ( hasFoundThenRedirectToRealUrl ) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
    // res.send('test');
  });
};
