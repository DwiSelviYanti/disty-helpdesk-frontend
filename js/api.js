/* API: konfigurasi, klien, integrasi sesi */

/* Helper async, pembungkus login, dan pemasang/pelepas CSS Bootstrap (hanya dimuat di beranda) */
function pickChip(el){el.parentNode.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c===el))}
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const _goLogin=goLogin;
goLogin=async()=>{
 const b=document.getElementById('bm');
 if(!b||b.disabled)return _goLogin().catch(err=>toast(pesanError(err)));
 const t=b.textContent;b.disabled=true;b.textContent='Memeriksa akun...';
 try{await _goLogin()}
 catch(err){toast(pesanError(err))}
 finally{b.disabled=false;b.textContent=t}
};
const BSCSS='vendor/bootstrap/bootstrap.min.css';
const bsCss=on=>{const l=document.getElementById('bsCss');if(on&&!l){const n=Object.assign(document.createElement('link'),{id:'bsCss',rel:'stylesheet',href:BSCSS});document.head.insertBefore(n,document.head.querySelector('link[rel=stylesheet]'))}else if(!on&&l)l.remove()};
const _landing=landing,_login=login,_render=render;
landing=()=>{bsCss(true);_landing();countUp()};
login=()=>{bsCss(false);_login()};
render=()=>{bsCss(false);_render()};

/* Konfigurasi API.
   mode 'live': permintaan dikirim ke backend di baseUrl.
   mode 'mock': semua fetch() dijawab mock-api.js, jadi aplikasi jalan tanpa backend.
   mode 'auto' (bawaan di localhost): cek dulu apakah backend hidup dan punya rute POST /uploads.
   Rute itu dilindungi login, jadi backend yang benar membalas 401. Balasan lain berarti backend belum siap,
   lalu aplikasi memakai mode 'mock'. Hasil cek dicatat di console */
/* Di hosting (domain sungguhan) mode WAJIB 'live': kalau API mati, aplikasi menampilkan galat, tidak diam-diam memakai server tiruan
   (server tiruan menerima kata sandi apa saja, itulah penyebab login "selalu berhasil" di hosting sebelumnya).
   Di laptop (localhost atau file) tetap 'auto': memakai backend bila ada, selain itu server tiruan.
   baseUrl relatif ('api/v1') mengikuti folder tempat aplikasi ditaruh, mis. https://zatopup.com/disty-helpdesk/api/v1. */
const SITUS_LOKAL = ['localhost', '127.0.0.1', '[::1]', ''].includes(location.hostname || '') || location.protocol === 'file:';
const API_CONFIG = {
  mode: SITUS_LOKAL ? 'auto' : 'live',       // 'auto', 'live', atau 'mock'
  baseUrl: 'api/v1',                         // dipakai saat mode 'live' atau 'auto'
  timeoutMs: 8000,                           // batas tunggu satu permintaan
  retryGet: 2,                               // ulangi GET jika jaringan putus atau server 5xx
  mock: { latensiMs: 350, peluangGagal: 0, offline: false } // untuk menguji penanganan error dari console
};
(function pilihModeApi() {
  if (API_CONFIG.mode !== 'auto') return;
  let status = 0;
  try {
    const x = new XMLHttpRequest();
    x.open('POST', API_CONFIG.baseUrl + '/uploads', false); // sinkron, hanya sekali saat halaman dimuat
    x.timeout = 2500;
    x.send();
    status = x.status;
  } catch (e) { status = 0; }
  API_CONFIG.mode = (status === 401 || status === 403 || status === 422) ? 'live' : 'mock';
  console.info('[API] mode ' + API_CONFIG.mode + ' (cek ' + API_CONFIG.baseUrl + '/uploads membalas ' + (status || 'tidak tersambung') + ')' +
    (API_CONFIG.mode === 'mock' ? '. Backend belum siap atau belum punya rute /uploads, memakai server tiruan.' : ''));
})();

/* Klien API: pembungkus fetch (timeout, JSON, token, retry, error terstruktur),
   daftar endpoint REST (objek Api), dan pemetaan data API ke model tampilan */
class ApiError extends Error {
  constructor(status, kode, pesan, rincian) { super(pesan); this.name = 'ApiError'; this.status = status; this.kode = kode; this.rincian = rincian; }
}
let apiToken = null;
const kirimFetch = (url, opsi) => API_CONFIG.mode === 'live' ? fetch(url, opsi) : serverTiruan(url, opsi);

