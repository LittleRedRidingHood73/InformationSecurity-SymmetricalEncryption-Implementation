from Crypto.Cipher import DES
import os

def encrypt_file(file_path: str, key: bytes):
    """
    Encrypt a file using DES encryption in CBC mode.
    """
    # Validate key length
    if len(key) != 8:
        raise ValueError("Invalid key size. Key must be 8 bytes.")

    # 8-byte IV for DES-CBC
    iv = os.urandom(8)
    cipher = DES.new(key, DES.MODE_CBC, iv)

    # Read file content
    with open(file_path, 'rb') as f:
        plaintext = f.read()

    # Add PKCS#5 padding to the plaintext
    padding_length = 8 - (len(plaintext) % 8)
    plaintext += bytes([padding_length]) * padding_length

    ciphertext = cipher.encrypt(plaintext)

    # Save the encrypted file
    output_path = file_path.replace('.', '_enc.')
    with open(output_path, 'wb') as f:
        f.write(iv)
        f.write(ciphertext)

    return output_path