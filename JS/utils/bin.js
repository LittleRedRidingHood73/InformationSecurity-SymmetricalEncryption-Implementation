const CryptoJS = require('crypto-js');

function bufferToWordArray(buffer) {
  const u8 = new Uint8Array(buffer);
  const words = [];
  for (let i = 0; i < u8.length; i += 4) {
    words.push(
      ((u8[i]     << 24) | 
       (u8[i + 1] << 16) | 
       (u8[i + 2] << 8)  | 
       (u8[i + 3] || 0)) >>> 0
    );
  }
  return CryptoJS.lib.WordArray.create(words, u8.length);
}

function wordArrayToBuffer(wordArray) {
  const { words, sigBytes } = wordArray;
  const u8 = new Uint8Array(sigBytes);
  for (let i = 0, j = 0; i < sigBytes; i++) {
    const w = words[(i / 4) | 0];
    u8[i] = (w >> (24 - 8 * (i % 4))) & 0xff;
  }
  return Buffer.from(u8);
}

module.exports = { bufferToWordArray, wordArrayToBuffer };
