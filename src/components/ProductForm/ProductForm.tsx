import { useState, type ChangeEvent } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import type { ProductProps } from '../../interfaces/Product.interface';
import type { ProductFormProps } from '../../interfaces/ProductForm';

const ProductForm = ({ onAdd }: ProductFormProps) => {
  const [product, setProduct] = useState<ProductProps>({
    description: '',
    quantity: 1,
    code: '',
    price: 0,
    producer: '',
    category: '',
    paymentMethod: '',
  });

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: name === 'quantity' || name === 'price' ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(product);
    setProduct({
      description: '',
      quantity: 1,
      code: '',
      price: 0,
      producer: '',
      category: '',
      paymentMethod: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit} className='mb-3'>
        <Row className='mb-2'>
            <Col md={6}>
                <Form.Group controlId='producer'>
                    <Form.Label>Productor</Form.Label>
                    <Form.Control
                        type='text'
                        name='producer'
                        value={product.producer}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId='category'>
                    <Form.Label>Rubro</Form.Label>
                    <Form.Control
                        type='text'
                        name='category'
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Col>
            <Col md={12}>
                <Form.Group controlId='description'>
                    <Form.Label>Descripción <span style={{fontSize:'.7rem'}}>(obligatorio)</span></Form.Label>
                    <Form.Control
                        type='text'
                        name='description'
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId='quantity'>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                        type='number'
                        name='quantity'
                        placeholder='quantity'
                        value={product.quantity}
                        onChange={handleChange}
                        min={1}
                        required
                    />
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId='code'>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        type='text'
                        name='code'
                        value={product.code}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId='price'>
                    <Form.Label>$ Venta</Form.Label>
                    <Form.Control
                        type='number'
                        name='price'
                        placeholder='price'
                        value={product.price}
                        onChange={handleChange}
                        min={0}
                        step={0.01}
                        required
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md={12} className='d-flex justify-content-end mt-2'>
            <Button type='submit' variant='primary'>Agregar</Button>
            </Col>
        </Row>
    </Form>
  );
};

export default ProductForm;
