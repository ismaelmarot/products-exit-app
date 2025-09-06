import type { ProductTableProps } from '../../interfaces/ProductTable.interface';
import { TableStyled, TableWrapper } from './ProductTable.styled';

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
    return (
        <TableWrapper>
            <TableStyled>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th className='text-end'>Cant</th>
                        <th className='text-end'>Código</th>
                        <th className='text-end'>$ Venta</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, i) => (
                        <tr key={i}>
                            <td>{p.description}</td>
                            <td className='text-end'>{p.quantity}</td>
                            <td className='text-end'>{p.code}</td>
                            <td className='text-end'>{p.price}</td>
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
            </TableStyled>
        </TableWrapper>
    );
};

export default ProductTable;
