# File Encryptor/Decryptor

## Introduction
This mini project is a simple web application built with Flask that allows users to encrypt and decrypt files using DES encryption. It ensures secure file encryption and decryption while providing a user-friendly interface.

## Features
- **File Upload**: Users can upload files for encryption or decryption.
- **DES Encryption**: Utilizes DES with CBC (Cipher Block Chaining) mode for secure encryption.
- **Custom Key Input**: Users can provide their own encryption/decryption key.
- **Error Handling**: Displays meaningful messages when decryption fails due to incorrect keys or tampered files.
- **Responsive UI**: Buttons styled with pastel colors for better usability.

## Understanding DES-CBC
### What is DES?
DES (**Data Encryption Standard**) is a symmetric encryption algorithm widely used in the past for securing data. It operates on fixed block sizes of 64 bits and uses a fixed key size of 56 bits (effective). Although DES is now considered insecure for modern applications, it is still a useful algorithm for learning and educational purposes.

### What is CBC (Cipher Block Chaining)?
CBC (**Cipher Block Chaining**) is a mode of operation for block ciphers like DES that ensures:
1. **Confidentiality**: Each block of plaintext is XORed with the previous block of ciphertext before encryption, making patterns in plaintext undetectable.
2. **Chaining**: The encryption of each block depends on the ciphertext of the previous block, making it more secure than simpler modes like ECB (Electronic Codebook).

### Protecting Against Invalid Keys
DES-CBC does not have built-in authentication like AES-GCM, so extra measures are taken:
- During encryption, a **magic header** is added to the plaintext for validation during decryption.
- If the key is incorrect or the encrypted data has been tampered with, the application will display an error message:
```
Decryption failed: Invalid key or the file has been tampered with.
```

This ensures that data remains secure and unreadable under incorrect or malicious conditions.

## Technologies Used
- **Backend**: Python, Flask
- **Frontend**: HTML, CSS
- **Encryption Library**: PyCryptodome

## Requirements
- Python 3.8 or higher
- Virtual environment (`venv`) support

## Installation and Setup
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```

3. Upgrade `pip`:
   ```bash
   python -m pip install --upgrade pip
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the application:
   ```bash
   python app.py
   ```

6. Open your browser and visit:
   ```
   http://127.0.0.1:8001/
   ```

## Usage
### Encrypting Files
1. Upload a file using the "Choose File" button.
2. Enter a key (exactly 8 characters long).
3. Click the green "Encrypt" button.
4. Download the encrypted file.

### Decrypting Files
1. Upload an encrypted file using the "Choose File" button.
2. Enter the same key used for encryption.
3. Click the red "Decrypt" button.
4. Download the decrypted file.

### Notes on Key Usage
- The key length must be **exactly 8 characters long** (required by DES).
- If the key is incorrect during decryption, the application will display an error message.

## Project Structure
```
project/
├── app.py              # Main Flask application
├── encryptor.py        # File encryption logic
├── decryptor.py        # File decryption logic
├── requirements.txt    # Project dependencies
├── static/             # Static files (CSS, images, etc.)
│   └── style.css       # CSS for styling the UI
└── templates/          # HTML templates
    └── index.html      # Main UI template
```

## Screenshots
### Encryption/Decryption Interface
- Simple UI Testing 
![Encryption/Decryption Interface](documentation/UI.png)
- Invalid Key
![Encryption/Decryption Interface](documentation/InvalidKey.png)

## License
This project is licensed under the MIT License for non-commercial use. See the [LICENSE](LICENSE) file for more details.

## Contribution
Feel free to fork this repository, submit issues, or contribute to the project by creating pull requests.

## Contact
For questions or feedback, please reach out to:
- **Author**: Wadagraprana
- **GitHub**: [Wadagraprana](https://github.com/Wadagraprana)