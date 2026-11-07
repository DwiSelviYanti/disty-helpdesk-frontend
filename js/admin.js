/* Role admin */

/* Admin: router halaman (A) dan daftar aduan yang belum ditugaskan */
function A(){
 if(view=='profil')return profilV();
 if(view=='aduan')return `<h2>Semua Aduan</h2><p class=sub>Teruskan aduan ke teknisi yang tepat.</p><div class=card>${lst(T)}</div>`;
 if(view=='konsul')return konsul();
 if(view=='laporan')return laporanV();
 if(view=='tim')return `<h2>Tim Teknisi</h2><p class=sub>Beban kerja saat ini.</p><div class="card tw-mb-4"><h3>Tambah teknisi baru</h3><div class=row2><input id=tn placeholder="Nama teknisi" autocomplete=off enterkeyhint=next oninput="window.TNV=this.value" style="flex:1;min-width:150px"><input id=ts placeholder="Spesialisasi (mis. Database)" autocomplete=off enterkeyhint=done oninput="window.TSV=this.value" onkeydown="if(event.key=='Enter')newTech()" style="flex:1;min-width:150px"><button class=btn onclick="newTech()">Tambah</button></div></div><div class="grid g4">${TECHS.map(t=>{const n=T.filter(x=>x.techs.includes(t[0])&&x.st!='Selesai').length;return `<div class="card"><div class=av>${t[0][0]}</div><h3 class="tw-mt-2.5">${t[0]}</h3><span class="tw-text-[color:var(--mut)]">${t[1]}</span><p><b style="font-size:26px">${n}</b> aduan aktif ${n>=2?'<br><span class="pill Monitoring">Hampir penuh</span>':''}</p></div>`}).join('')}</div>`;
 const cnt={};T.filter(t=>t.cat.startsWith('Gangguan')).forEach(t=>cnt[t.mod]=(cnt[t.mod]||0)+1);
 const e=Object.entries(cnt).sort((a,b)=>b[1]-a[1]),mx=e[0][1];
 return `<h2>Dashboard</h2><p class=sub>Ringkasan helpdesk, 1 Oktober 2026</p>${stats(T)}
 <div class="grid g2"><div class=card><h3>Keluhan paling sering</h3>${e.map(x=>`<div class=bar><span>${x[0]}</span><div><div style="width:${x[1]/mx*100}%"></div></div><b>${x[1]}</b></div>`).join('')}</div>
 <div class=card><h3>Perlu diteruskan (${T.filter(t=>!t.techs.length).length})</h3>${todo()}</div></div>
 <div class="card tw-mt-4"><h3>Aduan terbaru</h3>${tbl(T.slice(0,5))}</div>`}
function todo(){const q=T.filter(t=>!t.techs.length);return q.map(t=>`<div class=prow><div><b>${t.title}</b><div class="tw-text-[color:var(--mut)] tw-text-[13px]">${t.id} · ${t.mod}<br>${t.log[0][0]}</div></div><button class="btn s" onclick="detail('${t.id}')">Teruskan</button></div>`).join('')||'<p class=sub>Semua aduan sudah ditangani.</p>'}

/* Admin: penugasan teknisi dan prioritas aduan */
function setPri(id,p){return proses(async()=>{gantiTiket(await Api.setPrioritas(id,p));detail(id);render();toast('Prioritas: '+p)})}
function assign(id){const n=$('#sel').value;if(!n)return;return proses(async()=>{gantiTiket(await Api.tugaskan(id,n));detail(id);render();toast('Teknisi ditugaskan')})}

/* Admin: manajemen tim teknisi */
function newTech(){const n=($('#tn').value||window.TNV||'').trim();if(!n)return toast('Isi nama teknisi');return proses(async()=>{const t=await Api.tambahTeknisi(n,($('#ts').value||window.TSV||'').trim());TECHS.push([t.name,t.specialty]);window.TNV=window.TSV='';render();toast('Teknisi ditambahkan')})}
function addNew(id){const n=$('#tn2').value.trim();if(!n)return toast('Isi nama teknisi baru');return proses(async()=>{const t=await Api.tambahTeknisi(n,$('#ts2').value.trim());TECHS.push([t.name,t.specialty]);gantiTiket(await Api.tugaskan(id,t.name));detail(id);render();toast('Teknisi ditugaskan')})}

