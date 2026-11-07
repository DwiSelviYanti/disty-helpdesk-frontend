function useCountUp(n, durasi = 800) {
  const [nilai, setNilai] = React.useState(0);
  React.useEffect(() => {
    let mulai = null;
    let raf;
    const langkah = (ts) => {
      mulai != null ? mulai : mulai = ts;
      const p = Math.min((ts - mulai) / durasi, 1);
      setNilai(Math.round(n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(langkah);
    };
    raf = requestAnimationFrame(langkah);
    return () => cancelAnimationFrame(raf);
  }, [n, durasi]);
  return nilai;
}
