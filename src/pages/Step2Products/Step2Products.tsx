import { useContext, useState } from 'react';
import type { Step2ProductsProps } from '../../interfaces/Step2Products.interface';
import type { ProductProps } from '../../interfaces/Product.interface';
import ProductTable from '../../components/ProductTable/ProductTable';
import ProductForm from '../../components/ProductForm/ProductForm/ProductForm';
import { ContainerStyled } from './Step2Products.styled';
import { AppContext } from '../../context/AppContext';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

const Step2Products = ({ onNext, onBack }: Step2ProductsProps) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { products, setProducts } = context;

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const addProduct = (product: ProductProps) => {
        setProducts([...products, product]);
    };

    const updateProduct = (index: number, updated: ProductProps) => {
        const newProducts = [...products];
        newProducts[index] = updated;
        setProducts(newProducts);
    };

    const handleDeleteClick = (index: number) => {
        setDeleteIndex(index);
        setShowConfirm(true);
    };

    const handleConfirmDelete = () => {
        if (deleteIndex !== null) {
            setProducts(products.filter((_, i) => i !== deleteIndex));
            setDeleteIndex(null);
            setShowConfirm(false);
        }
    };

    const handleCancelDelete = () => {
        setDeleteIndex(null);
        setShowConfirm(false);
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
                onDelete={handleDeleteClick}
            />

            <ConfirmModal
                show={showConfirm}
                title="Confirmar eliminación"
                message="¿Estás seguro de que quieres eliminar este producto?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </ContainerStyled>
    );
};

export default Step2Products;
