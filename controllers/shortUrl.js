const Promise = require('bluebird');
const config = require('../config');
const utility = require('../helper/utility');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Url = require('../models/url');


// create a connection to our MongoDB
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name, {useMongoClient: true});

const validateUrl = (url) => {
  const pattCheckSpecialchar = /[^a-zA-Z0-9|\.|\@|\!|\*|\'|\(|\)|\;|\:|\@|\&|\=|\+|\$|\,|\/|\?|\#|\[|\]]/ig;
  const hasSpecialcharThenReturnFalse = pattCheckSpecialchar.test(url);
  if( hasSpecialcharThenReturnFalse ) {
    return false;
  } else {
    return true;
  }
};

const fillHttpWhenNotFillInUrl = (url) => {
  const pattCheckHttpOrHttps = /^[^http|https]/g;
  const isNotFillHttpThenAutoFillIt = pattCheckHttpOrHttps.test(url);
  if( isNotFillHttpThenAutoFillIt ) {
    return 'http://' + url;
  } else {
    return url;
  }
};

const checkInputHasOnlyLetter = (url) => {
  const pattCheckHttpOrHttps = /[^0-9a-zA-Z]/ig;
  return !pattCheckHttpOrHttps.test(url);
};

const constructShortUrl = (doc, longUrl) => {
  return new Promise((resolve, reject) => {
    const hasFoundThenReturnShortUrlFromDB = doc;
    if ( hasFoundThenReturnShortUrlFromDB ) {
      resolve(utility.encodeShortenUrl(doc._id));
    } else {
      const isNormalUrlThenFillHttp = !checkInputHasOnlyLetter(longUrl);
      if ( isNormalUrlThenFillHttp ) {
        longUrl = fillHttpWhenNotFillInUrl(longUrl);
      }
      
      Url({long_url: longUrl}).save()
      .then((newUrl) => {
        const hasOnlyLetterThenNotEncodeUrl = checkInputHasOnlyLetter(longUrl);
        if ( hasOnlyLetterThenNotEncodeUrl ) {
          resolve(longUrl);
        } else {
          resolve(utility.encodeShortenUrl(newUrl._id));
        }
      });
    }
  });
};

exports.postShortenUrl = (req, res) => {
  let longUrl = req.body.url;
  const isInValidThenReturnError = !validateUrl(longUrl);
  if ( isInValidThenReturnError ) {
    res.json({error:true, message: 'this url has invalid letter.'});
    return false;
  }

  const isUrlLongerThan255ThenReturnError = longUrl.length > 255;
  if ( isUrlLongerThan255ThenReturnError ) {
    res.json({error:true, message: 'this url is longer than 255 letter.'});
    return false;
  }

  
  let resultShortUrl = config.webhost;
  Url.findOne({long_url: longUrl})
  .then((doc) => {
    return constructShortUrl(doc, longUrl)
    .then((url) => {
      resultShortUrl += url;
      res.send({'shortUrl': resultShortUrl});
      return true;
    });
  })
  .catch((error) => {
    res.json({error:true, message: error.message});
  });
};


exports.redirectToRealUrl = (req, res) => {
  var shortCode = req.params.encoded_id;
  var id = utility.decodeShortenUrl(shortCode);
  console.log('id', id);
  // check if url already exists in database
  Url.findOne({_id: id}, (err, doc) => {
    const hasFoundThenRedirectToRealUrl = doc;
    if ( hasFoundThenRedirectToRealUrl ) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });
};
