let config = {};

config.db = {};
// the URL shortening host - shortened URLs will be this + base58 ID
// i.e.: http://localhost:3000/3Ys
config.webhost = 'https://shrt.com/';


// your MongoDB host and database name
config.db.host = '127.0.0.1';
config.db.name = 'url_shortener';

module.exports = config;
