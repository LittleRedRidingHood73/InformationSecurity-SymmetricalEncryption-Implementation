from Crypto.Cipher import DES

def decrypt_file(file_path: str, key: bytes):
    """
    Decrypt a file using DES encryption in CBC mode.
    """
    # Validate key length
    if len(key) != 8:
        raise ValueError("Invalid key size. Key must be 8 bytes.")

    with open(file_path, 'rb') as f:
        iv = f.read(8)
        ciphertext = f.read()

    cipher = DES.new(key, DES.MODE_CBC, iv)

    try:
        plaintext = cipher.decrypt(ciphertext)

        # Remove PKCS#5 padding
        padding_length = plaintext[-1]
        plaintext = plaintext[:-padding_length]

        # Save the decrypted file
        output_path = file_path.replace('_enc', '')
        with open(output_path, 'wb') as f:
            f.write(plaintext)

        return {"success": True, "output_path": output_path}
    except Exception as e:
        return {"success": False, "message": f"Decryption failed: {str(e)}"}