export const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    const [year, month, day] = dateStr.split('-');
    return `${day.padStart(2,'0')}/${month.padStart(2,'0')}/${year}`;
};
