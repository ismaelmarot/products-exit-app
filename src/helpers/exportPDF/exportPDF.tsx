import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Step1GeneralDataProps } from '../../interfaces/Step1GeneralData.interface';
import type { ProductProps } from '../../interfaces/Product.interface';
import type { ExportOptions } from '../../interfaces/ExportOptions.interface';

function exportPDF(
  generalData: Step1GeneralDataProps,
  products: ProductProps[],
  totalVenta: number,
  options: ExportOptions = {}
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(14);
  doc.text('Resumen de Productos', 14, 20);

  doc.setFontSize(11);

  doc.text(`Motivo: ${generalData.generalData.reason}`, 14, 30);
  const salidaText = `Salida: ${generalData.generalData.departureDate}`;
  const salidaWidth = doc.getTextWidth(salidaText);
  doc.text(salidaText, pageWidth - 14 - salidaWidth, 30);

  doc.text(`Responsable: ${generalData.generalData.personInCharge}`, 14, 37);
  const regresoText = `Regreso: ${generalData.generalData.returnDate}`;
  const regresoWidth = doc.getTextWidth(regresoText);
  doc.text(regresoText, pageWidth - 14 - regresoWidth, 37);

  const rows: (string | number)[][] = products.map((p) => [
    p.description,
    p.producer ?? '',
    p.category ?? '',
    p.code ?? '',
    p.quantity ?? 0,
    Number(p.price ?? 0).toLocaleString('es-AR', { minimumFractionDigits: 2 }),
  ]);

  autoTable(doc, {
    startY: 45,
    head: [['Descripción', 'Productor', 'Rubro', 'Código', 'Cantidad', 'Precio']],
    body: rows as any,
  });

  const finalY = (doc as any).lastAutoTable.finalY || 60;
  doc.text(
    `Total Venta: $${totalVenta.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`,
    14,
    finalY + 10
  );

  if (options.returnBlob) {
    return doc.output('blob');
  }

  doc.save('resumen-productos.pdf');
}

export default exportPDF;
