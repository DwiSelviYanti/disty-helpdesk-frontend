/* Mock REST API */

/* Mock REST API: backend sementara yang menjawab lewat antarmuka fetch.
   Memvalidasi, memeriksa token dan hak akses per role, lalu membalas JSON dengan status HTTP yang benar.
   Data awal dari data.js, disimpan di localStorage agar tidak hilang saat refresh */
const DB_KUNCI = 'disty-helpdesk-db-v1';
const sesiTiruan = new Map();
let db = null;

const klon = o => JSON.parse(JSON.stringify(o));
const isoDari = s => { const m = /(\d+)\s+(\w+)\s+(\d{4})(?:,\s*(\d+)[.:](\d+))?/.exec(s || ''); return m ? new Date(+m[3], BLN.indexOf(m[2]), +m[1], +(m[4] || 0), +(m[5] || 0)).toISOString() : new Date().toISOString() };
const tglDari = s => { const m = /(\d+)\s+(\w+)\s+(\d{4})/.exec(s || ''); return m ? `${m[3]}-${p2(BLN.indexOf(m[2]) + 1)}-${p2(+m[1])}` : null };
const hariIni = () => { const d = new Date(); return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}` };

function benihDb() {
  const profil = {};
  Object.keys(ME).forEach(r => { profil[r] = { role: r, name: ME[r].n, email: ME[r].e, phone: '0821 2345 6789', instansiCode: ME[r].ki || null } });
  return {
    profiles: profil,
    technicians: TECHS.map(([name, specialty]) => ({ name, specialty })),
    tickets: T.map(t => ({
      id: t.id, title: t.title, category: t.cat, module: t.mod, description: t.desc, status: t.st, priority: t.pri,
      technicians: [...t.techs], attachment: null, photos: { before: null, after: null }, instansiCode: t.ki, reporter: t.pl, rating: null,
      solution: t.sol ? { part: t.sol.p, summary: t.sol.s, handledBy: [...t.sol.by], date: tglDari(t.sol.d) } : null,
      logs: t.log.map(l => ({ at: isoDari(l[0]), actor: l[1], message: l[2] })), createdAt: isoDari(t.log[0][0])
    })),
    consultations: C.map(c => { const at = isoDari('8 Okt 2026, 09.30'); return {
      id: c.id, instansiCode: c.ki, reporter: c.pl, topic: c.topic, note: c.note || '', date: c.date, time: c.time, status: c.st,
      technician: c.tech || '', createdAt: at, rescheduled: 0,
      messages: [{ from: 'k', text: c.topic + (c.note ? '. ' + c.note : ''), at }], logs: [{ at, message: 'Pengguna mengajukan konsultasi' }]
    } }),
    quota: { defaults: klon(QD), overrides: klon(QO) },
    surveys: {},
    knowledgeBase: klon(KB), institutions: klon(INST), solutions: klon(SOLH)
  };
}
function bukaDb() {
  try { const s = localStorage.getItem(DB_KUNCI); if (s) return JSON.parse(s) } catch {}
  return benihDb();
}
function simpanDb() { try { localStorage.setItem(DB_KUNCI, JSON.stringify(db)); return true } catch { return false } }
function resetServerTiruan() { try { localStorage.removeItem(DB_KUNCI) } catch {} db = benihDb(); simpanDb(); }

const blobKeDataUrl = b => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = () => no(r.error); r.readAsDataURL(b) });

/* ---------- utilitas respons ---------- */
const gagal = (s, c, m, details) => { throw { s, c, m, details } };
const balas = (status, body) => new Response(status === 204 ? null : JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const tunggu = (ms, sinyal) => new Promise((ok, no) => {
  const batal = () => no(new DOMException('Dibatalkan', 'AbortError'));
  if (sinyal && sinyal.aborted) return batal();
  const t = setTimeout(ok, ms);
  if (sinyal) sinyal.addEventListener('abort', () => { clearTimeout(t); batal() }, { once: true });
});
const aktor = u => u.role === 'klien' ? 'Klien' : u.role === 'admin' ? 'Admin' : u.name.split(' ')[0];
const cari = (daftar, kunci, nilai, nama) => daftar.find(x => x[kunci] == nilai) || gagal(404, 'TIDAK_DITEMUKAN', nama + ' tidak ditemukan');
const wajib = (v, pesan) => { if (v === undefined || v === null || String(v).trim() === '') gagal(422, 'VALIDASI', pesan) };
const catat = (daftar, pesan, extra) => daftar.push({ at: new Date().toISOString(), ...extra, message: pesan });

const kuotaJam = (d, j) => (db.quota.overrides[d + '|' + j] ?? db.quota.defaults[j]);
const terpakai = (d, j) => db.consultations.filter(c => c.date == d && c.time == j && !['Ditolak', 'Tidak'].includes(c.status)).length;

/* ---------- daftar rute ---------- */
const rute = [];
const rt = (metode, pola, izin, fn) => rute.push({ metode, re: new RegExp('^' + pola.replace(/:(\w+)/g, '([^/]+)') + '$'), izin, fn });

rt('POST', '/auth/login', null, ({ body }) => {
  const e = String(body.email || '').trim().toLowerCase();
  if (!e.includes('@')) gagal(422, 'VALIDASI', 'Isi email dengan benar');
  wajib(body.password, 'Isi kata sandi');
  const role = e.startsWith('admin') ? 'admin' : e.startsWith('teknisi') || e.startsWith('rafi') ? 'teknisi' : 'klien';
  db.sandi ??= {};
  if (db.sandi[role] && db.sandi[role] !== hashTiruan(body.password)) gagal(401, 'LOGIN_GAGAL', 'Email atau kata sandi salah'); // setelah kata sandi diubah, login memeriksa kata sandi baru
  const token = 'mock.' + role + '.' + Date.now(); sesiTiruan.set(token, role);
  const { name, email, instansiCode } = db.profiles[role];
  return [200, { token, user: { role, name, email, instansiCode } }];
});
rt('POST', '/auth/logout', [], ({ token }) => { sesiTiruan.delete(token); return [204] });
/* Hash sederhana khusus server tiruan. Backend sungguhan memakai hash kuat (scrypt/bcrypt), kata sandi tidak pernah disimpan polos. */
const hashTiruan = s => { let h1 = 0xdeadbeef, h2 = 0x41c6ce57; for (const c of String(s)) { const k = c.charCodeAt(0); h1 = Math.imul(h1 ^ k, 2654435761); h2 = Math.imul(h2 ^ k, 1597334677) } return (h1 >>> 0).toString(36) + (h2 >>> 0).toString(36) };
rt('PUT', '/me/password', [], ({ body, user }) => {
  db.sandi ??= {};
  const lama = String(body.currentPassword || ''), baru = String(body.newPassword || '');
  if (!lama) gagal(422, 'VALIDASI', 'Isi kata sandi saat ini');
  if (db.sandi[user.role] && db.sandi[user.role] !== hashTiruan(lama)) gagal(403, 'SANDI_SALAH', 'Kata sandi saat ini salah');
  if (baru.length < 8 || !/[A-Za-z]/.test(baru) || !/\d/.test(baru)) gagal(422, 'VALIDASI', 'Kata sandi baru minimal 8 karakter dan mengandung huruf serta angka');
  if (baru === lama) gagal(422, 'VALIDASI', 'Kata sandi baru harus berbeda dari yang lama');
  db.sandi[user.role] = hashTiruan(baru);
  return [204];
});
const fotoSah = v => v === null || (typeof v === 'string' && /^data:image\/(jpeg|png|webp|gif);base64,/.test(v));
const FOTO_TIDAK_DIKENAL = 'Foto tidak dikenal, silakan unggah ulang';
const profilDto = u => ({ role: u.role, name: u.name, email: u.email, phone: u.phone || '', photo: u.photo || null, instansiCode: u.instansiCode });
rt('GET', '/auth/me', [], ({ user }) => [200, profilDto(user)]);
/* Padanan POST /uploads di Laravel: terima satu gambar (multipart, kolom file), balas { url }. Di mode tiruan "url" berupa data URL yang disimpan di localStorage. */
rt('POST', '/uploads', [], ({ body }) => {
  const f = body.file;
  if (!f) gagal(422, 'VALIDASI', 'Pilih foto dulu');
  if (!/^image\/(jpeg|png|webp|gif)$/.test(f.type)) gagal(422, 'VALIDASI', 'Foto harus berformat JPG, PNG, WEBP, atau GIF');
  if (f.size > 5 * 1024 * 1024) gagal(422, 'VALIDASI', 'Ukuran foto maksimal 5 MB');
  return [201, { url: f.dataUrl, size: f.size, type: f.type }];
});
rt('PUT', '/me', [], ({ body, user }) => {
  wajib(body.name, 'Nama dan email yang valid wajib diisi');
  if (!String(body.email || '').includes('@')) gagal(422, 'VALIDASI', 'Nama dan email yang valid wajib diisi');
  if ('photo' in body && !fotoSah(body.photo)) gagal(422, 'VALIDASI', FOTO_TIDAK_DIKENAL);
  Object.assign(db.profiles[user.role], { name: body.name.trim(), email: body.email.trim(), phone: String(body.phone || '').trim() });
  if ('photo' in body) db.profiles[user.role].photo = body.photo;   // kunci photo tidak dikirim = foto tidak berubah, null = hapus
  return [200, profilDto(db.profiles[user.role])];
});

/* tiket */
rt('GET', '/tickets', [], () => [200, db.tickets]);
rt('POST', '/tickets', ['klien'], ({ body, user }) => {
  wajib(body.description, 'Isi cerita singkat dulu'); wajib(body.title, 'Judul aduan wajib diisi');
  if (!['Gangguan / Error', 'Pengembangan / Update Fitur'].includes(body.category)) gagal(422, 'VALIDASI', 'Jenis bantuan tidak dikenal');
  if (!(body.priority in SLA)) gagal(422, 'VALIDASI', 'Prioritas tidak valid');
  if (body.attachment != null && !fotoSah(body.attachment)) gagal(422, 'VALIDASI', FOTO_TIDAK_DIKENAL);
  const n = Math.max(0, ...db.tickets.map(t => +t.id.slice(3))) + 1, p = db.profiles.klien;
  const t = { id: 'HD-' + String(n).padStart(3, '0'), title: body.title, category: body.category, module: body.module, description: body.description,
    status: 'Baru', priority: body.priority, technicians: [], attachment: body.attachment || null, photos: { before: null, after: null }, instansiCode: p.instansiCode, reporter: p.name.split(' (')[0],
    rating: null, solution: null, logs: [], createdAt: new Date().toISOString() };
  catat(t.logs, 'Aduan dikirim', { actor: 'Klien' });
  db.tickets.unshift(t);
  return [201, t];
});
rt('GET', '/tickets/:id', [], ({ p }) => [200, cari(db.tickets, 'id', p[0], 'Aduan')]);
/* Foto dokumentasi perbaikan. Hanya kunci yang dikirim yang berubah, null = hapus (padanan PUT /tickets/{id}/photos di Laravel). */
rt('PUT', '/tickets/:id/photos', ['teknisi'], ({ p, body }) => {
  const t = cari(db.tickets, 'id', p[0], 'Aduan'), kunci = ['before', 'after'].filter(k => k in body);
  if (!kunci.length) gagal(422, 'VALIDASI', 'Tidak ada foto yang diubah');
  if (kunci.some(k => !fotoSah(body[k]))) gagal(422, 'VALIDASI', FOTO_TIDAK_DIKENAL);
  t.photos = { before: null, after: null, ...(t.photos || {}) };
  kunci.forEach(k => { t.photos[k] = body[k] });
  return [200, t];
});
rt('PATCH', '/tickets/:id', ['admin', 'teknisi'], ({ p, body, user }) => {
  const t = cari(db.tickets, 'id', p[0], 'Aduan');
  if (body.priority !== undefined) {
    if (user.role !== 'admin') gagal(403, 'DILARANG', 'Hanya admin yang boleh menetapkan prioritas');
    if (!(body.priority in SLA)) gagal(422, 'VALIDASI', 'Prioritas tidak valid');
    t.priority = body.priority; catat(t.logs, 'Prioritas ditetapkan: ' + body.priority, { actor: 'Admin' });
  }
  if (body.status !== undefined) {
    if (user.role !== 'teknisi') gagal(403, 'DILARANG', 'Hanya teknisi yang boleh mengubah status');
    if (!ST.includes(body.status)) gagal(422, 'VALIDASI', 'Status tidak valid');
    if (body.status === 'Selesai' && !t.solution) gagal(409, 'SOLUSI_BELUM_ADA', 'Isi solusi penanganan dulu, lalu klik Tandai selesai');
    t.status = body.status; catat(t.logs, 'Status diubah: ' + body.status, { actor: aktor(user) });
  }
  return [200, t];
});
rt('POST', '/tickets/:id/assignments', ['admin'], ({ p, body }) => {
  const t = cari(db.tickets, 'id', p[0], 'Aduan'); wajib(body.technician, 'Pilih teknisi dulu');
  cari(db.technicians, 'name', body.technician, 'Teknisi');
  if (t.technicians.includes(body.technician)) gagal(409, 'SUDAH_DITUGASKAN', body.technician + ' sudah ditugaskan pada aduan ini');
  const first = !t.technicians.length; t.technicians.push(body.technician); if (first) t.status = 'Diproses';
  catat(t.logs, first ? `Aduan diteruskan ke ${body.technician}` : `${body.technician} ditambahkan sebagai teknisi pendamping`, { actor: 'Admin' });
  return [200, t];
});
rt('POST', '/tickets/:id/logs', ['teknisi'], ({ p, body, user }) => {
  const t = cari(db.tickets, 'id', p[0], 'Aduan'); wajib(body.message, 'Isi tindakan dulu');
  catat(t.logs, body.message.trim(), { actor: aktor(user) });
  return [201, t];
});
rt('PUT', '/tickets/:id/solution', ['teknisi'], ({ p, body, user }) => {
  const t = cari(db.tickets, 'id', p[0], 'Aduan');
  wajib(body.part, 'Pilih bagian yang diperbaiki'); wajib(body.summary, 'Isi solusi penanganan');
  if (!Array.isArray(body.handledBy) || !body.handledBy.length) gagal(422, 'VALIDASI', 'Pilih teknisi yang menangani');
  if (t.status === 'Selesai') gagal(409, 'SUDAH_SELESAI', 'Aduan ini sudah selesai');
  t.solution = { part: body.part, summary: body.summary, handledBy: body.handledBy, date: hariIni() };
  catat(t.logs, `Solusi: ${body.part}. ${body.summary} (ditangani oleh ${body.handledBy.join(', ')})`, { actor: aktor(user) });
  catat(t.logs, 'Status diubah: Selesai', { actor: aktor(user) }); t.status = 'Selesai';
  return [200, t];
});
rt('PUT', '/tickets/:id/rating', ['klien'], ({ p, body }) => {
  const t = cari(db.tickets, 'id', p[0], 'Aduan');
  if (t.status !== 'Selesai') gagal(409, 'BELUM_SELESAI', 'Aduan yang belum selesai belum bisa dinilai');
  if (!Number.isInteger(body.score) || body.score < 1 || body.score > 5) gagal(422, 'VALIDASI', 'Nilai harus 1 sampai 5');
  t.rating = body.score; return [200, t];
});

/* konsultasi */
rt('GET', '/consultations', [], () => [200, db.consultations]);
rt('POST', '/consultations', ['klien'], ({ body }) => {
  wajib(body.topic, 'Isi topik dulu'); wajib(body.date, 'Pilih tanggal dulu');
  if (!SLOTS.includes(body.time) || terpakai(body.date, body.time) >= kuotaJam(body.date, body.time)) gagal(409, 'KUOTA_PENUH', 'Pilih jam yang masih tersedia');
  const p = db.profiles.klien, at = new Date().toISOString();
  const c = { id: Math.max(0, ...db.consultations.map(x => x.id)) + 1, instansiCode: p.instansiCode, reporter: p.name.split(' (')[0], topic: body.topic.trim(), note: String(body.note || '').trim(),
    date: body.date, time: body.time, status: 'Menunggu', technician: '', createdAt: at, rescheduled: 0, messages: [], logs: [] };
  c.messages.push({ from: 'k', text: c.topic + (c.note ? '. ' + c.note : ''), at }); c.logs.push({ at, message: 'Pengguna mengajukan konsultasi' });
  db.consultations.unshift(c); return [201, c];
});
rt('PATCH', '/consultations/:id', ['admin'], ({ p, body }) => {
  const c = cari(db.consultations, 'id', p[0], 'Konsultasi');
  if (!['Terjadwal', 'Ditolak', 'Jadi', 'Tidak'].includes(body.status)) gagal(422, 'VALIDASI', 'Status tidak valid');
  if (body.status === 'Terjadwal' && !c.technician) gagal(409, 'TEKNISI_KOSONG', 'Tugaskan teknisi dulu sebelum menyetujui');
  c.status = body.status; catat(c.logs, 'Admin mengubah status menjadi ' + body.status); return [200, c];
});
rt('PUT', '/consultations/:id/technician', ['admin'], ({ p, body }) => {
  const c = cari(db.consultations, 'id', p[0], 'Konsultasi'); wajib(body.technician, 'Pilih teknisi dulu');
  cari(db.technicians, 'name', body.technician, 'Teknisi');
  c.technician = body.technician; catat(c.logs, 'Admin menugaskan ' + body.technician + ' sebagai teknisi konsultasi'); return [200, c];
});
rt('POST', '/consultations/:id/messages', ['admin'], ({ p, body }) => {
  const c = cari(db.consultations, 'id', p[0], 'Konsultasi'), v = String(body.text || '').trim(); wajib(v, 'Tulis balasan dulu');
  const at = new Date().toISOString(); c.messages.push({ from: 'a', text: v, at });
  c.logs.push({ at, message: 'Admin membalas: ' + (v.length > 28 ? v.slice(0, 28) + '…' : v) }); return [201, c];
});
rt('GET', '/consultation-quota', [], () => [200, db.quota]);
rt('PUT', '/consultation-quota', ['admin'], ({ body }) => {
  const d = body.defaults || {}, o = body.overrides || {};
  const salah = v => !Number.isInteger(v) || v < 0 || v > 20;
  if (SLOTS.some(j => salah(d[j])) || Object.values(o).some(salah)) gagal(422, 'VALIDASI', 'Kuota harus bilangan bulat 0 sampai 20');
  db.quota = { defaults: d, overrides: o }; return [200, db.quota];
});

/* data pendukung */
rt('GET', '/technicians', [], () => [200, db.technicians]);
rt('POST', '/technicians', ['admin'], ({ body }) => {
  wajib(body.name, 'Isi nama teknisi');
  if (db.technicians.some(t => t.name.toLowerCase() == body.name.trim().toLowerCase())) gagal(409, 'SUDAH_ADA', 'Teknisi dengan nama itu sudah ada');
  const t = { name: body.name.trim(), specialty: String(body.specialty || '').trim() || 'Umum' }; db.technicians.push(t); return [201, t];
});
rt('GET', '/surveys/me', [], ({ user }) => [200, user.role === 'klien' ? db.surveys[user.role] || null : null]);
rt('PUT', '/surveys/me', ['klien'], ({ body, user }) => {
  if (!Number.isInteger(body.overall) || body.overall < 1 || body.overall > 5) gagal(422, 'VALIDASI', 'Pilih penilaian keseluruhan dulu');
  db.surveys[user.role] = { overall: body.overall, aspects: body.aspects || [0, 0, 0], resolved: body.resolved || '', comment: body.comment || '', submittedAt: new Date().toISOString() };
  return [200, db.surveys[user.role]];
});
rt('GET', '/knowledge-base', [], () => [200, db.knowledgeBase]);
rt('GET', '/institutions', [], () => [200, db.institutions]);
rt('GET', '/solutions', [], () => [200, db.solutions]);

/* ---------- pintu masuk: meniru perilaku fetch ---------- */
async function serverTiruan(url, opsi = {}) {
  if (!db) db = bukaDb();
  const cfg = API_CONFIG.mock;
  await tunggu(cfg.latensiMs, opsi.signal);
  if (cfg.offline) throw new TypeError('Failed to fetch');
  if (Math.random() < cfg.peluangGagal) return balas(503, { error: { code: 'LAYANAN_SIBUK', message: 'Layanan sementara tidak tersedia' } });
  const metode = (opsi.method || 'GET').toUpperCase(), path = url.split('?')[0];
  try {
    const r = rute.find(x => x.metode === metode && x.re.test(path));
    if (!r) gagal(404, 'RUTE_TIDAK_ADA', `Endpoint ${metode} ${path} tidak ada`);
    const auth = (opsi.headers && opsi.headers.Authorization || '').replace('Bearer ', ''), role = sesiTiruan.get(auth);
    let user = null;
    if (r.izin) {
      if (!role) gagal(401, 'BELUM_LOGIN', 'Sesi tidak valid, silakan masuk lagi');
      user = db.profiles[role];
      if (r.izin.length && !r.izin.includes(role)) gagal(403, 'DILARANG', 'Peranmu tidak boleh melakukan aksi ini');
    }
    let body = {};
    if (opsi.body instanceof FormData) { const f = opsi.body.get('file'); body = f && f.size !== undefined ? { file: { type: f.type, size: f.size, dataUrl: await blobKeDataUrl(f) } } : {} }
    else if (opsi.body) { try { body = JSON.parse(opsi.body) } catch { gagal(400, 'JSON_RUSAK', 'Isi permintaan bukan JSON yang valid') } }
    const [status, data] = r.fn({ body, user, token: auth, p: r.re.exec(path).slice(1) });
    if (metode !== 'GET' && !simpanDb()) { db = bukaDb(); gagal(507, 'PENYIMPANAN_PENUH', 'Penyimpanan browser penuh. Hapus beberapa foto lama lalu coba lagi.') } // foto disimpan di localStorage pada mode tiruan
    return balas(status, status === 204 ? null : { data: klon(data) });
  } catch (e) {
    if (e && e.s) return balas(e.s, { error: { code: e.c, message: e.m, details: e.details } });
    console.error('[server tiruan]', e); return balas(500, { error: { code: 'GALAT_INTERNAL', message: 'Kesalahan internal server' } });
  }
}
