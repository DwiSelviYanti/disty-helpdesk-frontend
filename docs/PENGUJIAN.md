# Pengujian dan Debugging Frontend

## Skenario pengujian manual

| No | Skenario | Langkah | Hasil yang diharapkan |
|---|---|---|---|
| 1 | Login berhasil | Masuk dengan akun Klien yang benar | Masuk ke Beranda Klien |
| 2 | Login gagal | Isi kata sandi salah (mode live) | Pesan galat, tetap di halaman masuk |
| 3 | Validasi form | Kirim Buat Aduan tanpa cerita | Pesan "Isi cerita singkat dulu" |
| 4 | Buat aduan | Isi form lengkap, kirim | Aduan muncul di Aduan Saya berstatus Baru |
| 5 | Filter dan cari | Klik filter Diproses, lalu ketik kata kunci | Daftar menyusut sesuai |
| 6 | Penugasan | (Admin) tugaskan aduan ke teknisi | Status menjadi Diproses, teknisi tampil |
| 7 | Penyelesaian | (Teknisi) selesaikan dengan solusi | Status Selesai, solusi tampil di klien |
| 8 | Sesi habis | Hapus token lalu muat ulang | Kembali ke halaman masuk |
| 9 | Jaringan putus | `API_CONFIG.mock.offline = true` di Console | Pesan "Tidak dapat terhubung ke server" |
| 10 | Responsif | Lebar 390, 768, dan 1280 px | Tata letak menyesuaikan, tanpa gulir horizontal |
| 11 | Tema | Pilih tema gelap di pengaturan | Warna berubah dan tersimpan setelah muat ulang |
| 12 | Bahasa | Pilih English | Teks beralih ke Inggris |

## Alat debugging

- **Console** untuk galat JavaScript dan log mode API (`auto` mencatat apakah memakai backend atau tiruan).
- **Network** untuk melihat status, isi permintaan, dan header `Authorization`.
- **Application → Storage** untuk memeriksa tema, bahasa, dan sesi (`sessionStorage`).
- **Device toolbar** untuk menguji ukuran layar.
- Simulasi gangguan: `API_CONFIG.mock = { latensiMs: 2000, peluangGagal: 0.3, offline: false }` pada mode tiruan.

## Pencatatan hasil

Hasil tiap skenario dicatat pada laporan dengan tangkapan layar.
