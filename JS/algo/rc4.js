const CryptoJS = require('crypto-js');
const { parseKey, parseIv } = require('../Utils/parse');

function encryptTextRC4(plain, keyStr) {
  const key = parseKey('rc4', keyStr);
  const res = CryptoJS.RC4.encrypt(CryptoJS.enc.Utf8.parse(plain), key);
  return { base64: res.toString(), iv: null };
}

function decryptTextRC4(base64, keyStr) {
  const key = parseKey('rc4', keyStr);
  const dec = CryptoJS.RC4.decrypt(base64, key);
  return CryptoJS.enc.Utf8.stringify(dec);
}

function encryptWordArrayRC4(wordArray, keyStr) {
  const key = parseKey('rc4', keyStr);
  const res = CryptoJS.RC4.encrypt(wordArray, key);
  return { cipherParams: res, iv: null };
}

function decryptWordArrayRC4(cipherBase64, keyStr) {
  const key = parseKey('rc4', keyStr);
  const dec = CryptoJS.RC4.decrypt(cipherBase64, key);
  return dec;
}

module.exports = { encryptTextRC4, decryptTextRC4, encryptWordArrayRC4, decryptWordArrayRC4 };
