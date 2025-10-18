const CryptoJS = require('crypto-js');

function parseKey(algo, keyStr) {
  if (!keyStr) throw new Error('Key is required');
  if (algo === 'aes') {
    return CryptoJS.SHA256(keyStr);
  } 
  else if (algo === 'des') {
    const md5 = CryptoJS.MD5(keyStr);
    return CryptoJS.lib.WordArray.create(md5.words.slice(0, 2), 8);
  } 
  else if (algo === 'rc4') {
    return CryptoJS.enc.Utf8.parse(keyStr);
  }
  throw new Error('Unsupported algo for key derivation');
}

function parseIv(algo, ivStr) {
  if (algo === 'rc4') return null;
  const ivLen = (algo === 'aes') ? 16 : 8;
  if (!ivStr) {
    return CryptoJS.lib.WordArray.random(ivLen);
  }
  if (ivStr.startsWith('0x') || ivStr.startsWith('0X')) {
    const hex = ivStr.slice(2);
    const wa = CryptoJS.enc.Hex.parse(hex);
    if (wa.sigBytes !== ivLen) throw new Error(`IV must be ${ivLen} bytes; got ${wa.sigBytes}`);
    return wa;
  }
  const wa = CryptoJS.enc.Utf8.parse(ivStr);
  if (wa.sigBytes !== ivLen) throw new Error(`IV must be ${ivLen} bytes; got ${wa.sigBytes}`);
  return wa;
}

function parseArgv(argv) {
  const out = { _: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2).toLowerCase();
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        out[key] = true;
      } 
      else {
        out[key] = next;
        i++;
      }
    } 
    else {
      out._.push(a);
    }
  }
  return out;
}

module.exports = { parseKey, parseIv, parseArgv };
