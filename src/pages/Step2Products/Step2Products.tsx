import { useContext } from 'react';
import type { Step2ProductsProps } from '../../interfaces/Step2Products.interface';
import type { ProductProps } from '../../interfaces/Product.interface';
import ProductTable from '../../components/ProductTable/ProductTable';
import ProductForm from '../../components/ProductForm/ProductForm/ProductForm';
import { ContainerStyled } from './Step2Products.styled';
import { AppContext } from '../../context/AppContext';

const Step2Productos = ({ onNext, onBack }: Step2ProductsProps) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { products, setProducts } = context;

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
        <ContainerStyled>
            <h2>Productos</h2>
            <ProductForm onAdd={addProduct} />

            <div className='d-flex justify-content-between mt-3'>
                <button className='btn btn-secondary me-2' onClick={onBack}>Atrás</button>
                <button className='btn btn-primary' onClick={onNext}>Siguiente</button>

            </div>

            <ProductTable
                products={products}
                onUpdate={updateProduct}
                onDelete={deleteProduct}
            />
        </ContainerStyled>
    );
};

export default Step2Productos;
