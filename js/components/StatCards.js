function KotakStat({ ikon, label, nilai, ket, kelas }) {
  const angka = useCountUp(nilai);
  return /* @__PURE__ */ React.createElement("div", { className: "sk " + kelas }, /* @__PURE__ */ React.createElement("div", { className: "sr" }, /* @__PURE__ */ React.createElement("i", { dangerouslySetInnerHTML: { __html: ic(ikon, 18) } }), /* @__PURE__ */ React.createElement("b", null, angka)), /* @__PURE__ */ React.createElement("strong", null, label), /* @__PURE__ */ React.createElement("small", null, ket));
}
function StatCards({ items }) {
  return items.map((s) => /* @__PURE__ */ React.createElement(KotakStat, { key: s.label, ...s }));
}
