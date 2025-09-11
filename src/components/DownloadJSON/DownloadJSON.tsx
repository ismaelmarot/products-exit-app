import { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import type { ProductProps } from '../../interfaces/Product.interface';
import type { DownloadJSONProps } from '../../interfaces/DownloadJSON.interface';

const sortProducts = (
    products: ProductProps[],
    order1: string,
    order2: string,
    order3: string,
    sortType: 'asc' | 'desc'
) => {
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

const getDefaultFileName = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dd = pad(now.getDate());
    const mm = pad(now.getMonth() + 1);
    const yyyy = now.getFullYear();
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());

    return `salida-${dd}_${mm}_${yyyy}-${hh}_${min}`;
};

const DownloadJSON: React.FC<DownloadJSONProps> = ({ show, onHide }) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { generalData, products, order1, order2, order3, sortType } = context;
    const [fileName, setFileName] = useState(getDefaultFileName());

    useEffect(() => {
        if (show) setFileName(getDefaultFileName());
    }, [show]);

    const handleDownloadJSON = () => {
        if (products.length === 0) return;

        const sortedProducts = sortProducts(products, order1, order2, order3, sortType);

        const data = {
            generalData,
            products: sortedProducts,
            order1,
            order2,
            order3,
            sortType,
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.trim() !== '' ? `${fileName}.json` : `${getDefaultFileName()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>Descargar JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
            <Form.Label>Nombre del archivo:</Form.Label>
            <InputGroup>
                <Form.Control
                type='text'
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Ingrese un nombre o déjelo por defecto"
                />
            </InputGroup>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={onHide}>Cancelar</Button>
            <Button variant='info' onClick={handleDownloadJSON}>Descargar</Button>
        </Modal.Footer>
        </Modal>
    );
};

export default DownloadJSON;
