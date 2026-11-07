/* Data dan state global */

/* State global: role aktif, halaman (view), filter, form, dan survei */
let role=null,view='home',cat='Gangguan / Error',mod='Database',shot=null,toastT;
let up='Sedang',fs='Semua',qs='';
let dv='',ov='';
let lastV='',lbSeen=false;
let kd=0;
let SV=[],svd={o:0,a:[0,0,0],r:'',c:''};
let cbk='home';
let sbo=innerWidth>900;
let td='',fpri='Semua';
let kjv='09.00',kdv='2026-10-08',rbl='2026-10';
let kqt='req',qm='def',qdv='2026-10-08';

/* Data awal: akun demo, teknisi, modul, status, SLA, aduan (T), konsultasi (C), knowledge base.
   Setelah login, T, C, TECHS, SV, KB, INST, SOLH, QD, QO diisi ulang dari API (Api.muatSemua).
   Di sini data dipakai sebagai seed untuk mock-api.js */
const ME={klien:{n:'Bu Rina (SMK 2 Surabaya)',e:'rina@smkn2.sch.id'},admin:{n:'Admin Helpdesk',e:'admin@perusahaan.id'},teknisi:{n:'Rafi Pratama',e:'rafi@perusahaan.id'}};
const TECHS=[['Rafi','Database'],['Dina','Frontend'],['Bayu','Server & Jaringan']];
const MODS=['Database','Login / Akun','Laporan','Pembayaran','Tampilan','Lainnya'];
const ST=['Baru','Diproses','Monitoring','Selesai'];
let T=[
{id:'HD-014',title:'Data siswa tidak tersimpan',cat:'Gangguan / Error',mod:'Database',desc:'Setelah klik simpan, data siswa baru hilang saat halaman dimuat ulang.',st:'Diproses',techs:['Rafi'],shot:null,log:[['30 Sep 2026, 09.10','Klien','Aduan dikirim'],['30 Sep 2026, 10.00','Admin','Aduan diteruskan ke Rafi (Teknisi)'],['30 Sep 2026, 11.00','Rafi','Telepon klien (offline) untuk konfirmasi gejala'],['30 Sep 2026, 14.00','Rafi','Ditemukan tabel siswa terkunci, sedang diperbaiki']]},
{id:'HD-013',title:'Login guru lambat',cat:'Gangguan / Error',mod:'Login / Akun',desc:'Butuh sekitar 1 menit untuk masuk.',st:'Selesai',techs:['Bayu'],shot:null,log:[['28 Sep 2026, 08.00','Klien','Aduan dikirim'],['28 Sep 2026, 09.00','Bayu','Akan dikoordinasikan dengan tim server'],['28 Sep 2026, 13.00','Bayu','Server sudah dioptimalkan, login normal']]},
{id:'HD-012',title:'Database laporan nilai error',cat:'Gangguan / Error',mod:'Database',desc:'Muncul pesan "Query failed" di rekap nilai.',st:'Monitoring',techs:['Rafi'],shot:null,log:[['27 Sep 2026, 10.00','Klien','Aduan dikirim'],['27 Sep 2026, 15.00','Rafi','Database sudah selesai diperbaiki'],['28 Sep 2026, 08.00','Rafi','Dipantau sampai stabil']]},
{id:'HD-011',title:'Tambah fitur cetak rapor PDF',cat:'Pengembangan / Update Fitur',mod:'Laporan',desc:'Ingin rapor bisa diunduh PDF.',st:'Baru',techs:[],shot:null,log:[['1 Okt 2026, 07.30','Klien','Aduan dikirim']]},
{id:'HD-010',title:'Database absensi lambat',cat:'Gangguan / Error',mod:'Database',desc:'Rekap absensi butuh waktu lama.',st:'Selesai',techs:['Rafi'],shot:null,log:[['20 Sep 2026, 09.00','Klien','Aduan dikirim'],['20 Sep 2026, 16.00','Rafi','Index database ditambahkan, selesai']]},
{id:'HD-009',title:'Tampilan menu rusak di HP',cat:'Gangguan / Error',mod:'Tampilan',desc:'Menu tertutup di layar kecil.',st:'Selesai',techs:['Dina'],shot:null,log:[['18 Sep 2026, 09.00','Klien','Aduan dikirim'],['18 Sep 2026, 14.00','Dina','CSS diperbaiki, selesai']]}];
const SLA={Urgent:4,Tinggi:8,Sedang:24,Rendah:72},PRI={'HD-014':'Tinggi','HD-013':'Sedang','HD-012':'Tinggi','HD-011':'Rendah','HD-010':'Sedang','HD-009':'Rendah'};
T.forEach(t=>t.pri=PRI[t.id]);
let C=[{id:1,topic:'Proyek sistem akademik baru untuk SMK 2',date:'2026-10-08',time:'10.00',st:'Terjadwal',note:'Diundang presentasi di sekolah'}];
const KB={'Database':['Data tidak tersimpan setelah klik simpan','Cara memeriksa koneksi database'],'Login / Akun':['Lupa kata sandi','Akun terkunci setelah salah sandi'],'Laporan':['Laporan kosong atau tidak muncul','Cara mengunduh laporan PDF'],'Pembayaran':['Pembayaran e-wallet belum masuk','Status transaksi pending'],'Tampilan':['Tampilan berantakan di HP','Membersihkan cache browser'],'Lainnya':['Panduan penggunaan sistem']};