async function apiFetch(metode, path, body, { coba = 0 } = {}) {
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), API_CONFIG.timeoutMs);
  const opsi = { method: metode, signal: ctl.signal, headers: { Accept: 'application/json' } };
  if (body instanceof FormData) opsi.body = body;   // unggah file: biarkan browser mengisi Content-Type multipart beserta boundary-nya
  else if (body !== undefined) { opsi.headers['Content-Type'] = 'application/json'; opsi.body = JSON.stringify(body); }
  if (apiToken) opsi.headers.Authorization = 'Bearer ' + apiToken;
  try {
    let res;
    try { res = await kirimFetch((API_CONFIG.mode === 'live' ? API_CONFIG.baseUrl : '') + path, opsi); }
    catch (e) { throw new ApiError(0, e.name === 'AbortError' ? 'TIMEOUT' : 'JARINGAN', e.name === 'AbortError' ? 'Server terlalu lama merespons' : 'Tidak dapat terhubung ke server'); }
    const teks = res.status === 204 ? '' : await res.text();
    let data = null;
    if (teks) { try { data = JSON.parse(teks) } catch { throw new ApiError(res.status, 'RESPONS_RUSAK', 'Respons server tidak bisa dibaca') } }
    if (!res.ok) { const er = data && data.error || {}; throw new ApiError(res.status, er.code || 'HTTP_' + res.status, er.message || 'Permintaan gagal', er.details); }
    return data && 'data' in data ? data.data : data;
  } catch (e) {
    const bisaUlang = metode === 'GET' && coba < API_CONFIG.retryGet && (e.status === 0 || e.status >= 500);
    if (bisaUlang) { await delay(300 * 2 ** coba); return apiFetch(metode, path, body, { coba: coba + 1 }); }
    throw e;
  } finally { clearTimeout(timer); }
}

/* Pesan error yang ramah untuk toast. Sesi habis (401) otomatis mengembalikan pengguna ke halaman masuk. */
function pesanError(e) {
  if (!(e instanceof ApiError)) return 'Terjadi kesalahan: ' + (e && e.message || e);
  if (e.status === 401 && apiToken) { apiToken = null; setTimeout(() => { role = null; login() }, 0); return 'Sesi berakhir, silakan masuk lagi'; }
  if (e.status === 0) return e.message + '. Periksa koneksi lalu coba lagi.';
  if (e.status >= 500) return 'Server sedang bermasalah. Coba lagi beberapa saat lagi.';
  return e.message;
}

/* Kunci anti klik ganda: tombol yang ditekan dinonaktifkan selama permintaan berjalan, error otomatis jadi toast. */
let apiSibuk = false;
async function proses(fn) {
  if (apiSibuk) return;
  apiSibuk = true;
  const ev = window.event, b = ev && ev.currentTarget && ev.currentTarget.tagName === 'BUTTON' ? ev.currentTarget : null;
  if (b) b.disabled = true;
  document.body.style.cursor = 'progress';
  try { return await fn() }
  catch (e) { toast(pesanError(e)) }
  finally { apiSibuk = false; document.body.style.cursor = ''; if (b && b.isConnected) b.disabled = false }
}

/* ---------- pemetaan data API <-> model tampilan ---------- */
const p2 = n => String(n).padStart(2, '0');
const fmtWaktu = iso => { const d = new Date(iso); return isNaN(d) ? '' : `${d.getDate()} ${BLN[d.getMonth()]} ${d.getFullYear()}, ${p2(d.getHours())}.${p2(d.getMinutes())}` };
const fmtTanggal = s => { const a = String(s || '').slice(0, 10).split('-'); return a.length === 3 ? `${+a[2]} ${BLN[+a[1] - 1]} ${a[0]}` : (s || '') };

function tiketDariApi(d, lama) {
  return {
    id: d.id, title: d.title, cat: d.category, mod: d.module, desc: d.description, st: d.status, pri: d.priority,
    techs: [...d.technicians], ki: d.instansiCode, pl: d.reporter, rate: d.rating || undefined,
    shot: d.attachment || (lama && lama.shot) || null,
    before: d.photos ? d.photos.before : lama && lama.before, after: d.photos ? d.photos.after : lama && lama.after,
    sol: d.solution ? { p: d.solution.part, s: d.solution.summary, by: [...d.solution.handledBy], d: fmtTanggal(d.solution.date) } : undefined,
    log: d.logs.map(l => [fmtWaktu(l.at), l.actor, l.message])
  };
}
function gantiTiket(d) {
  const i = T.findIndex(x => x.id === d.id), t = tiketDariApi(d, T[i]);
  if (i < 0) T.unshift(t); else T[i] = t;
  return t;
}
function konsulDariApi(d) {
  return {
    id: d.id, ki: d.instansiCode, pl: d.reporter, em: d.reporterEmail, topic: d.topic, note: d.note, date: d.date, time: d.time, st: d.status,
    tech: d.technician || '', at: fmtWaktu(d.createdAt), ubah: d.rescheduled || 0,
    msgs: d.messages.map(m => [m.from, m.text, fmtWaktu(m.at)]), log: d.logs.map(l => [fmtWaktu(l.at), l.message])
  };
}
function gantiKonsul(d) {
  const i = C.findIndex(x => x.id === d.id), c = konsulDariApi(d);
  if (i < 0) C.unshift(c); else C[i] = c;
  return c;
}
const surveiDariApi = d => d ? { o: d.overall, a: [...d.aspects], r: d.resolved, c: d.comment, at: fmtWaktu(d.submittedAt) } : null;

