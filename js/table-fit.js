/* Menjaga kolom pendek (kode tiket, kode instansi, tanggal, status, dll) tetap 1 baris.
   Kolom dikenali dari teks header tabel; kolom judul/deskripsi tetap boleh turun baris. */
(function () {
  var RX = /^(no|kode|tanggal|prioritas|status|aksi|durasi|modul|rating|id)\b/i;
  var pending = false;

  function fit() {
    pending = false;
    document.querySelectorAll('table').forEach(function (tb) {
      var head = tb.querySelector('tr');
      if (!head) return;
      var cols = [];
      Array.prototype.forEach.call(head.children, function (th, i) {
        if (RX.test(th.textContent.trim())) cols.push(i);
      });
      if (!cols.length) return;
      tb.querySelectorAll('tr').forEach(function (tr) {
        if (tr.children.length !== head.children.length) return; // lewati baris colspan
        cols.forEach(function (i) { tr.children[i].classList.add('nw'); });
      });
    });
  }

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(fit);
  }

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  schedule();
})();