/* kode instansi, pelapor, dan riwayat solusi */
const INST={'SMKN2-SBY':{n:'SMK Negeri 2 Surabaya',p:[
{n:'Bu Rina',j:'Kepala Lab Komputer',e:'rina@smkn2.sch.id',tel:'0812-3456-7801',g:'12 Agu 2026',login:'1 Okt 2026, 08.42',last:'1 Okt 2026',
h:[['HD-005','Printer lab tidak terhubung ke jaringan','Jaringan','Selesai','15 Sep 2026','Bayu','Mengatur ulang IP statis printer dan memperbarui driver di semua komputer lab.'],['HD-002','Guru lupa kata sandi akun','Login / Akun','Selesai','2 Sep 2026','Dina','Reset kata sandi massal dan mengaktifkan tautan lupa sandi.'],['HD-001','Permintaan tambah akun guru baru','Login / Akun','Selesai','20 Agu 2026','Dina','Menambahkan 6 akun guru dan membagikan kata sandi awal.']],
k:[],v:[['HD-005',4,'Cepat, tapi mohon kabari lewat WhatsApp saat selesai.'],['HD-002',5,'Sangat membantu.']],act:[['2 Sep 2026','Membaca panduan: Cara reset kata sandi guru']]},
{n:'Pak Hendra',j:'Wakil Kurikulum',e:'hendra@smkn2.sch.id',tel:'0813-5566-1022',g:'20 Agu 2026',login:'28 Sep 2026, 13.15',last:'28 Sep 2026',
h:[['HD-007','Jadwal pelajaran bentrok di tampilan guru','Tampilan','Selesai','10 Sep 2026','Dina','Memperbaiki urutan data jadwal pada komponen tabel agar tidak tumpang tindih.']],
k:[['Integrasi jadwal pelajaran','10 Sep 2026','Selesai']],v:[['HD-007',4,'Hasil sudah sesuai.']],act:[]},
{n:'Bu Sari',j:'Tata Usaha',e:'sari@smkn2.sch.id',tel:'0857-1200-3344',g:'1 Sep 2026',login:'18 Sep 2026, 10.05',last:'18 Sep 2026',
h:[['HD-004','Cetak surat keterangan tidak muncul','Laporan','Selesai','8 Sep 2026','Rafi','Memperbaiki template surat yang kehilangan variabel nama siswa.']],
k:[],v:[['HD-004',5,'Cepat dan jelas.'],['HD-009',4,'Menu sudah rapi di HP.']],act:[]},
{n:'Pak Dwi',j:'Guru Informatika',e:'dwi@smkn2.sch.id',tel:'0852-9000-1188',g:'3 Sep 2026',login:'20 Sep 2026, 15.30',last:'20 Sep 2026',
h:[],k:[],v:[['HD-010',5,'Rekap absensi jadi jauh lebih cepat.']],act:[['20 Sep 2026','Melihat dokumentasi perbaikan HD-010']]}]},
'SMAN5-SBY':{n:'SMA Negeri 5 Surabaya',p:[
{n:'Pak Yusuf',j:'Operator Sekolah',e:'yusuf@sman5sby.sch.id',tel:'0821-4455-6677',g:'2 Agu 2026',login:'27 Sep 2026, 09.50',last:'27 Sep 2026',
h:[['HD-006','Query failed di rekap nilai','Database','Selesai','12 Sep 2026','Rafi, Bayu','Memperbaiki join yang salah ke tabel semester dan menambah batas waktu query menjadi 60 detik.']],
k:[['Migrasi data siswa tahun ajaran baru','5 Sep 2026','Selesai']],v:[['HD-006',5,'Tuntas dan dijelaskan penyebabnya.']],act:[['27 Sep 2026','Melampirkan tangkapan layar pada aduan HD-012']]},
{n:'Bu Lestari',j:'Wakil Kesiswaan',e:'lestari@sman5sby.sch.id',tel:'0838-7788-9900',g:'14 Agu 2026',login:'5 Sep 2026, 11.20',last:'5 Sep 2026',
h:[['HD-008','Foto siswa tidak tampil di kartu pelajar','Tampilan','Selesai','5 Sep 2026','Dina','Mengganti path penyimpanan foto dan membersihkan cache gambar.']],
k:[],v:[['HD-008',5,'']],act:[]}]},
'MAN1-SDA':{n:'MAN 1 Sidoarjo',p:[
{n:'Bu Nur',j:'Admin Data',e:'nur@man1sda.sch.id',tel:'0877-6655-4433',g:'20 Jul 2026',login:'1 Okt 2026, 07.25',last:'1 Okt 2026',
h:[['HD-003','Data tidak tersimpan setelah import','Database','Selesai','3 Agu 2026','Rafi','Menghentikan proses yang menahan lock tabel siswa dan mengatur batas waktu transaksi 30 detik.']],
k:[['Rencana integrasi data EMIS','25 Sep 2026','Terjadwal']],v:[['HD-003',4,'']],act:[]},
{n:'Pak Fauzi',j:'Kepala Madrasah',e:'fauzi@man1sda.sch.id',tel:'0811-2233-4455',g:'9 Jul 2026',login:'9 Jul 2026, 14.00',last:'9 Jul 2026',
h:[],k:[],v:[],act:[['9 Jul 2026','Mengaktifkan akun helpdesk']]}]}};
[['HD-014','SMKN2-SBY','Bu Rina'],['HD-013','SMKN2-SBY','Pak Hendra'],['HD-012','SMAN5-SBY','Pak Yusuf'],['HD-011','MAN1-SDA','Bu Nur'],['HD-010','SMKN2-SBY','Pak Dwi'],['HD-009','SMKN2-SBY','Bu Sari']].forEach(a=>Object.assign(T.find(t=>t.id==a[0]),{ki:a[1],pl:a[2]}));
Object.assign(T.find(t=>t.id=='HD-013'),{sol:{p:'Server aplikasi (session dan cache)',s:'Mengaktifkan cache session dan menaikkan memori PHP-FPM. Waktu login normal kembali di bawah 3 detik.',by:['Bayu'],d:'28 Sep 2026'}});
Object.assign(T.find(t=>t.id=='HD-010'),{sol:{p:'Tabel absensi (index database)',s:'Menambahkan index pada kolom tanggal dan id_siswa. Rekap absensi turun dari sekitar 40 detik menjadi di bawah 3 detik.',by:['Rafi'],d:'20 Sep 2026'}});
Object.assign(T.find(t=>t.id=='HD-009'),{sol:{p:'CSS menu navigasi',s:'Menambahkan breakpoint 600px dan mengubah menu menjadi drawer agar tidak menutupi konten.',by:['Dina'],d:'18 Sep 2026'}});
const SOLH=[{id:'HD-006',t:'Query failed di rekap nilai',m:'Database',k:'SMAN5-SBY',d:'12 Sep 2026',p:'Stored procedure rekap_nilai',s:'Memperbaiki join yang salah ke tabel semester dan menambah batas waktu query menjadi 60 detik.',by:['Rafi','Bayu']},
{id:'HD-003',t:'Data tidak tersimpan setelah import',m:'Database',k:'MAN1-SDA',d:'3 Agu 2026',p:'Transaksi menggantung (tabel siswa terkunci)',s:'Menghentikan proses yang menahan lock lewat SHOW PROCESSLIST, lalu mengatur batas waktu transaksi 30 detik agar tidak terulang.',by:['Rafi']}];

MODS.splice(MODS.length-1,0,'Jaringan');ME.klien.ki='SMKN2-SBY';C.forEach(c=>{c.ki='SMKN2-SBY';c.pl='Bu Rina'});
INST['SMKN2-SBY'].dom='smkn2.sch.id';INST['SMAN5-SBY'].dom='sman5sby.sch.id';INST['MAN1-SDA'].dom='man1sda.sch.id';
const REG={'rina@smkn2.sch.id':'SMKN2-SBY'};
const kiOf=e=>REG[e]||Object.keys(INST).find(k=>e.endsWith('@'+INST[k].dom));
