const CryptoJS = require('crypto-js');
const { parseKey, parseIv } = require('../Utils/parse');

function encryptTextDES(plain, keyStr, ivStr) {
  const key = parseKey('des', keyStr);
  const iv = parseIv('des', ivStr);
  const res = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(plain), key, { 
    iv, 
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7 
  });
  return { base64: res.toString(), iv };
}

function decryptTextDES(base64, keyStr, ivStr) {
  const key = parseKey('des', keyStr);
  const iv = parseIv('des', ivStr);
  const dec = CryptoJS.DES.decrypt(base64, key, { 
    iv, 
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7 
  });
  return CryptoJS.enc.Utf8.stringify(dec);
}

function encryptWordArrayDES(wordArray, keyStr, ivStr) {
  const key = parseKey('des', keyStr);
  const iv = parseIv('des', ivStr);
  const res = CryptoJS.DES.encrypt(wordArray, key, { 
    iv, 
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7 
  });
  return { cipherParams: res, iv };
}

function decryptWordArrayDES(cipherBase64, keyStr, ivStr) {
  const key = parseKey('des', keyStr);
  const iv = parseIv('des', ivStr);
  const dec = CryptoJS.DES.decrypt(cipherBase64, key, { 
    iv,
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7
  });
  return dec;
}

module.exports = { encryptTextDES, decryptTextDES, encryptWordArrayDES, decryptWordArrayDES };
