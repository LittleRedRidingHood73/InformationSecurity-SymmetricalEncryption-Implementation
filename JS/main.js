#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');
const { parseArgv } = require('./Utils/parse');
const { bufferToWordArray, wordArrayToBuffer } = require('./utils/bin');

const AES = require('./algo/aes');
const RC4 = require('./algo/rc4');
const DES = require('./algo/des');

function usage() {
  console.log(`
Usage:
  node main.js --algo <aes|rc4|des> --key "KEY" [--iv "IV"] --type <text|file> [--dec] [--out <path>] <INPUT>

Examples:
  # Encrypt text (default action is encrypt)
  node main.js --algo aes --key "KEY" --iv "IV" --type text "Hello world"

  # Decrypt text (provide base64 ciphertext as INPUT)
  node main.js --algo aes --key "KEY" --iv "IV" --type text --dec "BASE64_CIPHERTEXT"

  # Encrypt a file (produces file.enc containing base64 ciphertext)
  node main.js --algo rc4 --key "KEY" --type file a.pdf

  # Decrypt file.enc into original (auto-named or use --out)
  node main.js --algo rc4 --key "KEY" --type file --dec a.pdf.enc --out a.pdf
`);
}
function pickAlgo(algo) {
  if (!algo) throw new Error('Missing --algo');
  const a = algo.toLowerCase();
  if (a === 'aes') return 'aes';
  if (a === 'rc4') return 'rc4';
  if (a === 'des') return 'des';
  throw new Error('Unsupported --algo, choose aes|rc4|des');
}

function main() {
  const args = parseArgv(process.argv);
  if (args.help || args.h) {
    usage();
    process.exit(0);
  }

  const algo = pickAlgo(args.algo);
  const key = args.key;
  const iv = args.iv || args.IV || undefined;
  const type = (args.type || '').toLowerCase();
  const decrypt = !!(args.dec || (args.action && String(args.action).toLowerCase() === 'dec'));
  const positional = args._;
  const input = positional[0];

  if (!key) throw new Error('Missing --key');
  if (!type) throw new Error('Missing --type (text|file)');
  if (!input) throw new Error('Missing INPUT (text or filepath)');

  if (type !== 'text' && type !== 'file') throw new Error('--type must be "text" or "file"');

  if (type === 'text') {
    if (!decrypt) {
      let result, ivOut = null;
      if (algo === 'aes') { const { base64, iv: ivUsed } = AES.encryptTextAES(input, key, iv); result = base64; ivOut = ivUsed; }
      else if (algo === 'rc4') { const { base64 } = RC4.encryptTextRC4(input, key); result = base64; }
      else if (algo === 'des') { const { base64, iv: ivUsed } = DES.encryptTextDES(input, key, iv); result = base64; ivOut = ivUsed; }

      if (ivOut) {
        console.log('[INFO] IV used:', CryptoJS.enc.Hex.stringify(ivOut));
      }
      console.log(result);
    } else {
      let plain;
      if (algo === 'aes') { plain = AES.decryptTextAES(input, key, iv); }
      else if (algo === 'rc4') { plain = RC4.decryptTextRC4(input, key); }
      else if (algo === 'des') { plain = DES.decryptTextDES(input, key, iv); }
      console.log(plain);
    }
    return;
  }

  const outPath = args.out ? path.resolve(args.out) : null;
  const inPath = path.resolve(input);
  if (!fs.existsSync(inPath)) throw new Error(`File not found: ${inPath}`);

  if (!decrypt) {
    const buf = fs.readFileSync(inPath);
    const wa = bufferToWordArray(buf);

    let cipherParams, ivOut = null;
    if (algo === 'aes') { const res = AES.encryptWordArrayAES(wa, key, iv); cipherParams = res.cipherParams; ivOut = res.iv; }
    else if (algo === 'rc4') { const res = RC4.encryptWordArrayRC4(wa, key); cipherParams = res.cipherParams; }
    else if (algo === 'des') { const res = DES.encryptWordArrayDES(wa, key, iv); cipherParams = res.cipherParams; ivOut = res.iv; }

    const b64 = cipherParams.toString();
    const outFile = outPath || inPath + '.enc';
    fs.writeFileSync(outFile, b64, 'utf8');
    if (ivOut) console.log('[INFO] IV used:', CryptoJS.enc.Hex.stringify(ivOut));
    console.log('[OK] Encrypted ->', outFile);
  } else {
    const b64 = fs.readFileSync(inPath, 'utf8').trim();
    let dec;
    if (algo === 'aes') dec = AES.decryptWordArrayAES(b64, key, iv);
    else if (algo === 'rc4') dec = RC4.decryptWordArrayRC4(b64, key);
    else if (algo === 'des') dec = DES.decryptWordArrayDES(b64, key, iv);

    const outFile = outPath || orGuessOutput(inPath);
    const outBuf = wordArrayToBuffer(dec);
    fs.writeFileSync(outFile, outBuf);
    console.log('[OK] Decrypted ->', outFile);
  }
}

function orGuessOutput(p) {
  if (p.endsWith('.enc')) {
    return p.slice(0, -4);
  }
  const { dir, name } = path.parse(p);
  return path.join(dir, name + '.dec');
}

try {
  main();
} catch (e) {
  console.error('[ERROR]', e.message);
  process.exit(1);
}
