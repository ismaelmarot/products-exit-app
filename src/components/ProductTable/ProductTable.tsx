import type { ProductTableProps } from '../../interfaces/ProductTable.interface';
import { TableStyled } from './ProductTable.styled';

const ProductTable = ({ products, onUpdate, onDelete }: ProductTableProps) => {
    return (
        <TableStyled>
            <thead>
                <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Código</th>
                <th>Precio</th>
                <th>Productor</th>
                <th>Rubro</th>
                <th>Forma de pago</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p, i) => (
                <tr key={i}>
                    <td>{p.description}</td>
                    <td>{p.quantity}</td>
                    <td>{p.code}</td>
                    <td>{p.price}</td>
                    <td>{p.producer}</td>
                    <td>{p.category}</td>
                    <td>{p.paymentMethod}</td>
                    <td>
                    <button onClick={() => onUpdate(i, p)}>Editar</button>
                    <button onClick={() => onDelete(i)}>Eliminar</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </TableStyled>
    );
};

export default ProductTable;
