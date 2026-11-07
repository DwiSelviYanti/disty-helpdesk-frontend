/* Role klien */

/* Klien: router halaman (K) dan beranda klien.
   Kotak statistik dan tabel Aduan Terbaru dirender komponen React */
function K(){
 if(view=='profil')return profilV();
 if(view=='cdet')return cdet();
 if(view=='baru')return `<h2>Buat Aduan</h2><p class=sub>Cukup 4 isian, sisanya kami yang tangani.</p><div class=card>
 <label>Jenis bantuan</label><div class=cats>${[['alert','Gangguan / Error','Program bermasalah'],['spark','Pengembangan / Update Fitur','Minta fitur baru']].map(c=>`<button class=cat style="${cat==c[1]?'border-color:var(--pri);background:var(--soft)':''}" onclick="cat='${c[1]}';render()"><i>${ic(c[0],24)}</i><b>${c[1]}</b><span>${c[2]}</span></button>`).join('')}</div>
 <label>Bagian yang bermasalah</label><div class=chips>${MODS.map(m=>`<span class="chip ${mod==m?'on':''}" onclick="mod='${m}';render()">${m}</span>`).join('')}</div>
 ${mod=='Lainnya'?`<label>Keluhan lainnya apa? (wajib diisi)</label><input id=other value="${ov}" oninput="ov=this.value" placeholder="Sebutkan bagian/keluhan Anda">`:''}${kbFor(mod)}<label>Ceritakan singkat</label><textarea id=desc rows=3 oninput="dv=this.value" placeholder="Apa yang terjadi?">${dv}</textarea>
 <label>Screenshot (opsional)</label><label class=shot style="margin:0;display:block">${shot?`<img src="${shot}">`:`${ic('clip',18)} Klik untuk unggah gambar`}<input type=file accept="image/*" hidden onchange="pilihFotoAduan(this)"></label>
 <button class="btn tw-mt-[18px]" onclick="send()">Kirim aduan</button></div>`;
 if(view=='aduan')return `<h2>Aduan Saya</h2><p class=sub>Klik aduan untuk melihat perkembangan.</p><div class=card>${lst(T)}</div>`;
 if(view=='konsul')return konsul();
 if(view=='kb')return kbV();return home()}
