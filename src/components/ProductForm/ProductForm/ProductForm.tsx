import { useState, type ChangeEvent } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import type { ProductProps } from '../../../interfaces/Product.interface';
import type { ProductFormProps } from '../../../interfaces/ProductForm';
import ProductInput from '../ProductInput/ProductInput';
import { FormStyled } from './ProductForm.styled';

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

    let newValue: string | number = value;

    if (name === 'quantity' || name === 'price') {
      newValue = Number(value);
    }
    if (name === 'code') {
      newValue = value.toUpperCase();
    }

    setProduct({ ...product, [name]: newValue });
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
    <FormStyled onSubmit={handleSubmit} className='mb-3'>
      <Row className='mb-2'>
        <Col md={6}>
          <ProductInput
            label="Productor"
            name='producer'
            value={product.producer}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md={6}>
          <ProductInput
            label="Rubro"
            name='category'
            value={product.category}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md={12}>
          <ProductInput
            label="Descripción (obligatorio)"
            name='description'
            value={product.description}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md={4}>
          <ProductInput
            label="Cantidad"
            name='quantity'
            type='number'
            value={product.quantity}
            onChange={handleChange}
            min={1}
            required
          />
        </Col>
        <Col md={4}>
          <ProductInput
            label="Código"
            name='code'
            value={product.code}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <ProductInput
            label="$ Venta"
            name='price'
            type='number'
            value={product.price}
            onChange={handleChange}
            min={0}
            step={0.01}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col md={12} className='d-flex justify-content-end mt-2'>
          <Button type='submit' variant='primary'>
            Agregar
          </Button>
        </Col>
      </Row>
    </FormStyled>
  );
};

export default ProductForm;
