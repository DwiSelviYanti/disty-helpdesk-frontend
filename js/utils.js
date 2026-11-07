/* Ikon, helper, dropdown kustom */

/* Ikon SVG, logo, ilustrasi, dan helper ic() */
const P={dl:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',chev:'<path d="M6 9l6 6 6-6"/>',report:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 17v-3M12 17v-6M15 17v-2"/>',bell:'<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',list:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><path d="M17 4.5a3.5 3.5 0 010 7M21.5 20c0-2.5-1.5-4.5-4-5.3"/>',wrench:'<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a6 6 0 01-7.9 7.9l-6.9 6.9a2.1 2.1 0 01-3-3l6.9-6.9a6 6 0 017.9-7.9z"/>',check:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',msg:'<path d="M21 12a8 8 0 01-11.5 7.2L4 20l1.2-4.6A8 8 0 1121 12z"/>',out:'<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>',db:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',clip:'<path d="M21 11l-8.5 8.5a5 5 0 01-7-7L14 4a3.5 3.5 0 015 5l-8.5 8.5a2 2 0 01-3-3L15 7"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',pin:'<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',phone:'<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',moon:'<path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'};
const LG='<span class="lgp"><img src="assets/logo-disty.png" alt="Disty Teknologi"></span>',PH='assets/ruang-riset.jpg';
const ic=(n,z=20)=>`<svg width=${z} height=${z} viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>${P[n]}</svg>`;
const HBI='<img class=hbi alt="" src="assets/ilustrasi-beranda.png">',PF={},ILL=`<svg viewBox="0 0 260 170" aria-hidden="true"><ellipse cx="150" cy="158" rx="105" ry="9" fill="#f1d8c8"/><rect x="40" y="14" width="104" height="66" rx="10" fill="#fff" stroke="#ebd0bf"/><path d="M54 32h50M54 44h74M54 56h38" stroke="#e8b998" stroke-width="5" stroke-linecap="round"/><circle cx="220" cy="46" r="15" fill="#f6d9c6"/><path d="M213 46h14M213 51h8" stroke="#e3a278" stroke-width="3" stroke-linecap="round"/><path d="M22 150c-12-26-10-48 4-62 4 20 8 40-4 62zM30 150c4-24 16-40 32-46-2 22-12 40-32 46z" fill="#4c9a73"/><path d="M26 150c2-18 10-30 18-36" stroke="#7cc29b" stroke-width="3" fill="none"/><path d="M14 150h28l-4 12H18z" fill="#3a3d44"/><rect x="62" y="146" width="190" height="8" rx="4" fill="#f1d8c8"/><ellipse cx="112" cy="84" rx="19" ry="23" fill="#1d1e22"/><path d="M92 146v-34a22 22 0 0 1 44 0v34z" fill="#e0702f"/><circle cx="114" cy="80" r="15" fill="#f2c4a2"/><path d="M98 78c2-15 28-17 33 0-9-6-23-6-33 0z" fill="#1d1e22"/><path d="M128 124l34 8" stroke="#f2c4a2" stroke-width="7" stroke-linecap="round"/><path d="M146 100h54l7 46h-70z" fill="#2a2c31"/><path d="M154 108h38l4 30h-46z" fill="#f0975f"/><rect x="138" y="144" width="78" height="5" rx="2" fill="#1a1b1f"/></svg>`;

/* Kolom kata sandi dengan tombol mata untuk menampilkan atau menyembunyikan isi. */
P.eye='<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>';
P.eyeoff='<path d="M17.9 17.9A10.1 10.1 0 0112 19C5.6 19 2 12 2 12a18.1 18.1 0 015.1-5.9M9.9 5.2A9.7 9.7 0 0112 5c6.4 0 10 7 10 7a18.2 18.2 0 01-2.2 3.2M1 1l22 22"/><path d="M9.9 9.9a3 3 0 004.2 4.2"/>';
function kolomSandi(id,ac,ph,extra){return `<div class="pwf"><input id="${id}" type="password" autocomplete="${ac}"${ph?` placeholder="${ph}"`:''} ${extra||''}><button type="button" class="pwt" aria-label="Tampilkan kata sandi" aria-pressed="false" onclick="lihatSandi(this)">${ic('eye',18)}</button></div>`}
function lihatSandi(b){const i=b.parentElement.querySelector('input'),t=i.type=='password';i.type=t?'text':'password';b.innerHTML=ic(t?'eyeoff':'eye',18);b.setAttribute('aria-pressed',t);b.setAttribute('aria-label',t?'Sembunyikan kata sandi':'Tampilkan kata sandi');i.focus()}

/* Helper umum: selektor $, format waktu, toast, badge status/prioritas, validasi email, animasi angka, reveal */
function countUp(r=document){r.querySelectorAll('.cu').forEach(e=>{const n=+e.dataset.n,sf=e.dataset.s||'';let t0=null;const f=ts=>{t0??=ts;const p=Math.min((ts-t0)/800,1);e.textContent=Math.round(n*(1-Math.pow(1-p,3)))+sf;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)})}
const $=s=>document.querySelector(s);
const now=()=>{const d=new Date();return d.toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})+', '+d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}).replace(':','.')};
const toast=t=>{document.getElementById('ib')?.remove();const o=document.createElement('div');o.id='ib';o.className='ibk';o.innerHTML='<div class="ibx" role="alertdialog" aria-modal="true" aria-labelledby="ibt" aria-describedby="ibm"><div class="ibh" id="ibt">Informasi</div><div class="ibm" id="ibm"></div><div class="ibf"><button type="button" class="ibb">Baiklah</button></div></div>';o.querySelector('#ibm').textContent=t;const b=o.querySelector('.ibb');b.onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove()};document.body.appendChild(o);b.focus()};
document.addEventListener('keydown',e=>{if(e.key=='Escape')document.getElementById('ib')?.remove()});
const pri=p=>`<span class="pill P${p}">${p}</span>`;
const pill=s=>`<span class="pill ${s}">${s}</span>`;
const EMRE=/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;
function reveal(){const g=['.hd6','.met>div','.rg','.sg6>div','.stp6>div','.pc','.pt .w','.two>div','.cta6 .w'],els=[];g.forEach(q=>document.querySelectorAll('.L '+q).forEach((e,i)=>{e.classList.add('rev');e.style.transitionDelay=(i%4)*90+'ms';els.push(e)}));const io=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;const e=x.target;e.classList.add('in');io.unobserve(e);if(e.matches('.met>div'))countUp(e);setTimeout(()=>e.style.transitionDelay='',1400)}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});els.forEach(e=>io.observe(e))}
const KS=c=>'KS-'+String(c.id).padStart(3,'0'),eh=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])),cn=()=>ME.klien.n.split(' (')[0],
cact=c=>c.st=='Menunggu'?`<div class=acts><button class="btn s" onclick="cs(${c.id},'Terjadwal')">Setujui</button><button class="btn s o" onclick="cs(${c.id},'Ditolak')">Tolak</button></div>`:c.st=='Terjadwal'?`<div class=acts><button class="btn s" onclick="cs(${c.id},'Jadi')">Ambil proyek</button><button class="btn s o" onclick="cs(${c.id},'Tidak')">Tidak</button></div>`:'';