/* Admin: laporan bulanan (aduan, konsultasi, SLA) */
const BLN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],BLN_F=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
function pdt(s){const m=/(\d+)\s+(\w+)\s+(\d{4}),\s*(\d+)\.(\d+)/.exec(s||'');return m?new Date(+m[3],BLN.indexOf(m[2]),+m[1],+m[4],+m[5]):null}
const mkey=d=>d?d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'):'';
const mlabel=k=>{const [y,m]=k.split('-');return BLN_F[+m-1]+' '+y};
function hrsOf(t){if(t.st!='Selesai')return null;const a=pdt(t.log[0][0]),b=pdt(t.log[t.log.length-1][0]);return a&&b?Math.max(0,(b-a)/36e5):null}
function slaOf(t){const h=hrsOf(t),tg=SLA[t.pri]||24;return h==null?'Berjalan':h<=tg?'Tercapai':'Terlambat'}
const fh=h=>h==null?'-':h<1?'<1 jam':(Math.round(h*10)/10).toString().replace('.',',')+' jam';
function laporanData(k){
 const tk=T.filter(t=>mkey(pdt(t.log[0][0]))==k),ck=C.filter(c=>(c.date||'').startsWith(k));
 const done=tk.filter(t=>t.st=='Selesai'),ok=done.filter(t=>slaOf(t)=='Tercapai'),hs=done.map(hrsOf).filter(h=>h!=null);
 return {tk,ck,done,ok,avg:hs.length?hs.reduce((a,b)=>a+b,0)/hs.length:null,pct:done.length?Math.round(ok.length/done.length*100):null};
}
function laporanV(){
 const ks=[...new Set([...T.map(t=>mkey(pdt(t.log[0][0]))),...C.map(c=>(c.date||'').slice(0,7)),rbl].filter(Boolean))].sort().reverse(),
 d=laporanData(rbl),cnt=(l,f)=>{const o={};l.forEach(x=>{const k=f(x);o[k]=(o[k]||0)+1});return Object.entries(o)},
 ORD=['Baru','Diproses','Monitoring','Selesai'],
 byCat=cnt(d.tk,t=>t.cat).sort((a,b)=>b[1]-a[1]),
 bySt=cnt(d.tk,t=>t.st).sort((a,b)=>(ORD.indexOf(a[0])+1||99)-(ORD.indexOf(b[0])+1||99)),
 byMod=cnt(d.tk,t=>t.mod).sort((a,b)=>b[1]-a[1]),
 ubah=d.ck.filter(c=>(c.ubah||0)>0).length,
 R=[['Aduan masuk',d.tk.length],['Aduan selesai',d.done.length],['Aduan belum selesai',d.tk.length-d.done.length],['Konsultasi',d.ck.length],['Konsultasi dengan jadwal diubah',ubah],['SLA tercapai',d.pct==null?'-':d.pct+'% ('+d.ok.length+' dari '+d.done.length+')'],['Rata-rata waktu penyelesaian',fh(d.avg)]],
 mini=(h,rows)=>`<table class=lpt><tr><th>${h}</th><th class=r>Jumlah</th></tr>${rows.map(x=>`<tr><td>${eh(x[0])}</td><td class=r>${x[1]}</td></tr>`).join('')||'<tr><td colspan=2 class=em>Belum ada data</td></tr>'}<tr class=tot><td>Total</td><td class=r>${d.tk.length}</td></tr></table>`,
 sec=(n,t)=>`<div class=lps><i>${n}</i><h3>${t}</h3></div>`;
 return `<div class="card rpt tw-mb-4"><div class="row2 rpf"><div style="flex:1;min-width:180px"><label class="tw-mt-0">Periode</label><select onchange="rbl=this.value;render()">${ks.map(k=>`<option value="${k}" ${k==rbl?'selected':''}>${mlabel(k)}</option>`).join('')}</select></div><button class="btn o" onclick="window.print()">Cetak</button><button class=btn onclick="dlMenu(this)" aria-haspopup=menu>${ic('dl',18)} Unduh ${ic('chev',16)}</button></div></div>
 <article class=lp><header class=lph><div><div class=lpk>${LG}</div><h2>Laporan Bulanan ${mlabel(rbl)}</h2></div><p>Disusun oleh ${eh(ME.admin.n)}<br>Dicetak ${now()}</p></header>
 <div class=lpb>
 <section>${sec(1,'Ringkasan')}<div class=lpr>${R.map(r=>`<div><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div></section>
 <section>${sec(2,'Jumlah aduan')}<div class=lp3><div class=scroll>${mini('Kategori',byCat)}</div><div class=scroll>${mini('Status',bySt)}</div><div class=scroll>${mini('Modul',byMod)}</div></div></section>
 <section>${sec(3,'Konsultasi')}<div class=scroll><table class=lpt><tr><th>No</th><th>Topik</th><th>Jadwal</th><th>Status</th></tr>${d.ck.map(c=>`<tr><td>${KS(c)}</td><td><b>${eh(c.topic)}</b></td><td class="tw-whitespace-nowrap">${c.date} · ${c.time}</td><td>${pill(c.st)}</td></tr>`).join('')||'<tr><td colspan=4 class=em>Tidak ada konsultasi pada bulan ini</td></tr>'}</table></div><p class=lpn>Dihitung berdasarkan tanggal jadwal terakhir.</p></section>
 <section>${sec(4,'SLA waktu penyelesaian')}<div class=scroll><table class=lpt><tr><th>Kode</th><th>Aduan</th><th>Prioritas</th><th>Target SLA</th><th>Waktu penyelesaian</th><th>Hasil</th></tr>${d.tk.map(t=>{const s=slaOf(t);return `<tr><td>${t.id}</td><td><b>${eh(t.title)}</b></td><td>${pri(t.pri)}</td><td>${SLA[t.pri]} jam</td><td>${fh(hrsOf(t))}</td><td><span class="pill ${s=='Tercapai'?'Selesai':s=='Terlambat'?'PUrgent':'Monitoring'}">${s=='Tercapai'?'Tepat waktu':s=='Berjalan'?'Belum selesai':'Terlambat'}</span></td></tr>`}).join('')||'<tr><td colspan=6 class=em>Tidak ada aduan pada bulan ini</td></tr>'}</table></div></section>
 </div></article>`}
function dlLaporan(){const d=laporanData(rbl),q=v=>'"'+String(v).replace(/"/g,'""')+'"',
 rows=[['Laporan Bulanan',mlabel(rbl)],['Jumlah aduan',d.tk.length],['Aduan selesai',d.done.length],['Jumlah konsultasi',d.ck.length],['SLA tercapai (%)',d.pct==null?'-':d.pct],['Rata-rata penyelesaian',fh(d.avg)],[],['No','Judul','Modul','Prioritas','Target (jam)','Aktual','SLA']];
 d.tk.forEach(t=>rows.push([t.id,t.title,t.mod,t.pri,SLA[t.pri],fh(hrsOf(t)),slaOf(t)]));
 saveBlob(new Blob(['\ufeff'+rows.map(r=>r.map(q).join(',')).join('\n')],{type:'text/csv;charset=utf-8'}),'laporan-'+rbl+'.csv');toast('Laporan CSV diunduh')}

/* Logo untuk kop PDF laporan (JPEG base64) */
const LOGO_PDF={w:518,h:84,b:'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'};

/* Admin: menu Unduh laporan (PDF dan CSV). PDF dibuat langsung di browser tanpa library tambahan */
function saveBlob(b,n){const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}

function dlMenu(btn){ddOpen(btn,[
 {v:'pdf',t:'PDF',s:'Laporan rapi, siap dibaca dan dicetak',i:ic('report',18)},
 {v:'csv',t:'CSV',s:'Data tabel untuk dibuka di Excel',i:ic('list',18)}
],v=>v=='pdf'?dlPdf():dlLaporan(),{right:1,min:250})}

function dlPdf(){
 const d=laporanData(rbl),W=595,H=842,M=40,CW=W-2*M,
 LW=150,LH=Math.round(150*LOGO_PDF.h/LOGO_PDF.w*100)/100,LJ=atob(LOGO_PDF.b),
 OR='0.79 0.33 0.11',IN='0.12 0.125 0.14',MU='0.43 0.44 0.46',LN='0.91 0.9 0.87',BG='0.97 0.96 0.95',
 cx=document.createElement('canvas').getContext('2d'),pages=[];
 let pg,y;
 const wd=(s,z,b)=>{cx.font=(b?'bold ':'')+z+'px Helvetica,Arial,sans-serif';return cx.measureText(s).width},
 cl=s=>String(s).replace(/[\u2013\u2014]/g,'-').replace(/\u2026/g,'...').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[^\x20-\x7e\xa0-\xff]/g,'?'),
 fx=n=>Math.round(n*100)/100,
 tx=(x,yy,s,z,b,c)=>pg.push(`BT /F${b?2:1} ${z} Tf ${c||IN} rg ${fx(x)} ${fx(yy)} Td (${cl(s).replace(/[\\()]/g,'\\$&')}) Tj ET`),
 rt=(xr,yy,s,z,b,c)=>tx(xr-wd(cl(s),z,b),yy,s,z,b,c),
 rc=(x,yy,w,h,c)=>pg.push(`${c} rg ${fx(x)} ${fx(yy)} ${fx(w)} ${fx(h)} re f`),
 ln=yy=>pg.push(`${LN} RG 0.6 w ${M} ${fx(yy)} m ${W-M} ${fx(yy)} l S`),
 np=()=>{pg=[];pages.push(pg);y=H-M},
 nd=h=>{if(y-h<M+24)np()},
 wr=(s,mw,z,b)=>{const o=[];let l='';String(s).split(/\s+/).forEach(w=>{const t=l?l+' '+w:w;if(!l||wd(cl(t),z,b)<=mw)l=t;else{o.push(l);l=w}});if(l)o.push(l);return(o.length?o:['']).map(l=>{while(wd(cl(l),z,b)>mw&&l.length>1)l=l.slice(0,-1);return l})},
 sec=(t,sub)=>{nd(60);tx(M,y,t,12,1);y-=16;if(sub){tx(M,y,sub,9.5,0,MU);y-=16}},
 row=(a,b,c)=>{nd(26);tx(M,y,a,10,1);if(c)tx(M+wd(cl(a),10,1)+8,y,c,9.5,0,MU);rt(W-M,y,b,10,1);y-=8;ln(y);y-=16},
 em=s=>{nd(24);tx(M,y,s,10,0,MU);y-=22};

 /* Kop */
 np();rc(0,H-10,W,10,OR);
 y=H-46;tx(M,y,'Laporan Bulanan',20,1);pg.push(`q ${LW} 0 0 ${LH} ${W-M-LW} ${fx(y-4)} cm /Im1 Do Q`);
 y-=18;tx(M,y,'Periode '+mlabel(rbl),11,0,MU);rt(W-M,y,'Dicetak '+now(),9,0,MU);
 y-=14;ln(y);y-=20;

 /* Ringkasan */
 /* Kartu ringkasan bergaya dashboard: putih, garis tipis, sudut membulat, chip ikon, angka besar */
 const K=0.5523,BD='0.9 0.91 0.92',CH=92,
 rrp=(x,y,w,h,r)=>{const k=r*(1-K),f=fx;return `${f(x+r)} ${f(y)} m ${f(x+w-r)} ${f(y)} l ${f(x+w-k)} ${f(y)} ${f(x+w)} ${f(y+k)} ${f(x+w)} ${f(y+r)} c ${f(x+w)} ${f(y+h-r)} l ${f(x+w)} ${f(y+h-k)} ${f(x+w-k)} ${f(y+h)} ${f(x+w-r)} ${f(y+h)} c ${f(x+r)} ${f(y+h)} l ${f(x+k)} ${f(y+h)} ${f(x)} ${f(y+h-k)} ${f(x)} ${f(y+h-r)} c ${f(x)} ${f(y+r)} l ${f(x)} ${f(y+k)} ${f(x+k)} ${f(y)} ${f(x+r)} ${f(y)} c h `},
 cp=(cx,cy,r)=>{const k=r*K,f=fx;return `${f(cx+r)} ${f(cy)} m ${f(cx+r)} ${f(cy+k)} ${f(cx+k)} ${f(cy+r)} ${f(cx)} ${f(cy+r)} c ${f(cx-k)} ${f(cy+r)} ${f(cx-r)} ${f(cy+k)} ${f(cx-r)} ${f(cy)} c ${f(cx-r)} ${f(cy-k)} ${f(cx-k)} ${f(cy-r)} ${f(cx)} ${f(cy-r)} c ${f(cx+k)} ${f(cy-r)} ${f(cx+r)} ${f(cy-k)} ${f(cx+r)} ${f(cy)} c h `},
 ls=(...a)=>{let o='';for(let n=0;n<a.length;n+=2)o+=`${fx(a[n])} ${fx(a[n+1])} ${n?'l':'m'} `;return o},
 ico=(t,cx,cy)=>{const P=t=='doc'?rrp(cx-5,cy-6.5,10,13,2)+ls(cx-2.5,cy+2.5,cx+2.5,cy+2.5)+ls(cx-2.5,cy,cx+2.5,cy)+ls(cx-2.5,cy-2.5,cx+1,cy-2.5)
  :t=='check'?cp(cx,cy,6.2)+ls(cx-2.6,cy-.1,cx-.8,cy-2.1,cx+2.8,cy+2.2)
  :t=='cal'?rrp(cx-6,cy-6,12,11.5,2)+ls(cx-6,cy+.5,cx+6,cy+.5)+ls(cx-3,cy+7,cx-3,cy+4.5)+ls(cx+3,cy+7,cx+3,cy+4.5)
  :cp(cx,cy,6.2)+ls(cx,cy+3,cx,cy,cx+2.6,cy-1.6);
  pg.push(`q ${IN} RG 1.1 w 1 J 1 j ${P} S Q`)},
 S=[['Jumlah aduan',d.tk.length,'doc'],['Aduan selesai',d.done.length,'check'],['Jumlah konsultasi',d.ck.length,'cal'],['SLA tercapai',d.pct==null?'-':d.pct+'%','clock']],bw=(CW-30)/4;
 S.forEach((s,i)=>{const x=M+i*(bw+10);
  pg.push(`q 1 1 1 rg ${BD} RG 0.8 w ${rrp(x,y-CH,bw,CH,14)} B Q`);
  pg.push(`q 1 1 1 rg ${BD} RG 0.8 w ${rrp(x+12,y-38,26,26,8)} B Q`);
  ico(s[2],x+25,y-25);
  tx(x+12,y-66,String(s[1]),22,1);tx(x+12,y-82,s[0],9,0,MU)});
 y-=CH+28;

 /* SLA */
 sec('SLA waktu penyelesaian','Rata-rata penyelesaian: '+fh(d.avg));
 Object.keys(SLA).forEach(p=>{const l=d.done.filter(t=>t.pri==p),hs=l.map(hrsOf).filter(h=>h!=null);row(p,hs.length?fh(hs.reduce((a,b)=>a+b,0)/hs.length):'-','Target '+SLA[p]+' jam, '+l.length+' selesai')});
 y-=10;

 /* Aduan per modul */
 const mods={};d.tk.forEach(t=>mods[t.mod]=(mods[t.mod]||0)+1);
 sec('Aduan per modul');
 const me=Object.entries(mods).sort((a,b)=>b[1]-a[1]);
 me.length?me.forEach(x=>row(x[0],String(x[1]))):em('Belum ada aduan pada periode ini.');
 y-=10;

 /* Konsultasi per status */
 const cst={};d.ck.forEach(c=>cst[c.st]=(cst[c.st]||0)+1);
 sec('Konsultasi per status');
 const ce=Object.entries(cst);
 ce.length?ce.forEach(x=>row(x[0],String(x[1]))):em('Belum ada konsultasi pada periode ini.');
 y-=10;

 /* Tabel rincian */
 const cols=[['No',58],['Judul',198],['Prioritas',62],['Target',52],['Aktual',58],['SLA',87]],
 th=()=>{rc(M,y-18,CW,22,BG);let x=M;cols.forEach(c=>{tx(x+6,y-12,c[0],9,1,MU);x+=c[1]});y-=22},
 col={Tercapai:'0.06 0.56 0.36',Terlambat:'0.79 0.19 0.16',Berjalan:'0.66 0.42 0'};
 nd(90);tx(M,y,'Rincian SLA per aduan',12,1);y-=14;th();
 if(!d.tk.length)em('Tidak ada aduan pada periode ini.');
 d.tk.forEach(t=>{
  const tl=wr(t.title,cols[1][1]-12,9.5,1),rh=27+tl.length*12,s=slaOf(t);
  if(y-rh<M+24){np();th()}
  let x=M;
  tx(x+6,y-14,t.id,9.5);x+=cols[0][1];
  tl.forEach((l,i)=>tx(x+6,y-14-i*12,l,9.5,1));
  tx(x+6,y-14-(tl.length-1)*12-11,t.mod,8.5,0,MU);x+=cols[1][1];
  tx(x+6,y-14,t.pri,9.5);x+=cols[2][1];
  tx(x+6,y-14,SLA[t.pri]+' jam',9.5);x+=cols[3][1];
  tx(x+6,y-14,fh(hrsOf(t)),9.5);x+=cols[4][1];
  tx(x+6,y-14,s,9.5,1,col[s]);
  y-=rh;ln(y);
 });

 /* Footer tiap halaman */
 pages.forEach((p,i)=>{pg=p;tx(M,22,'Laporan Bulanan '+mlabel(rbl),8,0,MU);rt(W-M,22,'Halaman '+(i+1)+' dari '+pages.length,8,0,MU)});

 /* Susun file PDF */
 const o=['<</Type/Catalog/Pages 2 0 R>>',null,'<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>','<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>',`<</Type/XObject/Subtype/Image/Width ${LOGO_PDF.w}/Height ${LOGO_PDF.h}/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ${LJ.length}>>\nstream\n${LJ}\nendstream`],kids=[];
 pages.forEach(p=>{const c=p.join('\n'),pn=o.length+1;kids.push(pn+' 0 R');o.push(`<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${W} ${H}]/Resources<</Font<</F1 3 0 R/F2 4 0 R>>/XObject<</Im1 5 0 R>>>>/Contents ${pn+1} 0 R>>`,`<</Length ${c.length}>>\nstream\n${c}\nendstream`)});
 o[1]=`<</Type/Pages/Kids[${kids.join(' ')}]/Count ${pages.length}>>`;
 let out='%PDF-1.4\n';const off=[];
 o.forEach((b,i)=>{off.push(out.length);out+=(i+1)+' 0 obj\n'+b+'\nendobj\n'});
 const xr=out.length;
 out+='xref\n0 '+(o.length+1)+'\n0000000000 65535 f \n'+off.map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<</Size '+(o.length+1)+'/Root 1 0 R>>\nstartxref\n'+xr+'\n%%EOF';
 saveBlob(new Blob([Uint8Array.from(out,c=>c.charCodeAt(0))],{type:'application/pdf'}),'laporan-'+rbl+'.pdf');
 toast('Laporan PDF diunduh');
}
