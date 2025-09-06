import type { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { EditProductModalProps } from '../../interfaces/EditProductModal.interface';
import ProductForm from '../ProductForm/ProductForm/ProductForm';

const EditProductModal: FC<EditProductModalProps> = ({ show, product, onSave, onCancel }) => {
    if (!product) return null;

    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProductForm
                    onAdd={onSave}
                    initialProduct={product}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onCancel}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProductModal;
