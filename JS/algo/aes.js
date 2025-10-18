const CryptoJS = require('crypto-js');
const { parseKey, parseIv } = require('../Utils/parse');

function encryptTextAES(plain, keyStr, ivStr) {
  const key = parseKey('aes', keyStr);
  const iv = parseIv('aes', ivStr);
  const res = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plain), key, { 
    iv, 
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7 
  });
  return { base64: res.toString(), iv };
}

function decryptTextAES(base64, keyStr, ivStr) {
  const key = parseKey('aes', keyStr);
  const iv = parseIv('aes', ivStr);
  const dec = CryptoJS.AES.decrypt(base64, key, { 
    iv, 
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7 
  });
  return CryptoJS.enc.Utf8.stringify(dec);
}

function encryptWordArrayAES(wordArray, keyStr, ivStr) {
  const key = parseKey('aes', keyStr);
  const iv = parseIv('aes', ivStr);
  const res = CryptoJS.AES.encrypt(wordArray, key, { 
    iv, 
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7 
  });
  return { cipherParams: res, iv };
}

function decryptWordArrayAES(cipherBase64, keyStr, ivStr) {
  const key = parseKey('aes', keyStr);
  const iv = parseIv('aes', ivStr);
  const dec = CryptoJS.AES.decrypt(cipherBase64, key, { 
    iv, 
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7 
  });
  return dec;
}

module.exports = { encryptTextAES, decryptTextAES, encryptWordArrayAES, decryptWordArrayAES };