/* Dropdown kustom: mengganti tampilan semua <select> dengan menu seragam.
   <select> asli tetap ada (disembunyikan) supaya nilai dan onchange lama tetap jalan.
   ddOpen() juga dipakai menu lain, misalnya menu Unduh di Laporan */
(function(){
const CH='<svg class=ddc width=16 height=16 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2.2 stroke-linecap=round stroke-linejoin=round><path d="M6 9l6 6 6-6"/></svg>',
CK='<svg class=ddk width=16 height=16 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2.4 stroke-linecap=round stroke-linejoin=round><path d="M5 12l5 5 9-10"/></svg>';
let menu=null,anchor=null;

function closeMenu(){
 if(menu){menu.remove();menu=null}
 if(anchor){anchor.classList.remove('open');anchor.setAttribute('aria-expanded','false');anchor=null}
}

/* items: [{v, t, s?, i?, sel?, dis?}]. pick(v) dipanggil saat item dipilih. opt: {right, min} */
function ddOpen(btn,items,pick,opt){
 opt=opt||{};
 if(anchor===btn){closeMenu();return}
 closeMenu();
 const m=document.createElement('div');m.className='ddm';m.setAttribute('role','listbox');
 items.forEach(it=>{
  const b=document.createElement('button');b.type='button';b.className='ddi'+(it.sel?' sel':'')+(it.dis?' dis':'');
  b.setAttribute('role','option');b.setAttribute('aria-selected',it.sel?'true':'false');
  if(it.dis)b.disabled=true;
  if(it.i){const ic=document.createElement('span');ic.className='ddi-ic';ic.innerHTML=it.i;b.appendChild(ic)}
  const t=document.createElement('span');t.className='ddt';
  const bt=document.createElement('b');bt.textContent=it.t;t.appendChild(bt);
  if(it.s){const sm=document.createElement('small');sm.textContent=it.s;t.appendChild(sm)}
  b.appendChild(t);
  if(it.sel)b.insertAdjacentHTML('beforeend',CK);
  b.addEventListener('click',e=>{e.stopPropagation();closeMenu();pick(it.v)});
  m.appendChild(b);
 });
 const r=btn.getBoundingClientRect();
 m.style.minWidth=Math.max(r.width,opt.min||0)+'px';
 m.style.visibility='hidden';
 document.body.appendChild(m);
 const mh=m.offsetHeight,mw=m.offsetWidth;
 let top=r.bottom+6,left=opt.right?r.right-mw:r.left;
 if(top+mh>innerHeight-8){
  if(r.top-mh-6>8)top=r.top-mh-6;
  else m.style.maxHeight=Math.max(120,innerHeight-top-12)+'px';
 }
 left=Math.max(8,Math.min(left,innerWidth-mw-8));
 m.style.top=top+'px';m.style.left=left+'px';m.style.visibility='';
 menu=m;anchor=btn;btn.classList.add('open');btn.setAttribute('aria-expanded','true');
 const f=m.querySelector('.ddi.sel')||m.querySelector('.ddi:not(:disabled)');
 if(f)f.focus({preventScroll:true});
 m.addEventListener('keydown',e=>{
  const l=[...m.querySelectorAll('.ddi:not(:disabled)')],i=l.indexOf(document.activeElement);
  if(e.key=='ArrowDown'){e.preventDefault();l[(i+1)%l.length]?.focus()}
  else if(e.key=='ArrowUp'){e.preventDefault();l[(i-1+l.length)%l.length]?.focus()}
  else if(e.key=='Home'){e.preventDefault();l[0]?.focus()}
  else if(e.key=='End'){e.preventDefault();l[l.length-1]?.focus()}
  else if(e.key=='Tab'){closeMenu()}
 });
}

document.addEventListener('mousedown',e=>{if(menu&&!menu.contains(e.target)&&!(anchor&&anchor.contains(e.target)))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&menu){const a=anchor;closeMenu();a&&a.focus()}});
addEventListener('scroll',e=>{if(menu&&!menu.contains(e.target))closeMenu()},true);
addEventListener('resize',closeMenu);

function label(sel,b){
 const o=sel.options[sel.selectedIndex];
 b.querySelector('.ddl').textContent=o?o.textContent:'';
 b.classList.toggle('ph',!!o&&o.value==='');
}

function enhance(sel){
 if(sel.dataset.dd)return;
 sel.dataset.dd=1;
 const small=sel.classList.contains('tsel'),pri=sel.classList.contains('sbtn'),
 w=document.createElement('span');
 w.className='dd'+(small||pri?' auto':'');
 w.style.flex=sel.style.flex;w.style.minWidth=sel.style.minWidth;
 const b=document.createElement('button');
 b.type='button';b.className='ddb'+(small?' sm':'')+(pri?' pri':'');
 b.setAttribute('aria-haspopup','listbox');b.setAttribute('aria-expanded','false');
 b.innerHTML='<span class=ddl></span>'+CH;
 b.disabled=sel.disabled;
 sel.parentNode.insertBefore(w,sel);
 w.appendChild(b);w.appendChild(sel);
 label(sel,b);
 sel.addEventListener('change',()=>label(sel,b));
 b.addEventListener('click',e=>{
  e.stopPropagation();
  const items=[...sel.options].map((o,i)=>({v:o.value,t:o.textContent,sel:i==sel.selectedIndex&&o.value!=='',dis:o.disabled,ph:i==0&&o.value===''})).filter(x=>!x.ph);
  ddOpen(b,items,v=>{sel.value=v;label(sel,b);sel.dispatchEvent(new Event('change',{bubbles:true}))});
 });
}

function scan(root){root.querySelectorAll&&root.querySelectorAll('select:not([data-dd])').forEach(enhance)}
new MutationObserver(ms=>{
 ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType==1){n.matches('select')?enhance(n):scan(n)}}));
 if(anchor&&!document.contains(anchor))closeMenu();
}).observe(document.body,{childList:true,subtree:true});
scan(document);

window.ddOpen=ddOpen;window.ddClose=closeMenu;
})();
