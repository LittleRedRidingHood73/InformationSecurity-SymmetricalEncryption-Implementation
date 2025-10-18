from utils import rc4

def decrypt_file(file_path: str, key: bytes):
    """
    Decrypts a file using RC4 and saves the output.
    """
    with open(file_path, 'rb') as f:
        ciphertext = f.read()

    plaintext = rc4(key, ciphertext)

    # Save the decrypted file
    output_path = file_path.replace('_enc', '')
    with open(output_path, 'wb') as f:
        f.write(plaintext)

    return {"success": True, "output_path": output_path}