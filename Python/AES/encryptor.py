from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os

def encrypt_file(file_path: str, key: bytes):
    # Validate key length
    if len(key) not in [16, 24, 32]:  # AES requires 16, 24, or 32-byte keysfs
        raise ValueError("Invalid key size. Key must be 16, 24, or 32 bytes.")
    
    iv = os.urandom(12)
    cipher = Cipher(algorithms.AES(key), modes.GCM(iv), backend=default_backend())
    encryptor = cipher.encryptor()

    # Read file content
    with open(file_path, 'rb') as f:
        plaintext = f.read()

    ciphertext = encryptor.update(plaintext) + encryptor.finalize()

    # Save the encrypted file
    output_path = file_path.replace('.', '_enc.')
    with open(output_path, 'wb') as f:
        f.write(iv)
        f.write(encryptor.tag)
        f.write(ciphertext)

    return output_path