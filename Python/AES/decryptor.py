from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.exceptions import InvalidTag

def decrypt_file(file_path: str, key: bytes):
    # Validate key length
    if len(key) not in [16, 24, 32]:  # AES requires 16, 24, or 32-byte keys
        raise ValueError("Invalid key size. Key must be 16, 24, or 32 bytes.")
    
    with open(file_path, 'rb') as f:
        iv = f.read(12)
        tag = f.read(16)
        ciphertext = f.read()

    cipher = Cipher(algorithms.AES(key), modes.GCM(iv, tag), backend=default_backend())
    decryptor = cipher.decryptor()

    try:
        plaintext = decryptor.update(ciphertext) + decryptor.finalize()

        # Save the decrypted file
        output_path = file_path.replace('_enc', '')
        with open(output_path, 'wb') as f:
            f.write(plaintext)

        return {"success": True, "output_path": output_path}
    except InvalidTag:
        return {"success": False, "message": "Decryption failed: The provided key is incorrect or the file has been tampered with."}