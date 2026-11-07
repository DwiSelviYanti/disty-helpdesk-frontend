/* Pengaturan akun dan unggah foto */

/* Pengaturan akun: tema (terang/gelap/ikuti sistem) dan ubah kata sandi.
   Tema disimpan di localStorage dan dipasang sebagai data-theme pada <html> (gayanya di css/dark.css) */
const KUNCI_TEMA = 'disty-helpdesk-tema';
let tema = 'terang';
try { const t = localStorage.getItem(KUNCI_TEMA); if (['terang', 'gelap', 'sistem'].includes(t)) tema = t; } catch {}
const mqGelap = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
function terapkanTema() {
  const gelap = tema === 'gelap' || (tema === 'sistem' && mqGelap && mqGelap.matches);
  document.documentElement.dataset.theme = gelap ? 'dark' : 'light';
}
if (mqGelap && mqGelap.addEventListener) mqGelap.addEventListener('change', () => { if (tema === 'sistem') terapkanTema(); });
terapkanTema();

function setTema(t) {
  tema = ['terang', 'gelap', 'sistem'].includes(t) ? t : 'terang';
  try { localStorage.setItem(KUNCI_TEMA, tema); } catch {}
  terapkanTema();
  tutupDialogAkun();
}

/* dialog kecil memakai gaya popup bawaan (.ibk/.ibx) */
function tutupDialogAkun() { document.getElementById('dga')?.remove(); }
function bukaDialogAkun(judul, isi, aksi) {
  tutupDialogAkun();
  const o = document.createElement('div');
  o.id = 'dga'; o.className = 'ibk';
  o.onmousedown = e => { if (e.target === o) tutupDialogAkun(); };
  o.innerHTML = `<div class="ibx" role="dialog" aria-modal="true" aria-labelledby="dgat"><div class="ibh" id="dgat">${judul}</div><div class="ibm tw-pt-0">${isi}</div><div class="ibf">${aksi}</div></div>`;
  document.body.appendChild(o);
  return o;
}
document.addEventListener('keydown', e => { if (e.key == 'Escape') tutupDialogAkun(); });

function pilihTema() {
  const opsi = [['terang', 'Terang', 'Latar putih, nyaman di ruangan terang'], ['gelap', 'Gelap', 'Latar gelap, nyaman di mata saat malam'], ['sistem', 'Ikuti sistem', 'Mengikuti pengaturan perangkat Anda']];
  bukaDialogAkun('Pilih Tema', opsi.map(([k, n, d]) =>
    `<button type="button" class="sr2" onclick="setTema('${k}')" style="border-radius:12px;margin-top:8px;border:1px solid var(--line);padding:12px 14px"><div><b>${n}</b><small>${d}</small></div>${tema === k ? ic('check', 18) : ''}</button>`).join(''),
    `<button type="button" class="ibb" onclick="tutupDialogAkun()">Tutup</button>`);
}

/* Ubah kata sandi: validasi di browser dulu, lalu server memeriksa ulang (kata sandi lama harus benar). */
function cekSandiBaru(lama, baru, ulang) {
  if (!lama) return 'Isi kata sandi saat ini';
  if (baru.length < 8 || !/[A-Za-z]/.test(baru) || !/\d/.test(baru)) return 'Kata sandi baru minimal 8 karakter dan mengandung huruf serta angka';
  if (baru === lama) return 'Kata sandi baru harus berbeda dari yang lama';
  if (baru !== ulang) return 'Konfirmasi kata sandi tidak sama';
  return '';
}
function ubahSandi() {
  const f = (id, label, ac) => `<label style="display:block;margin:12px 0 4px;font-size:13px;font-weight:600">${label}</label>${kolomSandi(id, ac, '', `onkeydown="if(event.key=='Enter'&&!event.repeat){event.preventDefault();kirimSandi()}"`)}`;
  const o = bukaDialogAkun('Ubah Kata Sandi',
    f('ps0', 'Kata sandi saat ini', 'current-password') + f('ps1', 'Kata sandi baru', 'new-password') + f('ps2', 'Ulangi kata sandi baru', 'new-password') +
    `<small style="display:block;margin-top:8px;color:var(--mut)">Minimal 8 karakter, mengandung huruf dan angka.</small><div id="psx" role="alert" style="color:var(--bad);font-size:13px;min-height:18px;margin-top:8px"></div>`,
    `<button type="button" class="btn o" onclick="tutupDialogAkun()" style="margin-right:8px">Batal</button><button type="button" id="psb" class="ibb" onclick="kirimSandi()">Simpan</button>`);
  o.querySelector('#ps0').focus();
}
async function kirimSandi() {
  const g = id => document.getElementById(id), lama = g('ps0').value, baru = g('ps1').value, ulang = g('ps2').value, err = g('psx'), b = g('psb');
  const msg = cekSandiBaru(lama, baru, ulang);
  if (msg) { err.textContent = msg; return; }
  if (b.disabled) return;
  err.textContent = ''; b.disabled = true;
  try { await Api.ubahKataSandi({ currentPassword: lama, newPassword: baru }); tutupDialogAkun(); toast('Kata sandi berhasil diubah'); }
  catch (e) { err.textContent = pesanError(e); b.disabled = false; }
}

