import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import sortProducts from '../../helpers/sortProducts/sortProducts';
import exportPDF from '../../helpers/exportPDF/exportPDF';

function Step4PDF() {
  const context = useContext(AppContext);
  if (!context) return null;

  const {
    generalData,
    products,
    order1,
    order2,
    order3,
    sortType,
    setGeneralData,
    setProducts
  } = context;

  const navigate = useNavigate();

  const sortedProducts = sortProducts(products, order1, order2, order3, sortType);

  // Total venta
  const totalVenta = sortedProducts.reduce((acc, p) => {
    const quantity = Number(p.quantity ?? 0);
    const price = Number(p.price ?? 0);
    return acc + quantity * price;
  }, 0);

  const handleReiniciar = () => {
    setGeneralData({ reason: '', personInCharge: '', departureDate: '', returnDate: '' });
    setProducts([]);
    navigate('/step1');
  };

  const handleDownloadJSON = () => {
    const data = {
      generalData,
      products: sortedProducts,
      totalVenta,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salida-productos.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3">
      <h3>Resumen Final / Exportar</h3>

      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-secondary" onClick={() => navigate('/productos')}>
          Volver a productos
        </button>

        <button
          className="btn btn-success"
          onClick={() => exportPDF(generalData, sortedProducts, totalVenta)}
          disabled={products.length === 0}
        >
          Descargar PDF
        </button>

        <button className="btn btn-info" onClick={handleDownloadJSON}>
          Descargar JSON
        </button>

        <button
          className="btn btn-warning"
          onClick={() => {
            const blob = exportPDF(generalData, sortedProducts, totalVenta, { returnBlob: true });
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const win = window.open(url);
            if (win) {
              win.onload = () => win.print();
            }
          }}
        >
          Imprimir
        </button>

        <button className="btn btn-danger" onClick={handleReiniciar}>
          Reiniciar
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <h5>Información General</h5>
          <p><strong>Motivo:</strong> {generalData.reason}</p>
          <p><strong>Responsable:</strong> {generalData.personInCharge}</p>
          <p><strong>Salida:</strong> {generalData.departureDate}</p>
          <p><strong>Regreso:</strong> {generalData.returnDate}</p>

          <h6>Productos</h6>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Productor</th>
                <th>Rubro</th>
                <th>Código</th>
                <th className="text-end">Cantidad</th>
                <th className="text-end">Precio</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((p, i) => (
                <tr key={i}>
                  <td>{p.description}</td>
                  <td>{p.producer}</td>
                  <td>{p.category}</td>
                  <td>{p.code}</td>
                  <td className="text-end">{p.quantity ?? 0}</td>
                  <td className="text-end">{Number(p.price ?? 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-end fw-bold">Total</td>
                <td className="text-end fw-bold">{sortedProducts.reduce((a, p) => a + Number(p.quantity ?? 0), 0)}</td>
                <td className="text-end fw-bold">{totalVenta.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Step4PDF;
