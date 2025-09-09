import type { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { ConfirmModalProps } from '../../interfaces/ConfirmModal.interface';

const ConfirmModal: FC<ConfirmModalProps> = ({
    show,
    title = 'Confirmación',
    message,
    onButton1,
    onButton2,
    textButton1 = 'Aceptar',
    textButton2 = 'Cancel',
}) => {
    return (
        <Modal show={show} onHide={onButton2} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onButton2}>
                    {textButton2}
                </Button>
                <Button variant='danger' onClick={onButton1}>
                    {textButton1}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
