from flask import Flask, render_template, request, send_file, flash, redirect, url_for
from werkzeug.utils import secure_filename
import os
from encryptor import encrypt_file
from decryptor import decrypt_file

app = Flask(__name__)
app.secret_key = 'your_secret_key'

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'results'

# Ensure upload and result folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

def validate_key(key: str) -> bytes:
    """
    Validate that the input key is exactly 8 bytes for DES encryption/decryption.
    """
    if len(key) != 8:
        raise ValueError("Key must be exactly 8 characters long for DES.")
    return key.encode()

def generate_valid_key(key: str) -> bytes:
    """
    Adjust the input key to ensure it is valid for DES (8 bytes).
    """
    key = key.encode()  # Convert to bytes
    if len(key) < 8:
        key = key.ljust(8, b'0')  # Pad with zeros if less than 8 bytes
    elif len(key) > 8:
        key = key[:8]  # Truncate to 8 bytes if longer
    return key

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        operation = request.form.get('operation')
        uploaded_file = request.files.get('file')

        if not uploaded_file:
            flash("No file selected.")
            return redirect(url_for('index'))

        filename = secure_filename(uploaded_file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        uploaded_file.save(file_path)

        key = request.form.get('key')
        if not key:
            flash("Key cannot be empty.")
            return redirect(url_for('index'))

        # Ensure the key is valid
        # key = generate_valid_key(key)

        try:
            # Validate the key
            key = validate_key(key)

            if operation == 'encrypt':
                encrypted_file = encrypt_file(file_path, key)
                return send_file(encrypted_file, as_attachment=True)
            elif operation == 'decrypt':
                result = decrypt_file(file_path, key)
                if result["success"]:
                    decrypted_file = result["output_path"]
                    return send_file(decrypted_file, as_attachment=True)
                else:
                    flash(result["message"])
                    return redirect(url_for('index'))
            else:
                flash("Invalid operation.")
        except Exception as e:
            flash(str(e))
            return redirect(url_for('index'))

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8001)