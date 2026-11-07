const KOMPONEN = { StatCards, TabelAduan, MenuNav };
const _props = {};
const _akar = /* @__PURE__ */ new Map();
let _id = 0;
function rprops(obj) {
  _props[++_id] = obj;
  return _id;
}
function pasangReact() {
  _akar.forEach((akar, el) => {
    if (!el.isConnected) {
      akar.unmount();
      delete _props[el.dataset.rp];
      _akar.delete(el);
    }
  });
  document.querySelectorAll("[data-react]").forEach((el) => {
    if (_akar.has(el)) return;
    const akar = ReactDOM.createRoot(el);
    ReactDOM.flushSync(() => akar.render(React.createElement(KOMPONEN[el.dataset.react], _props[el.dataset.rp])));
    _akar.set(el, akar);
  });
}
new MutationObserver(pasangReact).observe(document.body, { childList: true, subtree: true });
pasangReact();
ReactDOM.flushSync(() => ReactDOM.createRoot(document.createElement("div")).render(React.createElement(RouterAplikasi)));
