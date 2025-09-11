
export const getDefaultFileName = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dd = pad(now.getDate());
    const mm = pad(now.getMonth() + 1);
    const yyyy = now.getFullYear();
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());

  return `salida-${dd}_${mm}_${yyyy}-${hh}_${min}`;
};
