import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Step1GeneralDataProps } from '../../interfaces/Step1GeneralData.interface';
import type { ProductProps } from '../../interfaces/Product.interface';

interface ExportOptions {
  returnBlob?: boolean;
}

function exportPDF(
  generalData: Step1GeneralDataProps,
  products: ProductProps[],
  totalVenta: number,
  options: ExportOptions = {}
) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Resumen de Productos', 14, 20);

  doc.setFontSize(11);
  doc.text(`Motivo: ${generalData.reason}`, 14, 30);
  doc.text(`Responsable: ${generalData.personInCharge}`, 14, 37);
  doc.text(`Salida: ${generalData.departureDate}`, 14, 44);
  doc.text(`Regreso: ${generalData.returnDate}`, 14, 51);

  const rows: (string | number)[][] = products.map((p) => [
    p.description,
    p.producer ?? '',
    p.category ?? '',
    p.code ?? '',
    p.quantity ?? 0,
    Number(p.price ?? 0).toLocaleString('es-AR', { minimumFractionDigits: 2 }),
  ]);

  autoTable(doc, {
    startY: 60,
    head: [['Descripción', 'Productor', 'Rubro', 'Código', 'Cantidad', 'Precio']],
    body: rows as any, // <-- para evitar el error de tipos con jsPDF
  });

  const finalY = (doc as any).lastAutoTable.finalY || 60;
  doc.text(`Total Venta: $${totalVenta.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, 14, finalY + 10);

  if (options.returnBlob) {
    return doc.output('blob');
  }

  doc.save('resumen-productos.pdf');
}

export default exportPDF;
