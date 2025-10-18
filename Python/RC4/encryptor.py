from utils import rc4
import os

def encrypt_file(file_path: str, key: bytes):
    """
    Encrypts a file using RC4 and saves the output.
    """
    with open(file_path, 'rb') as f:
        plaintext = f.read()

    ciphertext = rc4(key, plaintext)

    # Save the encrypted file
    output_path = file_path.replace('.', '_enc.')
    with open(output_path, 'wb') as f:
        f.write(ciphertext)

    return output_path