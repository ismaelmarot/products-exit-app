import { useContext, useState } from 'react';
import type { Step2ProductsProps } from '../../interfaces/Step2Products.interface';
import type { ProductProps } from '../../interfaces/Product.interface';
import ProductTable from '../../components/ProductTable/ProductTable';
import ProductForm from '../../components/ProductForm/ProductForm/ProductForm';
import { ContainerStyled } from './Step2Products.styled';
import { AppContext } from '../../context/AppContext';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import EditProductModal from '../../components/EditProductModal/EditProductModal';

const Step2Products = ({ onNext, onBack }: Step2ProductsProps) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { products, setProducts } = context;

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const [persistentProducer, setPersistentProducer] = useState('');
    const [persistentCategory, setPersistentCategory] = useState('');

    const addProduct = (product: ProductProps) => {
        setProducts([...products, product]);
        setPersistentProducer(product.producer || '');
        setPersistentCategory(product.category || '');
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

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setShowEditModal(true);
    };

    const handleSaveEdit = (updatedProduct: ProductProps) => {
        if (editIndex !== null) {
            const newProducts = [...products];
            newProducts[editIndex] = updatedProduct;
            setProducts(newProducts);
            setShowEditModal(false);
            setEditIndex(null);
        }
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
        setEditIndex(null);
    };

    return (
        <ContainerStyled>
            <h2>Productos</h2>
            <ProductForm
                onAdd={addProduct}
                persistentProducer={persistentProducer}
                setPersistentProducer={setPersistentProducer}
                persistentCategory={persistentCategory}
                setPersistentCategory={setPersistentCategory}
            />
            <div className='d-flex justify-content-between mt-3'>
                <button className='btn btn-secondary me-2' onClick={onBack}>Atrás</button>
                <button className='btn btn-primary' onClick={onNext}>Siguiente</button>
            </div>
            <ProductTable
                products={products}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
            <ConfirmModal
                show={showConfirm}
                title="Eliminar"
                message="¿Está seguro de que quiere eliminar este producto?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <EditProductModal
                show={showEditModal}
                product={editIndex !== null ? products[editIndex] : null}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
            />
        </ContainerStyled>
    );
};

export default Step2Products;
