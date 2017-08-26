
const chai = require('chai');
let expect = chai.expect;
const rewire = require('rewire');
const shortUrlControllerRewire = rewire("../../controllers/shortUrl");

describe('Short Controller', () => {

  /*
  ------------------------------------
  Private function validateUrl
  ------------------------------------
  */
  describe('validateUrl', () => {
    it('[Success] Return true when input correct', (done) => {
      let validateUrl = shortUrlControllerRewire.__get__("validateUrl");
      let result = validateUrl('www.test.com');
      expect(result).to.equal(true);
      done();
    });

    it('[Error] Return true when input <script>', (done) => {
      let validateUrl = shortUrlControllerRewire.__get__("validateUrl");
      let result = validateUrl('<script>alert("test");</script>');
      expect(result).to.equal(false);
      done();
    });

    
  });

  /*
  ------------------------------------
  Private function fillHttpWhenNotFillInUrl
  ------------------------------------
  */

  describe('fillHttpWhenNotFillInUrl', () => {
    it('[Success] return url that fill http auto', (done) => {
      let fillHttpWhenNotFillInUrl = shortUrlControllerRewire.__get__("fillHttpWhenNotFillInUrl");
      let result = fillHttpWhenNotFillInUrl('www.test.com');
      expect(result).to.equal('http://www.test.com');
      done();
    });

    it('[Success] return url that be the same added when has http', (done) => {
      let fillHttpWhenNotFillInUrl = shortUrlControllerRewire.__get__("fillHttpWhenNotFillInUrl");
      let result = fillHttpWhenNotFillInUrl('http://www.test.com');
      expect(result).to.equal('http://www.test.com');
      done();
    });
    
    it('[Success] return url that be the same added when has https', (done) => {
      let fillHttpWhenNotFillInUrl = shortUrlControllerRewire.__get__("fillHttpWhenNotFillInUrl");
      let result = fillHttpWhenNotFillInUrl('https://www.test.com');
      expect(result).to.equal('https://www.test.com');
      done();
    });
  });

  /*
  ------------------------------------
  Private function checkInputHasOnlyLetter
  ------------------------------------
  */

  describe('checkInputHasOnlyLetter', () => {
    it('[Success] return true when url contain only letter', (done) => {
      let checkInputHasOnlyLetter = shortUrlControllerRewire.__get__("checkInputHasOnlyLetter");
      let result = checkInputHasOnlyLetter('goog');
      expect(result).to.equal(true);
      done();
    });

    it('[Success] return false when url is not contain only letter', (done) => {
      let checkInputHasOnlyLetter = shortUrlControllerRewire.__get__("checkInputHasOnlyLetter");
      let result = checkInputHasOnlyLetter('goog.com');
      expect(result).to.equal(false);
      done();
    });
  });
  
  
});
