import { useState, useEffect, type ChangeEvent } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import type { ProductProps } from '../../../interfaces/Product.interface';
import ProductInput from '../ProductInput/ProductInput';
import { FormStyled } from './ProductForm.styled';
import type { ProductFormProps } from '../../../interfaces/ProductForm';
import { MdClear } from 'react-icons/md';

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
    price: '',
    producer: persistentProducer || '',
    category: persistentCategory || '',
    paymentMethod: '',
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct({
        ...initialProduct,
        price: initialProduct.price ?? '',
      });
    } else {
      setProduct({
        ...product,
        producer: persistentProducer || '',
        category: persistentCategory || '',
      });
    }
  }, [initialProduct, persistentProducer, persistentCategory]);

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;

    let newValue: string | number = value;

    if (name === 'quantity' || name === 'price') {
      newValue = value === '' ? '' : Number(value);
    }
    if (name === 'code') {
      newValue = value.toUpperCase();
    }

    setProduct({ ...product, [name]: newValue });

    if (name === 'producer' && setPersistentProducer) setPersistentProducer(value);
    if (name === 'category' && setPersistentCategory) setPersistentCategory(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...product,
      quantity: Number(product.quantity),
      price: product.price === '' ? 0 : Number(product.price),
    });

    if (!initialProduct) {
      setProduct({
        ...product,
        description: '',
        quantity: 1,
        code: '',
        price: '',
      });
    }
  };

  const handleClearProducer = () => {
    if (setPersistentProducer) setPersistentProducer('');
    setProduct({ ...product, producer: '' });
  };

  const handleClearCategory = () => {
    if (setPersistentCategory) setPersistentCategory('');
    setProduct({ ...product, category: '' });
  };

  return (
    <FormStyled onSubmit={handleSubmit} className='mb-3'>
      <Row className='mb-2'>
        <Col md={6} className='position-relative'>
          <ProductInput
            label="Productor*"
            name='producer'
            value={product.producer}
            onChange={handleChange}
            required
          />
          {product.producer && (
            <MdClear
              style={{
                position: 'absolute',
                right: '1.2rem',
                top: '2.5rem',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: 'rgb(108,117,125)',
              }}
              onClick={handleClearProducer}
            />
          )}
        </Col>
        <Col md={6} className='position-relative'>
          <ProductInput
            label="Rubro"
            name='category'
            value={product.category}
            onChange={handleChange}
          />
          {product.category && (
            <MdClear
              style={{
                position: 'absolute',
                right: '1.2rem',
                top: '2.5rem',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: 'rgb(108,117,125)',
              }}
              onClick={handleClearCategory}
            />
          )}
        </Col>
        <Col md={12}>
          <ProductInput
            label="Descripción*"
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
            required
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
            {initialProduct ? 'Guardar' : 'Agregar'}
          </Button>
        </Col>
      </Row>
    </FormStyled>
  );
};

export default ProductForm;
