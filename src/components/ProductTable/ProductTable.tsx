import type { ProductTableProps } from '../../interfaces/ProductTable.interface';
import formatAmount from '../../helpers/formatAmount/formatAmount';
import { Th } from './ProductTable.styled';

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <div className='table-responsive mt-5'>
      <table className='table table-striped table-bordered'>
        <thead className='table-dark'>
          <tr>
            <Th $align='start' $minWidth='2rem'>Descripción</Th>
            <Th $align='end' $minWidth='6rem'>Cant</Th>
            <Th $align='end' $minWidth='8rem'>Código</Th>
            <Th $align='end' $minWidth='8rem'>$ Venta</Th>
            <Th $align='center' $minWidth='12rem'>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td className='text-start text-truncate'>{p.description}</td>
              <td className='text-end'>{p.quantity}</td>
              <td className='text-end'>{p.code}</td>
              <td className='text-end'>{formatAmount(p.price ?? 0)}</td>
              <td className='text-center'>
                <div className='d-flex justify-content-center gap-2'>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={() => onEdit(i)}
                  >
                    Editar
                  </button>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={() => onDelete(i)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
