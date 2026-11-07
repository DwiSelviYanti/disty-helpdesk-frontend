# Disty HelpDesk — Front-End

Bagian **front-end saja** dari proyek Disty HelpDesk (tanpa PHP/Laravel, Node.js, database, dan skrip deploy).
Seluruh isinya berkas statis (HTML, CSS, JavaScript) sehingga bisa dibuka lewat static server biasa.

## Struktur

```
disty-helpdesk-frontend/
├── index.html          Beranda (landing page)
├── login.html          Halaman masuk
├── assets/             Logo dan gambar
├── css/
│   ├── style.css       Gaya utama aplikasi
│   ├── tailwind.css    Utility class bergaya Tailwind (prefix tw-)
│   ├── dark.css        Tema gelap
│   └── override.css    Penyesuaian akhir
├── js/
│   ├── data.js, utils.js, app.js     Data awal, helper, kerangka aplikasi
│   ├── client.js / admin.js / technician.js   Tampilan per role
│   ├── components/     Komponen React (StatCards, TabelAduan, Router, ...)
│   ├── api.js          Konfigurasi dan klien REST (Fetch API)
│   ├── mock-api.js     Server tiruan, aplikasi jalan tanpa backend
│   ├── i18n.js, settings.js, table-fit.js, login.js, main.js
└── vendor/             Bootstrap dan React (lokal, tanpa CDN)
```

## Menjalankan

Jalankan dari folder ini dengan static server, misalnya:

```bash
python3 -m http.server 5500
# lalu buka http://localhost:5500/
```

Atau pakai ekstensi *Live Server* di VS Code. Di `localhost`, `API_CONFIG.mode` bernilai `auto`:
bila backend tidak ditemukan, aplikasi memakai `js/mock-api.js` (data disimpan di `localStorage`).
Font (Google Fonts) dimuat dari internet, bila offline akan memakai font cadangan browser.

## Menyambungkan ke backend

Ubah `API_CONFIG` di `js/api.js`:

```js
const API_CONFIG = {
  mode: 'live',                               // 'auto' | 'live' | 'mock'
  baseUrl: 'http://localhost:3000/api/v1',    // alamat penuh API backend
  ...
};
```

Pastikan backend mengizinkan CORS dari alamat front-end ini.

Endpoint yang dipanggil front-end (objek `Api` di `js/api.js`):

| Area | Endpoint |
|---|---|
| Auth & profil | `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `PUT /me`, `PUT /me/password`, `POST /uploads` |
| Aduan | `GET/POST /tickets`, `PATCH /tickets/:id`, `POST /tickets/:id/assignments`, `POST /tickets/:id/logs`, `PUT /tickets/:id/solution`, `PUT /tickets/:id/rating`, `PUT /tickets/:id/photos` |
| Konsultasi | `GET/POST /consultations`, `PATCH /consultations/:id`, `PUT /consultations/:id/technician`, `POST /consultations/:id/messages`, `GET/PUT /consultation-quota` |
| Lainnya | `GET/POST /technicians`, `GET/PUT /surveys/me`, `GET /knowledge-base`, `GET /institutions`, `GET /solutions` |

## Kaitan dengan silabus Front-End Web Development

| Modul silabus | Wujud di proyek |
|---|---|
| 1. Dasar Web (HTML & CSS) | `index.html`, `login.html`, `css/style.css` |
| 2. Version Control | `.gitignore`, siap di-`git init` |
| 3-4. JavaScript Fundamental & Lanjutan | `js/app.js`, `js/utils.js`, `js/client.js`, `js/admin.js`, async/await & Promise di `js/api.js` |
| 5. Responsive Design | media query dan grid/flexbox di `css/style.css` |
| 6. Framework CSS | Bootstrap (`vendor/bootstrap`), Tailwind-style (`css/tailwind.css`) |
| 7. UI/UX | tema terang/gelap (`css/dark.css`), alur per role |
| 8. Framework Front-End | React (`vendor/react`, `js/components/`) |
| 9. API Integration | Fetch API & REST di `js/api.js`, server tiruan `js/mock-api.js` |
| 10. Project Development | seluruh aplikasi Disty HelpDesk |
