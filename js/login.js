/* Entry point login.html */

/* Entry point login (login.html).
   Sesi: token disimpan di sessionStorage supaya refresh tidak mengulang login.
   Bila ada sesi tersimpan, data dimuat ulang dari API; token kedaluwarsa kembali ke form Masuk */
const KUNCI_SESI='disty-helpdesk-sesi';
const simpanSesi=()=>{if(!apiToken||!role)return;try{sessionStorage.setItem(KUNCI_SESI,JSON.stringify({token:apiToken,role,n:ME[role].n,e:ME[role].e}))}catch{}};
const hapusSesi=()=>{try{sessionStorage.removeItem(KUNCI_SESI)}catch{}};
const bacaSesi=()=>{try{const s=JSON.parse(sessionStorage.getItem(KUNCI_SESI));return s&&s.token&&RUTE[s.role]&&ME[s.role]?s:null}catch{return null}};

landing=()=>{
  const pindah=()=>{location.href='index.html'};
  hapusSesi();
  if(apiToken){const k=Api.keluar().catch(()=>{});apiToken=null;Promise.race([k,delay(800)]).finally(pindah)}else pindah();
};

/* Form Masuk tampil berarti tidak ada sesi aktif (mis. sesi berakhir/401), jadi sesi tersimpan dibuang. */
const _loginForm=login;
login=()=>{hapusSesi();_loginForm()};

/* Simpan sesi tepat setelah login berhasil, dan perbarui lagi saat halaman ditutup/di-refresh (nama/email bisa berubah lewat Profil). */
const _enterApp=enter;
enter=r=>{_enterApp(r);simpanSesi()};
addEventListener('pagehide',simpanSesi);

async function pulihkanSesi(){
  const s=bacaSesi();
  if(!s)return login();
  $('#app').innerHTML='<div class=login><div class=lf><div class=card><p class=sub>Memuat sesi...</p></div></div></div>';
  apiToken=s.token;
  if(API_CONFIG.mode!=='live')sesiTiruan.set(s.token,s.role); // server tiruan menyimpan sesi di memori, jadi didaftarkan lagi
  try{Object.assign(ME[s.role],{n:s.n,e:s.e});await Api.muatSemua();enter(s.role)}
  catch(err){apiToken=null;login();toast(pesanError(err))}
}
pulihkanSesi();