/* ---------- daftar endpoint REST ---------- */
const Api = {
  masuk: (email, password) => apiFetch('POST', '/auth/login', { email, password }),
  keluar: () => apiFetch('POST', '/auth/logout'),
  simpanProfil: p => apiFetch('PUT', '/me', p),
  ubahKataSandi: b => apiFetch('PUT', '/me/password', b), // { currentPassword, newPassword }
  profilSaya: () => apiFetch('GET', '/auth/me'),
  unggahFoto: (blob, nama) => { const f = new FormData(); f.append('file', blob, nama || 'foto.jpg'); return apiFetch('POST', '/uploads', f) }, // multipart, balas { url }
  simpanFoto: (id, b) => apiFetch('PUT', `/tickets/${id}/photos`, b),                                                                     // { before?, after? }, null = hapus

  tiket: () => apiFetch('GET', '/tickets'),
  buatTiket: b => apiFetch('POST', '/tickets', b),
  setPrioritas: (id, priority) => apiFetch('PATCH', `/tickets/${id}`, { priority }),
  setStatus: (id, status) => apiFetch('PATCH', `/tickets/${id}`, { status }),
  tugaskan: (id, technician) => apiFetch('POST', `/tickets/${id}/assignments`, { technician }),
  catatTindakan: (id, message) => apiFetch('POST', `/tickets/${id}/logs`, { message }),
  selesaikan: (id, b) => apiFetch('PUT', `/tickets/${id}/solution`, b),
  beriNilai: (id, score) => apiFetch('PUT', `/tickets/${id}/rating`, { score }),

  konsultasi: () => apiFetch('GET', '/consultations'),
  buatKonsultasi: b => apiFetch('POST', '/consultations', b),
  setStatusKonsultasi: (id, status) => apiFetch('PATCH', `/consultations/${id}`, { status }),
  tugaskanKonsultasi: (id, technician) => apiFetch('PUT', `/consultations/${id}/technician`, { technician }),
  kirimPesan: (id, text) => apiFetch('POST', `/consultations/${id}/messages`, { text }),
  kuota: () => apiFetch('GET', '/consultation-quota'),
  simpanKuota: (defaults, overrides) => apiFetch('PUT', '/consultation-quota', { defaults, overrides }),

  teknisi: () => apiFetch('GET', '/technicians'),
  tambahTeknisi: (name, specialty) => apiFetch('POST', '/technicians', { name, specialty }),
  survei: () => apiFetch('GET', '/surveys/me'),
  kirimSurvei: b => apiFetch('PUT', '/surveys/me', b),
  basisPengetahuan: () => apiFetch('GET', '/knowledge-base'),
  instansi: () => apiFetch('GET', '/institutions'),
  riwayatSolusi: () => apiFetch('GET', '/solutions'),

  /* Muat semua data awal secara paralel setelah login, lalu isi state global (tanpa mengganti referensi array). */
  async muatSemua() {
    const [tk, ks, kt, tc, sv, kb, ins, sol, me] = await Promise.all([this.tiket(), this.konsultasi(), this.kuota(), this.teknisi(), this.survei(), this.basisPengetahuan(), this.instansi(), this.riwayatSolusi(), this.profilSaya().catch(() => null)]);
    T.splice(0, T.length, ...tk.map(d => tiketDariApi(d)));
    C.splice(0, C.length, ...ks.map(konsulDariApi));
    Object.keys(QD).forEach(k => delete QD[k]); Object.assign(QD, kt.defaults);
    Object.keys(QO).forEach(k => delete QO[k]); Object.assign(QO, kt.overrides); muatQU(kt);
    TECHS.splice(0, TECHS.length, ...tc.map(x => [x.name, x.specialty]));
    SV = sv ? [surveiDariApi(sv)] : [];
    Object.keys(KB).forEach(k => delete KB[k]); Object.assign(KB, kb);
    Object.keys(INST).forEach(k => delete INST[k]); Object.assign(INST, ins);
    SOLH.splice(0, SOLH.length, ...sol);
    // Profil terbaru dari server (nama, email, telepon, foto) supaya tetap ada setelah refresh. Bila gagal dimuat, tampilan memakai nilai bawaan.
    if (me && ME[me.role]) { ME[me.role].n = me.name; ME[me.role].e = me.email; PF[me.role] = { nm: me.name.split(' (')[0], em: me.email, tel: me.phone || '', ph: me.photo || '' } }
  }
};

/* Tutup sesi di server saat pengguna keluar.
   Tombol Keluar menjalankan role=null;landing(), jadi landing() dibungkus: bila masih ada token, kirim POST /auth/logout lalu hapus token */
const _landingApi = landing;
landing = () => {
  if (apiToken) { Api.keluar().catch(() => {}); apiToken = null; }
  _landingApi();
};
