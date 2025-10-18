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

def validate_key(key: bytes):
    """
    Validates the key length for RC4.
    """
    min_length = 5  # Minimum key length (5 bytes / 40 bits)
    max_length = 256  # Maximum key length (256 bytes)
    if len(key) < min_length:
        raise ValueError(f"Key is too short! Key must be at least {min_length} bytes long.")
    if len(key) > max_length:
        raise ValueError(f"Key is too long! Key must be at most {max_length} bytes long.")

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

        # Convert key to bytes
        key = key.encode()

        try:
            # Validate key length
            validate_key(key)

            if operation == 'encrypt':
                encrypt_file(file_path, key)
                encrypted_file = file_path.replace('.', '_enc.')
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
    app.run(debug=True, port=8003)