function home(){
const sp=svPct(),c=s=>T.filter(t=>t.st==s).length,
S=[['list','Total Aduan',T.length,'Laporan yang telah Anda ajukan','p1'],['wrench','Dalam Proses',c('Diproses')+c('Monitoring'),'Sedang ditangani oleh tim','p2'],['clock','Menunggu',c('Baru'),'Belum ditangani tim','p3'],['check','Selesai',c('Selesai'),'Telah ditangani','p4']],
Q=[['edit','Buat Aduan','Laporkan kendala atau masalah yang Anda temui',"cat='Gangguan / Error';view='baru';render()",'p1'],['msg','Konsultasi','Ajukan pertanyaan atau minta bantuan',"view='konsul';render()",'p2'],['list','Pusat Bantuan','Panduan, FAQ, dan informasi lainnya',"view='kb';render()",'p4'],['users','Hubungi Kami','Butuh bantuan lebih lanjut? Hubungi tim kami',"wa('admin')",'p5']],
AN=[['wrench','Pemeliharaan Sistem','Akan ada pemeliharaan sistem pada 17 Okt 2026 pukul 22.00 - 03.00 WIB.','10 Okt 2026','#ffffff','#1f2024'],['spark','Fitur Baru','Kini tersedia fitur konsultasi online untuk mempermudah komunikasi.','1 Okt 2026','#ffffff','#1f2024'],['alert','Informasi Penting','Pastikan data akun Anda selalu diperbarui untuk keamanan bersama.','28 Sep 2026','#ffffff','#1f2024']],
IL=`<svg viewBox="0 0 260 170" aria-hidden="true"><ellipse cx="150" cy="158" rx="105" ry="9" fill="#f1d8c8"/><rect x="40" y="14" width="104" height="66" rx="10" fill="#fff" stroke="#ebd0bf"/><path d="M54 32h50M54 44h74M54 56h38" stroke="#e8b998" stroke-width="5" stroke-linecap="round"/><circle cx="220" cy="46" r="15" fill="#f6d9c6"/><path d="M213 46h14M213 51h8" stroke="#e3a278" stroke-width="3" stroke-linecap="round"/><path d="M22 150c-12-26-10-48 4-62 4 20 8 40-4 62zM30 150c4-24 16-40 32-46-2 22-12 40-32 46z" fill="#4c9a73"/><path d="M26 150c2-18 10-30 18-36" stroke="#7cc29b" stroke-width="3" fill="none"/><path d="M14 150h28l-4 12H18z" fill="#3a3d44"/><rect x="62" y="146" width="190" height="8" rx="4" fill="#f1d8c8"/><ellipse cx="112" cy="84" rx="19" ry="23" fill="#1d1e22"/><path d="M92 146v-34a22 22 0 0 1 44 0v34z" fill="#e0702f"/><circle cx="114" cy="80" r="15" fill="#f2c4a2"/><path d="M98 78c2-15 28-17 33 0-9-6-23-6-33 0z" fill="#1d1e22"/><path d="M128 124l34 8" stroke="#f2c4a2" stroke-width="7" stroke-linecap="round"/><path d="M146 100h54l7 46h-70z" fill="#2a2c31"/><path d="M154 108h38l4 30h-46z" fill="#f0975f"/><rect x="138" y="144" width="78" height="5" rx="2" fill="#1a1b1f"/></svg>`;
return `<div class=hm><div><section class="hb"><small>Selamat datang, ${ME[role].n.split(' (')[0]} 👋</small><h2>Ajukan laporan atau konsultasi dengan mudah dan cepat.</h2><p>Disty Teknologi hadir untuk membantu Anda menyampaikan laporan, mendapatkan informasi, dan solusi terbaik untuk setiap kebutuhan.</p>${HBI}</section>
<div class=sc data-react=StatCards data-rp=${rprops({items:S.map(([ikon,label,nilai,ket,kelas])=>({ikon,label,nilai,ket,kelas}))})}></div>
<div class=card><div class=hh><h3>Aduan Terbaru</h3><button class=lk onclick="view='aduan';render()">Lihat semua ${ic('arrow',14)}</button></div><div class=scroll data-react=TabelAduan data-rp=${rprops({rows:T.slice(0,4).map(t=>({id:t.id,title:t.title,mod:t.mod,st:t.st,tgl:t.log[0][0]}))})}></div></div>
<div class=card><h3 class="tw-border-0 tw-m-0 tw-p-0">Aksi Cepat</h3><div class=qa>${Q.map(q=>`<button class="qk ${q[4]}" onclick="${q[3]}"><i>${ic(q[0],18)}</i><b>${q[1]}</b><span>${q[2]}</span><span class=go>${ic('arrow',16)}</span></button>`).join('')}</div></div></div>
<div><div class=card><h3 class="tw-border-0 tw-m-0 tw-p-0">Status Layanan</h3><div class=dn><svg width=110 height=110 viewBox="0 0 120 120" style="color:var(--ink)"><circle cx=60 cy=60 r=48 fill=none stroke="#e9e5df" stroke-width=12 /><circle cx=60 cy=60 r=48 fill=none stroke="#c9531b" stroke-width=12 stroke-linecap=round stroke-dasharray="${sp*3.016} 302" transform="rotate(-90 60 60)"/><text x=60 y=67 text-anchor=middle font-size=22 font-weight=800 fill=currentColor>${sp}%</text></svg><div><h4>Kepuasan Layanan</h4><p>${SV.length?'Terima kasih atas penilaian Anda!':'Terus bantu kami menjadi lebih baik!'}</p><button class=lk onclick="svOpen()">${SV.length?'Ubah Survei':'Isi Survei'} ${ic('arrow',14)}</button></div></div></div>
<div class=card><div class=hh><h3 class="tw-border-0 tw-m-0 tw-p-0">Pengumuman</h3></div><div class="tw-mt-2.5">${AN.map(a=>`<div class=an><i style="background:${a[4]};color:${a[5]}">${ic(a[0],15)}</i><div><b>${a[1]}<em>${a[3]}</em></b><p>${a[2]}</p></div></div>`).join('')}</div></div>
<div class="card tp"><span class=bl>${ic('spark',34)}</span><h3 style="border:0;margin:0 0 8px;padding:0;color:var(--pri)">Tips untuk Anda</h3><p>Sebelum mengajukan aduan, pastikan Anda sudah menyiapkan data yang diperlukan agar proses lebih cepat.</p><button class=lk onclick="view='kb';render()">Lihat Panduan ${ic('arrow',14)}</button></div></div></div><p class=cp>Disty Desk © 2026. Melayani dengan hati, memberi solusi.</p>`}

