const JUDUL_APP = "Disty HelpDesk";
const RUTE = {
  klien: [
    { path: "beranda", view: "home", judul: "Beranda" },
    { path: "buat-aduan", view: "baru", judul: "Buat Aduan" },
    { path: "aduan", view: "aduan", judul: "Aduan Saya" },
    { path: "aduan/:id", view: "cdet", judul: "Detail Aduan", param: "td" },
    { path: "konsultasi", view: "konsul", judul: "Konsultasi" },
    { path: "konsultasi/:id", view: "konsul", judul: "Detail Konsultasi", param: "kd" },
    { path: "pusat-bantuan", view: "kb", judul: "Pusat Bantuan" },
    { path: "profil", view: "profil", judul: "Profil" }
  ],
  admin: [
    { path: "dashboard", view: "home", judul: "Dashboard" },
    { path: "aduan", view: "aduan", judul: "Semua Aduan" },
    { path: "konsultasi", view: "konsul", judul: "Konsultasi" },
    { path: "konsultasi/:id", view: "konsul", judul: "Detail Konsultasi", param: "kd" },
    { path: "tim-teknisi", view: "tim", judul: "Tim Teknisi" },
    { path: "laporan", view: "laporan", judul: "Laporan Bulanan" },
    { path: "profil", view: "profil", judul: "Profil" }
  ],
  teknisi: [
    { path: "beranda", view: "home", judul: "Beranda" },
    { path: "tugas", view: "tugas", judul: "Tugas Saya" },
    { path: "tugas/:id", view: "det", judul: "Detail Tugas", param: "td" },
    { path: "riwayat", view: "aduan", judul: "Riwayat Penanganan" },
    { path: "profil", view: "profil", judul: "Profil" }
  ]
};
let _tujuan = cocokkan(location.hash);
function cocokkan(hash) {
  const bagian = (hash || "").replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  const [peran, ...sisa] = bagian;
  if (!RUTE[peran]) return null;
  for (const rute of RUTE[peran]) {
    const pola = rute.path.split("/");
    if (pola.length !== sisa.length) continue;
    if (pola.every((p, i) => p === ":id" || p === sisa[i])) {
      return { role: peran, rute, id: rute.param ? sisa[pola.indexOf(":id")] : null };
    }
  }
  return null;
}
function nilaiParam(param) {
  return param === "td" ? td : kd;
}
function ruteAktif() {
  if (!role) return null;
  const daftar = RUTE[role];
  return daftar.find((r) => r.view === view && r.param && nilaiParam(r.param)) || daftar.find((r) => r.view === view && !r.param) || daftar[0];
}
function urlDariState() {
  const r = ruteAktif();
  if (!r) return null;
  const id = r.param ? encodeURIComponent(nilaiParam(r.param)) : "";
  return "#/" + role + "/" + r.path.replace(":id", id);
}
function sinkronRute() {
  const url = urlDariState();
  if (!url) {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    document.title = JUDUL_APP;
    return;
  }
  if (location.hash !== url) {
    const sekarang = cocokkan(location.hash);
    if (sekarang && sekarang.role === role) location.hash = url;
    else location.replace(url);
  }
  document.title = ruteAktif().judul + " · " + JUDUL_APP;
}
function cariId(param, id) {
  const daftar = param === "td" ? T : C;
  const ketemu = daftar.find((x) => String(x.id) === String(id));
  return ketemu ? ketemu.id : void 0;
}
function ruteSah(cocok, peran) {
  if (!cocok || cocok.role !== peran) return false;
  return !cocok.rute.param || cariId(cocok.rute.param, cocok.id) !== void 0;
}
function bukaRute(cocok) {
  const { rute, id } = cocok;
  view = rute.view;
  PGS = [];
  td = rute.param === "td" ? cariId("td", id) : td;
  kd = rute.param === "kd" ? cariId("kd", id) : 0;
  if (rute.view === "cdet") cbk = "aduan";
}
function terapkanTujuan() {
  if (_tujuan && ruteSah(_tujuan, role)) bukaRute(_tujuan);
  _tujuan = null;
}
function useHash() {
  const [hash, setHash] = React.useState(location.hash);
  React.useEffect(() => {
    const ubah = () => setHash(location.hash);
    window.addEventListener("hashchange", ubah);
    return () => window.removeEventListener("hashchange", ubah);
  }, []);
  return hash;
}
function RouterAplikasi() {
  const hash = useHash();
  React.useEffect(() => {
    const cocok = cocokkan(hash);
    if (!role) {
      if (cocok) {
        _tujuan = cocok;
        sinkronRute();
      }
      return;
    }
    if (!ruteSah(cocok, role)) {
      sinkronRute();
      return;
    }
    if (urlDariState() !== hash) {
      bukaRute(cocok);
      render();
      scrollTo(0, 0);
    }
  }, [hash]);
  return null;
}
function MenuNav({ items, view: aktif, cbk: asal }) {
  return items.map((n) => {
    const on = aktif === n[0] || aktif === "det" && n[0] === "tugas" || aktif === "cdet" && n[0] === asal;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: n[0],
        className: "nav " + (on ? "on" : ""),
        onClick: () => {
          view = n[0];
          kd = 0;
          PGS = [];
          if (innerWidth <= 900) sbo = false;
          render();
        },
        dangerouslySetInnerHTML: { __html: ic(n[1]) + " " + n[2] }
      }
    );
  });
}
