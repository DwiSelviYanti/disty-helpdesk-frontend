# Integrasi API (Fetch API dan REST)

Seluruh pemanggilan API ada di `js/api.js`.

## Konfigurasi

Objek `API_CONFIG` di `js/api.js`:

| Kunci | Arti |
|---|---|
| `mode` | `live` memanggil backend, `mock` memakai `js/mock-api.js`, `auto` (bawaan di localhost) mencoba backend lalu beralih ke tiruan. Di domain sungguhan mode selalu `live` |
| `baseUrl` | Alamat dasar API. Bawaannya relatif (`api/v1`). Bila backend di domain lain, isi alamat lengkap, misalnya `https://api.contoh.id/api/v1` |
| `timeoutMs` | Batas tunggu satu permintaan (8000 ms) |
| `retryGet` | Banyak percobaan ulang untuk GET saat jaringan putus atau server 5xx (2 kali, jeda 300 ms dikali dua tiap percobaan) |

Bila backend berada di domain berbeda dengan frontend, `CORS_ORIGIN` pada `.env` backend harus berisi alamat frontend persis.

## Cara kerja `apiFetch`

1. Menyusun permintaan: JSON untuk isi biasa, `FormData` untuk unggah foto.
2. Menyertakan `Authorization: Bearer <token>` bila sudah login.
3. Membatasi waktu dengan `AbortController`.
4. Membaca balasan JSON: sukses `{ "data": ... }`, gagal `{ "error": { "code", "message", "details" } }`.
5. Melempar `ApiError` (status, kode, pesan, rincian). `pesanError()` mengubahnya menjadi pesan ramah; status 401 mengembalikan pengguna ke halaman masuk.
6. Tombol dinonaktifkan selama permintaan berjalan (`proses()`) agar tidak terkirim ganda.

## Endpoint yang dipanggil

| Fungsi `Api.` | Metode dan alamat | Peran |
|---|---|---|
| `masuk` | `POST /auth/login` | Semua |
| `keluar` | `POST /auth/logout` | Semua |
| `profilSaya` | `GET /auth/me` | Semua |
| `simpanProfil` | `PUT /me` | Semua |
| `ubahKataSandi` | `PUT /me/password` | Semua |
| `unggahFoto` | `POST /uploads` (multipart) | Semua |
| `tiket` | `GET /tickets` | Semua |
| `buatTiket` | `POST /tickets` | Klien |
| `setPrioritas`, `setStatus` | `PATCH /tickets/{id}` | Admin, Teknisi |
| `tugaskan` | `POST /tickets/{id}/assignments` | Admin |
| `catatTindakan` | `POST /tickets/{id}/logs` | Teknisi |
| `selesaikan` | `PUT /tickets/{id}/solution` | Teknisi |
| `beriNilai` | `PUT /tickets/{id}/rating` | Klien |
| `simpanFoto` | `PUT /tickets/{id}/photos` | Teknisi |
| `konsultasi`, `buatKonsultasi` | `GET`, `POST /consultations` | Semua, Klien |
| `setStatusKonsultasi` | `PATCH /consultations/{id}` | Admin |
| `tugaskanKonsultasi` | `PUT /consultations/{id}/technician` | Admin |
| `kirimPesan` | `POST /consultations/{id}/messages` | Admin |
| `kuota`, `simpanKuota` | `GET`, `PUT /consultation-quota` | Semua, Admin |
| `teknisi`, `tambahTeknisi` | `GET`, `POST /technicians` | Semua, Admin |
| `survei`, `kirimSurvei` | `GET`, `PUT /surveys/me` | Semua, Klien |
| `basisPengetahuan` | `GET /knowledge-base` | Semua |
| `instansi` | `GET /institutions` | Semua |
| `riwayatSolusi` | `GET /solutions` | Semua |

Setelah login, `Api.muatSemua()` memuat sembilan sumber data sekaligus dengan `Promise.all` (aduan, konsultasi, kuota, teknisi, survei, basis pengetahuan, instansi, riwayat solusi, dan profil).

## Menangani galat

| Situasi | Perilaku antarmuka |
|---|---|
| Jaringan putus | Pesan "Tidak dapat terhubung ke server", GET diulang otomatis |
| Server lambat | Pesan "Server terlalu lama merespons" setelah batas waktu |
| 401 | Kembali ke halaman masuk dengan pesan sesi berakhir |
| 422 | Pesan validasi dari server ditampilkan di toast |
| 5xx | Pesan server bermasalah, GET diulang |
