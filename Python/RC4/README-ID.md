# Enkripsi/Dekripsi File

## Pengantar
Proyek mini ini adalah aplikasi web yang dibangun dengan Flask, memungkinkan pengguna untuk mengenkripsi dan mendekripsi file menggunakan enkripsi RC4. Aplikasi ini memastikan proses enkripsi dan dekripsi file yang aman dengan antarmuka yang mudah digunakan.

## Fitur
- **Unggah File**: Pengguna dapat mengunggah file untuk dienkripsi atau didekripsi.
- **Enkripsi RC4**: Menggunakan RC4 untuk enkripsi yang ringan dan cepat.
- **Masukan Kunci Khusus**: Pengguna dapat memberikan kunci enkripsi/dekripsi mereka sendiri.
- **Penanganan Error**: Menampilkan pesan kesalahan yang jelas jika dekripsi gagal karena kunci yang salah.
- **UI Responsif**: Tombol dengan desain warna pastel untuk meningkatkan pengalaman pengguna.

## Memahami RC4
### Apa itu RC4?
RC4 (**Rivest Cipher 4**) adalah algoritma stream cipher simetris yang banyak digunakan untuk enkripsi data. Tidak seperti block cipher seperti AES, RC4 memproses data byte demi byte, sehingga ringan dan cepat. Namun, RC4 dianggap tidak aman untuk aplikasi modern karena beberapa kerentanan, sehingga proyek ini hanya untuk tujuan pembelajaran.

### Panjang Kunci
RC4 mendukung panjang kunci variabel, biasanya antara 5 hingga 256 byte:
- **Panjang Kunci Minimum**: 5 byte (40 bit).
- **Panjang Kunci Maksimum**: 256 byte (2048 bit).
- **Rekomendasi Panjang Kunci**: Setidaknya 16 byte (128 bit) untuk keamanan yang lebih baik.

### Perlindungan Terhadap Kunci Tidak Valid
RC4 tidak secara otomatis memvalidasi kunci, oleh karena itu:
- Panjang kunci minimum 5 byte diterapkan dalam proyek ini.
- Jika kunci lebih pendek dari 5 byte, aplikasi akan menolaknya.

## Teknologi yang Digunakan
- **Backend**: Python, Flask
- **Frontend**: HTML, CSS
- **Logika Enkripsi**: RC4 diimplementasikan dalam Python

## Persyaratan
- Python 3.8 atau lebih tinggi
- Dukungan virtual environment (`venv`)

## Instalasi dan Pengaturan
1. Clone repositori ini:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Buat dan aktifkan virtual environment:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```

3. Perbarui `pip`:
   ```bash
   python -m pip install --upgrade pip
   ```

4. Instal dependensi:
   ```bash
   pip install -r requirements.txt
   ```

5. Jalankan aplikasi:
   ```bash
   python app.py
   ```

6. Buka browser Anda dan kunjungi:
   ```
   http://127.0.0.1:8003/
   ```

## Cara Penggunaan
### Mengenkripsi File
1. Unggah file menggunakan tombol "Choose File".
2. Masukkan kunci (setidaknya 5 byte, direkomendasikan 16 byte).
3. Klik tombol hijau "Encrypt".
4. Unduh file yang telah dienkripsi.

### Mendekripsi File
1. Unggah file terenkripsi menggunakan tombol "Choose File".
2. Masukkan kunci yang sama yang digunakan untuk enkripsi.
3. Klik tombol merah "Decrypt".
4. Unduh file yang telah didekripsi.

### Catatan tentang Penggunaan Kunci
- Panjang kunci harus setidaknya 5 byte.
- Jika kunci salah saat dekripsi, aplikasi akan menampilkan pesan kesalahan.

## Struktur Proyek
```
project/
├── app.py              # Aplikasi Flask utama
├── encryptor.py        # Logika enkripsi file
├── decryptor.py        # Logika dekripsi file
├── utils.py            # Fungsi utilitas (implementasi RC4 dan pembantu lainnya)
├── requirements.txt    # Dependensi proyek
├── static/             # File statis (CSS, gambar, dll.)
│   └── style.css       # CSS untuk styling UI
└── templates/          # Template HTML
    └── index.html      # Template UI utama
```

## Screenshots
### Encryption/Decryption Interface
- Simple UI Testing 
![Encryption/Decryption Interface](documentation/UI.png)
- Invalid Key Too Long
![Encryption/Decryption Interface](documentation/TooLong.png)
- Invalid Key Too Short
![Encryption/Decryption Interface](documentation/TooShort.png)

## Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT untuk penggunaan non-komersial. Lihat file [LICENSE](LICENSE) untuk lebih jelasnya.

## Kontribusi
Silakan fork repositori ini, kirimkan issue, atau berkontribusi pada proyek ini dengan membuat pull request.

## Kontak
Untuk pertanyaan atau umpan balik, silakan hubungi:
- **Penulis**: Wadagraprana
- **GitHub**: [Wadagraprana](https://github.com/Wadagraprana)