/* Unggah foto: lampiran aduan (klien), foto sebelum/sesudah (teknisi), dan foto profil.
   Alur: pilih file, perkecil di browser (canvas, JPEG), POST /uploads, server membalas { url }, url disimpan lewat endpoint terkait */
const FOTO_MAKS_ASLI = 15 * 1024 * 1024;   // batas file asli sebelum diperkecil
const galatFoto = pesan => new ApiError(422, 'FOTO', pesan);

function bacaGambar(file) {
  return new Promise((ok, no) => {
    const u = URL.createObjectURL(file), img = new Image();
    img.onload = () => { URL.revokeObjectURL(u); ok(img) };
    img.onerror = () => { URL.revokeObjectURL(u); no(galatFoto('Berkas itu bukan gambar yang bisa dibaca')) };
    img.src = u;
  });
}

/* Perkecil sisi terpanjang ke `sisi` piksel dan simpan sebagai JPEG. Hasilnya biasanya di bawah 200 KB. */
async function kompresFoto(file, { sisi = 1024, mutu = 0.8 } = {}) {
  if (!file || !/^image\//.test(file.type)) throw galatFoto('Pilih file gambar (JPG, PNG, atau WEBP)');
  if (file.size > FOTO_MAKS_ASLI) throw galatFoto('Ukuran foto maksimal 15 MB');
  const img = await bacaGambar(file), k = Math.min(1, sisi / Math.max(img.naturalWidth, img.naturalHeight));
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(img.naturalWidth * k)); c.height = Math.max(1, Math.round(img.naturalHeight * k));
  const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
  const blob = await new Promise(ok => c.toBlob(ok, 'image/jpeg', mutu));
  if (!blob) throw galatFoto('Foto tidak bisa diproses');
  return blob;
}

/* Perkecil lalu unggah. Membalas URL foto dari server. */
async function unggahFoto(file, opsi) {
  const blob = await kompresFoto(file, opsi);
  const r = await Api.unggahFoto(blob, 'foto.jpg');
  return r.url;
}

/* Foto lampiran di form Buat Aduan (klien). Variabel shot berisi URL foto dari server, dikirim sebagai attachment saat aduan dikirim. */
function pilihFotoAduan(inp) {
  const f = inp.files && inp.files[0]; inp.value = '';
  if (!f) return;
  return proses(async () => { shot = await unggahFoto(f); render() });
}

/* Foto profil (semua peran): diunggah lalu disimpan ke profil lewat PUT /me (kunci photo). Nama dan email dikirim apa adanya dari akun. */
function pilihFotoProfil(inp) {
  const f = inp.files && inp.files[0]; inp.value = '';
  if (!f) return;
  return proses(async () => {
    const url = await unggahFoto(f, { sisi: 480 }), p = PF[role];
    const u = await Api.simpanProfil({ name: ME[role].n, email: ME[role].e, phone: p.tel || '', photo: url });
    p.ph = u.photo || ''; render(); toast('Foto profil tersimpan');
  });
}
