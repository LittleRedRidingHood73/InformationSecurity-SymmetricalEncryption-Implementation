# PHP Symmetric Encryption Demo

- AES (Advanced Encryption Standard)
- DES (Data Encryption Standard)
- RC4 (Rivest Cipher 4)

Aplikasi ini menggunakan form HTML sederhana dan script PHP (process.php) untuk memproses teks maupun file.

# Cara Menjalankan

1. Pastikan PHP 7.4+ telah terpasang (disarankan PHP 8 ke atas).
2. Buka terminal di direktori proyek:
   php -S localhost:8080
3. Buka browser dan akses:
   http://localhost:8080
4. Isi form sesuai kebutuhan.

# Langkah Penggunaan

1. Pilih algoritma: AES, DES, atau RC4.
2. Masukkan key (contoh: ThisIsMySecretKey).
3. Masukkan IV jika diperlukan:
   - AES membutuhkan 16 karakter.
   - DES membutuhkan 8 karakter.
   - RC4 tidak memerlukan IV.
4. Pilih mode Encrypt atau Decrypt.
5. Pilih jenis input:
   - Text untuk teks langsung.
   - File untuk file yang akan diproses.
6. Klik tombol Process.

# Hasil Proses

- Jika mode = Encrypt, hasil disimpan di:
  enc/<nama_file_asli>
- Jika mode = Decrypt, hasil disimpan di:
  dec/<nama_file_asli>

# Tentang IV (Initialization Vector)

IV adalah nilai tambahan yang digunakan pada algoritma berbasis blok (seperti AES dan DES) agar hasil enkripsi berbeda meskipun data dan key sama.  
RC4 tidak membutuhkan IV karena merupakan stream cipher.

# Contoh Penggunaan

Enkripsi Teks:
- Algoritma: AES
- Key: ThisIsKey
- IV: 0123456789012345
- Mode: Encrypt
- Input Type: Text
- Text: Hello World

Hasil:
ZLvsH9rpVBocZYU6zlhDsQ==

Dekripsi Teks:
- Algoritma: AES
- Key: ThisIsKey
- IV: 0123456789012345
- Mode: Decrypt
- Input Type: Text
- Text: ZLvsH9rpVBocZYU6zlhDsQ==

Hasil:
Hello World

Enkripsi File:
- Algoritma: DES
- Key: MyKey123
- IV: 12345678
- Mode: Encrypt
- Input Type: File
- File: file/Lambang ITS.png
Output: enc/Lambang ITS.png

Dekripsi File:
- Algoritma: DES
- Key: MyKey123
- IV: 12345678
- Mode: Decrypt
- Input Type: File
- File: enc/Lambang ITS.png
Output: dec/Lambang ITS.png

# Catatan Teknis

- Enkripsi dan dekripsi menggunakan fungsi PHP:
  openssl_encrypt() dan openssl_decrypt()
- Data file disimpan dalam format Base64 agar aman sebagai teks.
- Folder output dibuat otomatis menggunakan mkdir('enc', 0777, true) dan mkdir('dec', 0777, true).