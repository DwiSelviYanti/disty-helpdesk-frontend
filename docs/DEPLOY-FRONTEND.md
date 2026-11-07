# Simulasi Deployment Frontend

Frontend berupa berkas statis, jadi dapat dipasang di hosting statis, cPanel, atau Nginx.

## 1. Persiapan

1. Pastikan backend sudah berjalan dan alamatnya diketahui, misalnya `https://api.contoh.id`.
2. Di `js/api.js`, ubah `baseUrl` menjadi alamat lengkap: `baseUrl: 'https://api.contoh.id/api/v1'`.
3. Di backend, isi `CORS_ORIGIN` dengan alamat frontend persis, misalnya `https://helpdesk.contoh.id`, lalu `php artisan config:cache`.

## 2. Pasang di hosting

**cPanel atau hosting biasa:** unggah semua isi folder ke `public_html/` atau subfolder (mis. `public_html/disty-helpdesk/`). Halaman dapat dibuka di `https://domain/disty-helpdesk/login.html`.

**Nginx (VPS):**

    server {
        listen 80;
        server_name helpdesk.contoh.id;
        root /var/www/disty-helpdesk-frontend;
        index index.html;
        location / { try_files $uri $uri/ =404; }
    }

Lalu pasang HTTPS dengan `sudo certbot --nginx -d helpdesk.contoh.id`.

## 3. Pemeriksaan setelah deploy

| Pemeriksaan | Cara |
|---|---|
| Halaman terbuka | Buka `index.html` dan `login.html`, tidak ada berkas 404 pada tab Network |
| Terhubung ke API | Login berhasil dan tab Network menampilkan `POST .../api/v1/auth/login` berstatus 200 |
| Kata sandi salah ditolak | Login dengan kata sandi salah menampilkan pesan galat, bukan masuk |
| CORS | Tidak ada galat CORS pada Console |
| Ponsel | Buka di ponsel atau mode perangkat DevTools, tata letak satu kolom |
| HTTPS | Ikon gembok tampil |
