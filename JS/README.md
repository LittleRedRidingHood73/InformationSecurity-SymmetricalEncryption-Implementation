# JS Encryption Implementation

A simple Node.js command-line tool for encrypting and decrypting **text** or **files** using **AES**, **RC4**, or **DES** (based on CryptoJS).

## Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/Haalloobim/JS-Encryption-Implementation.git
   cd JS-Encryption-Implementation
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

## Usage

Run the script with Node.js.  
Default action is **encrypt** unless you add `--dec` to decrypt.

### Encrypt text
```bash
node main.js --algo aes --key "ThisIsKey" --iv "0123456789012345" --type text "Helloo world"
```
Output:
```
[INFO] IV used: 30313233343536373839303132333435
ZLvsH9rpVBocZYU6zlhDsQ==
```

### Decrypt text
```bash
node main.js --algo aes --key "ThisIsKey" --iv "0123456789012345" --type text "ZLvsH9rpVBocZYU6zlhDsQ==" --dec
```
Output:
```
Helloo world
```

### Encrypt file
```bash
node main.js --algo aes --key "ThisIsKey" --iv "0123456789012345" --type file .\file\testfile.txt
```
Output:
```
[INFO] IV used: 30313233343536373839303132333435
[OK] Encrypted -> D:\CollegeStuff\...\testfile.txt.enc
```

### Decrypt file
```bash
node main.js --algo aes --key "ThisIsKey" --iv "0123456789012345" --type file .\file\testfile.txt.enc --out testfile.txt --dec
```
Output:
```
[OK] Decrypted -> D:\CollegeStuff\...\testfile.txt
```

### Examples with other algorithms

**RC4**
```bash
node main.js --algo rc4 --key "ThisIsKey" --type text "Helloo world"
```

**DES**
```bash
node main.js --algo des --key "ThisIsKey" --iv "01234567" --type text "Helloo world"
```

## Notes
- `--algo` must be one of: `aes`, `rc4`, `des`
- `--key` is required for all operations
- `--iv` is required for AES (16 bytes) and DES (8 bytes)
- File mode encrypts binary data to Base64 text (`.enc`) and decrypts it back to the original file format
