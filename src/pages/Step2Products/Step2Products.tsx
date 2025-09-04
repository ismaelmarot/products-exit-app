import { useState } from 'react';
import { Container } from 'react-bootstrap';
import type { Step2ProductsProps } from '../../interfaces/Step2Products.interface';
import type { ProductProps } from '../../interfaces/Product.interface';

import ProductTable from '../../components/ProductTable/ProductTable';
import ProductForm from '../../components/ProductForm/ProductForm/ProductForm';

const Step2Productos = ({ initialProducts = [], onNext, onBack }: Step2ProductsProps) => {
    const [products, setProducts] = useState<ProductProps[]>(initialProducts);

    const addProduct = (product: ProductProps) => {
        setProducts([...products, product]);
    };

    const updateProduct = (index: number, updated: ProductProps) => {
        const newProducts = [...products];
        newProducts[index] = updated;
        setProducts(newProducts);
    };

    const deleteProduct = (index: number) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    return (
        <Container>
        <h2>Productos</h2>

        <ProductForm onAdd={addProduct} />

        <ProductTable
            products={products}
            onUpdate={updateProduct}
            onDelete={deleteProduct}
        />

        <div style={{ marginTop: "1rem" }}>
            <button className="btn btn-secondary me-2" onClick={onBack}>Atrás</button>
            <button className="btn btn-primary" onClick={() => onNext(products)}>Siguiente</button>
        </div>
        </Container>
    );
};

export default Step2Productos;