/* Klien: form buat aduan, kirim aduan, detail aduan */
/* Kirim aduan: POST /tickets. Aduan baru dipakai dari data yang dikembalikan server (id dan log dibuat server). */
function send(){const o=mod=='Lainnya'?ov.trim():'';if(mod=='Lainnya'&&!o)return toast('Sebutkan dulu keluhan lainnya apa');if(!dv.trim()&&!o)return toast('Isi cerita singkat dulu');const d=dv.trim()||o;
 return proses(async()=>{const dto=await Api.buatTiket({title:(o||d).slice(0,40),category:cat,module:mod,description:o?`Lainnya: ${o}. ${dv.trim()}`:d,priority:up,attachment:shot});
 gantiTiket(dto);shot=null;dv=ov='';up='Sedang';view='aduan';render();toast('Aduan terkirim ke admin')})}
/* Penilaian aduan selesai: PUT /tickets/:id/rating */
function nilaiTiket(id,n){return proses(async()=>{gantiTiket(await Api.beriNilai(id,n));detail(id);toast('Terima kasih atas penilaiannya')})}
function cdet(){const t=T.find(x=>x.id==td);if(!t){view='home';return home()}const i=ST.indexOf(t.st);
return `<div class=pg2>${bc([...bcRoot(cbk),[t.id]])}<div class=tdh><div><h2>${t.id} - ${eh(t.title)}</h2><div class="row2 tw-mt-2"><span class="pill Diproses">${t.mod}</span>${pill(t.st)}<span class="tw-text-[color:var(--mut)] tw-text-[13px]">${t.log[0][0]}</span></div></div></div>
<div class="card tw-mb-5"><div class=steps>${ST.map((s,j)=>`<div class="${j<=i?'on':''}">${s}</div>`).join('')}</div></div>
<div class=tk3><div class=card><h3>Detail Aduan</h3>${[['Kategori',t.cat],['Modul',t.mod],['Deskripsi',eh(t.desc)],['Teknisi',t.techs.join(', ')||'Belum ditugaskan'],['Target SLA',t.techs.length?SLA[t.pri]+' jam':'Ditentukan setelah aduan ditinjau admin'],['Lampiran',t.shot?`<img src="${t.shot}" style="max-width:100%;max-height:160px;border-radius:10px">`:'Tidak ada lampiran']].map(r=>`<div class=k8r><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div>
<div class=card><h3>Riwayat Penanganan</h3><div class=k9l>${t.log.map(r=>`<div class=k9e><i></i><small>${r[0]}</small><p><b>${eh(r[1])}</b> · ${eh(r[2])}</p></div>`).join('')}</div></div>${t.sol?`<div class=card style="grid-column:1/-1"><h3>Solusi Penanganan</h3>${solRw(t.sol.p,t.sol.s,t.sol.by)}</div>`:''}</div>
${baView(t)}
${t.st=='Selesai'?`<div class="card tw-mt-5"><h3>Bagaimana penanganannya?</h3><div class=row2>${[1,2,3,4,5].map(n=>`<button class="btn s ${(t.rate||0)>=n?'':'o'}" onclick="nilaiTiket('${t.id}',${n})">★ ${n}</button>`).join('')}</div></div>`:''}</div>`}

/* Klien: pusat bantuan (knowledge base) */
function kbFor(m){return ''}
function kbV(){return `<h2>Pusat Bantuan</h2><p class=sub>Jawaban cepat untuk masalah yang sering terjadi.</p><div class="grid g2">${Object.entries(KB).map(([m,a],i)=>`<div class="card kc p${i%5+1}"><i class=ki>${ic('list',18)}</i><h3>${m}</h3>${a.map(x=>`<div class=prow><span>${x}</span>${ic('arrow',16)}</div>`).join('')}</div>`).join('')}</div>`}

/* Klien: survei kepuasan (bintang) */
const svPct=()=>SV.length?Math.round(SV.reduce((s,x)=>s+x.o,0)/SV.length*20):76,
SVA=['Kecepatan respon tim','Kemudahan menggunakan Disty Desk','Kualitas penanganan teknisi'],SVL=['Sangat kurang','Kurang','Cukup','Baik','Sangat baik'],
svS=(k,v,sm)=>`<div class="svs ${sm?'sm':''}">${[1,2,3,4,5].map(n=>`<button class="${v>=n?'on':''}" onclick="svR(${k},${n})" aria-label="${n} bintang">★</button>`).join('')}</div>`;
function svOpen(){svd=SV.length?JSON.parse(JSON.stringify(SV[0])):{o:0,a:[0,0,0],r:'',c:''};svView()}
function svR(k,n){if(k==='o')svd.o=n;else svd.a[k]=n;svView()}
function svView(){$('#m').innerHTML=`<div class=modal onclick="if(event.target==this)this.remove()"><div class="card tw-max-w-[560px]"><button class=x onclick="this.closest('.modal').remove()">×</button>
<h2 style="font-size:22px;margin:0 0 4px">Survei Kepuasan Layanan</h2><p class="sub tw-m-0 tw-mb-[18px]">Hanya butuh 1 menit. Masukan Anda membantu kami menjadi lebih baik.</p>
<label>Secara keseluruhan, seberapa puas Anda dengan layanan kami?</label>${svS("'o'",svd.o)}<small class="tw-text-[color:var(--mut)]">${svd.o?SVL[svd.o-1]:'Pilih 1 sampai 5 bintang'}</small>
<label class="tw-mt-[18px]">Nilai aspek layanan</label>${SVA.map((t,i)=>`<div class=svr><span>${t}</span>${svS(i,svd.a[i],1)}</div>`).join('')}
<label class="tw-mt-[14px]">Apakah aduan Anda terselesaikan?</label><div class=chips>${['Ya, sudah','Sebagian','Belum'].map(x=>`<span class="chip ${svd.r==x?'on':''}" onclick="svd.r='${x}';svView()">${x}</span>`).join('')}</div>
<label class="tw-mt-[14px]">Saran atau komentar (opsional)</label><textarea rows=3 placeholder="Tulis saran atau kritik Anda di sini..." oninput="svd.c=this.value">${eh(svd.c)}</textarea>
<div class="k9a tw-justify-end"><button class="btn o" onclick="this.closest('.modal').remove()">Batal</button><button class=btn onclick="svSend()">Kirim Survei</button></div></div></div>`}
function svSend(){if(!svd.o)return toast('Pilih penilaian keseluruhan dulu');return proses(async()=>{const d=await Api.kirimSurvei({overall:svd.o,aspects:[...svd.a],resolved:svd.r,comment:svd.c});SV=[surveiDariApi(d)];$('#m').innerHTML='';render();toast('Terima kasih! Survei Anda sudah terkirim')})}

/* Klien: kontak admin lewat WhatsApp */
const WA={chat:'6285755393724',admin:'6285706446004'};
function wa(k){const n=ME[role].n,m={chat:`Halo Disty Teknologi, saya ${n} ingin berkonsultasi.`,admin:`Halo Admin Disty Teknologi, saya ${n} ingin menghubungi admin.`};open('https://wa.me/'+WA[k]+'?text='+encodeURIComponent(m[k]),'_blank','noopener')}
function cpNo(){const n='085706446004';(navigator.clipboard?navigator.clipboard.writeText(n):Promise.reject()).then(()=>toast('Nomor disalin'),()=>toast('Nomor admin: '+n))}
function kontak(){$('#m').innerHTML=`<div class=modal onclick="if(event.target==this)this.remove()"><div class="card tw-max-w-[420px]"><button class=x onclick="this.closest('.modal').remove()">×</button><h2 style="font-size:20px;margin:0 0 4px">Kontak Admin</h2><p class="sub tw-m-0 tw-mb-4">Hubungi admin Disty Teknologi melalui WhatsApp.</p><div class=k8r><span>WhatsApp</span><b>0857-0644-6004</b></div><div class="k9a tw-justify-end"><button class="btn o" onclick="cpNo()">Salin nomor</button><button class=btn onclick="wa('admin')">Chat via WhatsApp</button></div></div></div>`}
