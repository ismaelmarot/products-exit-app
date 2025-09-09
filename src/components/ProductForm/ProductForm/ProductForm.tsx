import { useState, useEffect, type ChangeEvent } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import type { ProductProps } from '../../../interfaces/Product.interface';
import type { ProductFormProps } from '../../../interfaces/ProductForm';
import { FormStyled } from './ProductForm.styled';
import ClearableInput from '../../ClearableInput/ClearableInput';

const ProductForm = ({
  onAdd,
  initialProduct,
  persistentProducer,
  setPersistentProducer,
  persistentCategory,
  setPersistentCategory,
}: ProductFormProps) => {
  const [product, setProduct] = useState<ProductProps>({
    description: '',
    quantity: 1,
    code: '',
    price: 0,
    producer: persistentProducer || '',
    category: persistentCategory || '',
    paymentMethod: '',
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct({
        ...initialProduct,
        price: initialProduct.price ?? 0,
        quantity: initialProduct.quantity ?? 1,
      });
    } else {
      setProduct((prev) => ({
        ...prev,
        producer: persistentProducer || '',
        category: persistentCategory || '',
      }));
    }
  }, [initialProduct, persistentProducer, persistentCategory]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let newValue: string | number = value;

    if (name === 'quantity' || name === 'price') {
      newValue = value === '' ? 0 : Number(value);
    }
    if (name === 'code') {
      newValue = value.toUpperCase();
    }

    setProduct((prev) => ({ ...prev, [name]: newValue }));

    if (name === 'producer' && setPersistentProducer) setPersistentProducer(value);
    if (name === 'category' && setPersistentCategory) setPersistentCategory(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...product,
      quantity: Number(product.quantity),
      price: Number(product.price),
    });

    if (!initialProduct) {
      setProduct((prev) => ({
        ...prev,
        description: '',
        quantity: 1,
        code: '',
        price: 0,
      }));
    }
  };

  const handleClearProducer = () => {
    if (setPersistentProducer) setPersistentProducer('');
    setProduct((prev) => ({ ...prev, producer: '' }));
  };

  const handleClearCategory = () => {
    if (setPersistentCategory) setPersistentCategory('');
    setProduct((prev) => ({ ...prev, category: '' }));
  };

  return (
    <FormStyled onSubmit={handleSubmit} className='mb-3'>
      <Row className='mb-2'>
        <Col md={6}>
          <ClearableInput
            label="Productor*"
            name='producer'
            value={product.producer ?? ''}
            onChange={handleChange}
            onClear={handleClearProducer}
            required
          />
        </Col>
        <Col md={6}>
          <ClearableInput
            label="Rubro"
            name='category'
            value={product.category ?? ''}
            onChange={handleChange}
            onClear={handleClearCategory}
          />
        </Col>
        <Col md={12}>
          <ClearableInput
            label="Descripción*"
            name='description'
            value={product.description ?? ''}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md={4}>
          <ClearableInput
            label="Cantidad"
            name='quantity'
            type='number'
            value={product.quantity ?? 1}
            onChange={handleChange}
            min={1}
            required
          />
        </Col>
        <Col md={4}>
          <ClearableInput
            label="Código"
            name='code'
            value={product.code ?? ''}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <ClearableInput
            label="$ Venta"
            name='price'
            type='number'
            value={product.price ?? 0}
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
            {initialProduct ? 'Guardar' : 'Agregar'}
          </Button>
        </Col>
      </Row>
    </FormStyled>
  );
};

export default ProductForm;
