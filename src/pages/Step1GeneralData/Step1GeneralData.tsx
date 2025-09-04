import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import type { GeneralDataProps } from '../../interfaces/GeneralData.interface';

const Step1GeneralData = () => {
    const [data, setData] = useState<GeneralDataProps>({
        reason: '',
        personInCharge: '',
        departureDate:  '',
        returnDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <Form>
        <Row className='mb-3'>
            <Col md={6}>
            <Form.Group controlId='reason'>
                <Form.Label>Motivo del egreso *</Form.Label>
                <Form.Control
                type='text'
                name='reason'
                placeholder='Ingrese el motivo'
                value={data.reason}
                onChange={handleChange}
                required
                />
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId='personInCharge'>
                <Form.Label>Responsable *</Form.Label>
                <Form.Control
                type='text'
                name='personInCharge'
                placeholder='Nombre del responsable'
                value={data.personInCharge}
                onChange={handleChange}
                required
                />
            </Form.Group>
            </Col>
        </Row>

        <Row className='mb-3'>
            <Col md={6}>
            <Form.Group controlId='departureDate'>
                <Form.Label>Fecha de salida *</Form.Label>
                <Form.Control
                type='date'
                name='departureDate'
                value={data.departureDate}
                onChange={handleChange}
                required
                />
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId='returnDate'>
                <Form.Label>Fin (opcional)</Form.Label>
                <Form.Control
                type='date'
                name='returnDate'
                value={data.returnDate}
                onChange={handleChange}
                />
            </Form.Group>
            </Col>
        </Row>
        </Form>
    );
};

export default Step1GeneralData;
