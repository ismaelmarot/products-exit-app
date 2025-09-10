import { useState, useEffect, type ChangeEvent } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import type { ProductProps } from '../../../interfaces/Product.interface';
import type { ProductFormProps } from '../../../interfaces/ProductForm.interface';
import { FormStyled } from './ProductForm.styled';
import ClearableInput from '../../ClearableInput/ClearableInput';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';

const ProductForm = ({
  onAdd,
  initialProduct,
  products,
  persistentProducer,
  setPersistentProducer,
  persistentCategory,
  setPersistentCategory,
  persistentDescription,
  setPersistentDescription,
  persistentPrice,
  setPersistentPrice,
}: ProductFormProps) => {
  const [product, setProduct] = useState<ProductProps>({
    description: persistentDescription || '',
    quantity: 1,
    code: '',
    price: persistentPrice ?? 0,
    producer: persistentProducer || '',
    category: persistentCategory || '',
    paymentMethod: '',
  });

  const [showConfirm, setShowConfirm] = useState(false);

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
        description: persistentDescription || '',
        price: persistentPrice ?? 0,
      }));
    }
  }, [
    initialProduct,
    persistentProducer,
    persistentCategory,
    persistentDescription,
    persistentPrice,
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (name === 'quantity' || name === 'price') newValue = value === '' ? 0 : Number(value);
    if (name === 'code') newValue = value.toUpperCase();

    setProduct((prev) => ({ ...prev, [name]: newValue }));

    if (name === 'producer' && setPersistentProducer) setPersistentProducer(value);
    if (name === 'category' && setPersistentCategory) setPersistentCategory(value);
    if (name === 'description' && setPersistentDescription) setPersistentDescription(value);
    if (name === 'price' && setPersistentPrice) setPersistentPrice(Number(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.code || product.code.trim() === '') {
      addProduct();
      return;
    }

    const exists = products.some(
      (p) =>
        (p.code ?? '').toUpperCase() === (product.code ?? '').toUpperCase() &&
        (!initialProduct || (initialProduct.code ?? '').toUpperCase() !== (p.code ?? '').toUpperCase())
    );

    if (exists) {
      setShowConfirm(true);
      return;
    }

    addProduct();
  };

  const addProduct = () => {
    onAdd({
      ...product,
      quantity: Number(product.quantity),
      price: Number(product.price),
    });

    if (!initialProduct) {
      setProduct({
        description: '',
        quantity: 1,
        code: '',
        price: 0,
        producer: '',
        category: '',
        paymentMethod: '',
      });

      if (setPersistentProducer) setPersistentProducer('');
      if (setPersistentCategory) setPersistentCategory('');
      if (setPersistentDescription) setPersistentDescription('');
      if (setPersistentPrice) setPersistentPrice(0);
    }

    setShowConfirm(false);
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  const handleClearProducer = () => {
    if (setPersistentProducer) setPersistentProducer('');
    setProduct((prev) => ({ ...prev, producer: '' }));
  };

  const handleClearCategory = () => {
    if (setPersistentCategory) setPersistentCategory('');
    setProduct((prev) => ({ ...prev, category: '' }));
  };

  const handleClearDescription = () => {
    if (setPersistentDescription) setPersistentDescription('');
    setProduct((prev) => ({ ...prev, description: '' }));
  };

  const handleClearPrice = () => {
    if (setPersistentPrice) setPersistentPrice(0);
    setProduct((prev) => ({ ...prev, price: 0 }));
  };

  return (
    <>
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
              onClear={handleClearDescription}
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
              onClear={handleClearPrice}
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

      <ConfirmModal
        show={showConfirm}
        title="Confirmación"
        message={`El código "${product.code}" ya existe. ¿Desea agregarlo igualmente?`}
        onButton1={addProduct}
        onButton2={handleCancelConfirm}
        textButton1="Agregar"
        textButton2="Cancelar"
      />
    </>
  );
};

export default ProductForm;
