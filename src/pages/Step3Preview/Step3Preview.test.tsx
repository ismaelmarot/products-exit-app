import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Step3Preview from './Step3Preview';
import { AppContext } from '../../context/AppContext';
import type { ProductProps } from '../../interfaces/Product.interface';

const mockGeneralData = {
  reason: 'Prueba motivo',
  personInCharge: 'Juan',
  departureDate: '2025-09-06',
  returnDate: '2025-09-08',
};

const mockProducts: ProductProps[] = [
  { producer: 'Prod A', category: 'Cat A', code: '001', description: 'Desc A', quantity: 1, price: 100 },
  { producer: 'Prod B', category: 'Cat B', code: '002', description: 'Desc B', quantity: 2, price: 200 },
];

const renderWithContext = (onBack = vi.fn(), onNext = vi.fn()) =>
  render(
    <AppContext.Provider
      value={{
        generalData: mockGeneralData,
        products: mockProducts,
        setGeneralData: vi.fn(),
        setProducts: vi.fn(),
      }}
    >
      <Step3Preview onBack={onBack} onNext={onNext} />
    </AppContext.Provider>
  );

describe('Step3Preview', () => {
  it('render general data in format dd/mm/yyyy', () => {
    renderWithContext();
    expect(screen.getByTestId('salida')).toHaveTextContent('06/09/2025');
    expect(screen.getByTestId('regreso')).toHaveTextContent('08/09/2025');
    expect(screen.getByTestId('motivo')).toHaveTextContent('Prueba motivo');
    expect(screen.getByTestId('responsable')).toHaveTextContent('Juan');
  });

  it('render Products in table', () => {
    renderWithContext();
    expect(screen.getByText('Prod A')).toBeInTheDocument();
    expect(screen.getByText('Prod B')).toBeInTheDocument();
    expect(screen.getByText('Desc A')).toBeInTheDocument();
    expect(screen.getByText('Desc B')).toBeInTheDocument();
  });

  it('execute callbacks when press buttons', () => {
    const onBack = vi.fn();
    const onNext = vi.fn();
    renderWithContext(onBack, onNext);

    fireEvent.click(screen.getByTestId('btn-back'));
    fireEvent.click(screen.getByTestId('btn-next'));

    expect(onBack).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });

  it('allows you to sort products by producer ascending/descending', () => {
    renderWithContext();

    const orderSelect = screen.getByTestId('order-select-0');
    fireEvent.change(orderSelect, { target: { value: 'producer' } });

    const sortTypeSelect = screen.getByTestId('sort-type');
    fireEvent.change(sortTypeSelect, { target: { value: 'desc' } });

    const firstRow = screen.getAllByRole('row')[1];
    expect(firstRow).toHaveTextContent('Prod B');
  });
});
