import { useContext, useState } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import type { Step3PreviewProps } from '../../interfaces/Step3Preview.interface';
import type { ProductProps } from '../../interfaces/Product.interface';
import { formatDate } from '../../helpers/formatDate/formatDate';

const Step3Preview: React.FC<Step3PreviewProps> = ({ onBack, onNext }) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { generalData, products } = context;

    const [order1, setOrder1] = useState('');
    const [order2, setOrder2] = useState('');
    const [order3, setOrder3] = useState('');
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

    const isDisabled = (value: string, index: number) =>
        [order1, order2, order3].some((v, i) => v === value && i !== index);

    const sortProducts = () => {
        const sorted = [...products];
        const keys = [order1, order2, order3].filter(Boolean) as (keyof ProductProps)[];
        sorted.sort((a, b) => {
            for (let key of keys) {
                const valA = (a[key] ?? '').toString();
                const valB = (b[key] ?? '').toString();
                if (valA < valB) return sortType === 'asc' ? -1 : 1;
                if (valA > valB) return sortType === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sorted;
    };

    const sortedProducts = sortProducts();

    return (
        <div>
            <h2>Previsualización</h2>
            <Row className='mb-3'>
                <Col md={6}><strong>Motivo:</strong> <span data-testid="motivo">{generalData.reason}</span></Col>
                <Col md={6}><strong>Responsable:</strong> <span data-testid="responsable">{generalData.personInCharge}</span></Col>
                <Col md={6}><strong>Salida:</strong> <span data-testid="salida">{formatDate(generalData.departureDate)}</span></Col>
                <Col md={6}><strong>Regreso:</strong> <span data-testid="regreso">{formatDate(generalData.returnDate) || '-'}</span></Col>
            </Row>
            <div className='d-flex gap-2 mb-3'>
                {[order1, order2, order3].map((val, idx) => (
                    <select
                        key={idx}
                        className='form-select'
                        value={val}
                        onChange={(e) => {
                            const v = e.target.value;
                            if (idx === 0) setOrder1(v);
                            else if (idx === 1) setOrder2(v);
                            else setOrder3(v);
                        }}
                        data-testid={`order-select-${idx}`}
                    >
                        <option value=''>Orden {idx + 1}</option>
                        <option value='producer' disabled={isDisabled('producer', idx)}>Productor</option>
                        <option value='category' disabled={isDisabled('category', idx)}>Rubro</option>
                        <option value='code' disabled={isDisabled('code', idx)}>Código</option>
                    </select>
                ))}

                <select
                    className='form-select'
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value as 'asc' | 'desc')}
                    data-testid="sort-type"
                >
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
            </div>

            <Table striped bordered hover data-testid="products-table">
                <thead>
                    <tr>
                        <th>Productor</th>
                        <th>Rubro</th>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((p, idx) => (
                        <tr key={idx}>
                            <td>{p.producer}</td>
                            <td>{p.category}</td>
                            <td>{p.code}</td>
                            <td>{p.description}</td>
                            <td>{p.quantity}</td>
                            <td>{p.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className='d-flex justify-content-between mt-3'>
                <Button variant='secondary' onClick={onBack} data-testid="btn-back">Atrás</Button>
                <Button variant='primary' onClick={onNext} data-testid="btn-next">Siguiente</Button>
            </div>
        </div>
    );
};

export default Step3Preview;
