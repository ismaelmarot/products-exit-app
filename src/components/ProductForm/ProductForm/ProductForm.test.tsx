import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import ProductForm from './ProductForm';
import type { ProductProps } from '../../../interfaces/Product.interface';

const mockProducts: ProductProps[] = [
  { description: 'Producto 1', quantity: 5, code: 'A01', price: 100, producer: 'ACME', category: 'Rubro1', paymentMethod: '' },
];

describe('ProductForm', () => {
  let onAdd: ReturnType<typeof vi.fn>;
  let setPersistentProducer: ReturnType<typeof vi.fn>;
  let setPersistentCategory: ReturnType<typeof vi.fn>;
  let setPersistentDescription: ReturnType<typeof vi.fn>;
  let setPersistentPrice: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onAdd = vi.fn();
    setPersistentProducer = vi.fn();
    setPersistentCategory = vi.fn();
    setPersistentDescription = vi.fn();
    setPersistentPrice = vi.fn();

    render(
      <ProductForm
        onAdd={onAdd}
        products={mockProducts}
        persistentProducer="ACME"
        setPersistentProducer={setPersistentProducer}
        persistentCategory="Rubro1"
        setPersistentCategory={setPersistentCategory}
        persistentDescription="Reset Test"
        setPersistentDescription={setPersistentDescription}
        persistentPrice={99}
        setPersistentPrice={setPersistentPrice}
      />
    );
  });

  it('renders all inputs and submit button', () => {
    expect(screen.getByLabelText(/Productor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rubro/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cantidad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Código/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/\$ Venta/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agregar/i })).toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    const producerInput = screen.getByLabelText(/Productor/i) as HTMLInputElement;
    fireEvent.change(producerInput, { target: { value: 'Nuevo Productor' } });
    expect(producerInput.value).toBe('Nuevo Productor');

    const quantityInput = screen.getByLabelText(/Cantidad/i) as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: '3' } });
    expect(quantityInput.value).toBe('3');
  });

  it('calls onAdd with correct product data on submit', () => {
    const submitButton = screen.getByRole('button', { name: /Agregar/i });
    fireEvent.click(submitButton);
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({
      producer: 'ACME',
      category: 'Rubro1',
      description: 'Reset Test',
      quantity: 1,
      code: '',
      price: 99,
    }));
  });

  it('resets the form after submit', async () => {
    const submitButton = screen.getByRole('button', { name: /Agregar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/Productor/i)).toHaveValue('');
      expect(screen.getByLabelText(/Rubro/i)).toHaveValue('');
      expect(screen.getByLabelText(/Descripción/i)).toHaveValue('');
      expect(screen.getByLabelText(/Cantidad/i)).toHaveValue(1);
      expect(screen.getByLabelText(/Código/i)).toHaveValue('');
      expect(screen.getByLabelText(/\$ Venta/i)).toHaveValue(0);
    });

    expect(setPersistentProducer).toHaveBeenCalledWith('');
    expect(setPersistentCategory).toHaveBeenCalledWith('');
    expect(setPersistentDescription).toHaveBeenCalledWith('');
    expect(setPersistentPrice).toHaveBeenCalledWith(0);
  });
});
