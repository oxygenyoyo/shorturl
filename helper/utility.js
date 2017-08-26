const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length; // base is the length of the alphabet (58 in this case)
exports.encodeShortenUrl = (num) => {
  let encoded = '';
  while (num){
    let remainder = num % base;
    console.log(remainder);
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
};

exports.decodeShortenUrl = (str) => {
  let decoded = 0;
  while (str){
    let index = alphabet.indexOf(str[0]);
    let power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}