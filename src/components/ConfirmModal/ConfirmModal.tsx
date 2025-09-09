import type { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { ConfirmModalProps } from '../../interfaces/ConfirmModal.interface';

const ConfirmModal: FC<ConfirmModalProps> = ({ show, title = 'Confirmación', message, onConfirm, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onCancel}>Cancelar</Button>
                <Button variant='danger' onClick={onConfirm}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
