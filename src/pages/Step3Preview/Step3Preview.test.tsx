import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Step3Preview from './Step3Preview';
import { AppContext } from '../../context/AppContext';

const mockGeneralData = {
  reason: 'Prueba motivo',
  personInCharge: 'Juan',
  departureDate: '2025-09-06',
  returnDate: '2025-09-08',
};

const mockProducts = [
  { description: 'Desc A', producer: 'Prod A', category: 'Cat A', code: '001', quantity: 1, price: 100 },
  { description: 'Desc B', producer: 'Prod B', category: 'Cat B', code: '002', quantity: 2, price: 200 },
];

const renderComponent = () => {
  const onBack = vi.fn();
  const onNext = vi.fn();

  render(
    <AppContext.Provider
      value={{
        generalData: mockGeneralData,
        products: mockProducts,
        setGeneralData: vi.fn(),
        setProducts: vi.fn(),
        }}>
      <Step3Preview onBack={onBack} onNext={onNext} />
    </AppContext.Provider>
  );

  return { onBack, onNext };
};

describe('Step3Preview', () => {
  it('render general data in format dd/mm/yyyy', () => {
    renderComponent();
    expect(screen.getByTestId('motivo')).toHaveTextContent('Prueba motivo');
    expect(screen.getByTestId('responsable')).toHaveTextContent('Juan');
    expect(screen.getByTestId('salida')).toHaveTextContent('06/09/2025');
    expect(screen.getByTestId('regreso')).toHaveTextContent('08/09/2025');
  });

  it('render Products in list', () => {
    renderComponent();
    const rows = screen.getAllByTestId('product-row');
    expect(rows).toHaveLength(2);
    expect(screen.getAllByTestId('product-producer')[0]).toHaveTextContent('Prod A');
    expect(screen.getAllByTestId('product-producer')[1]).toHaveTextContent('Prod B');
  });

  it('execute callbacks when press buttons', () => {
    const { onBack, onNext } = renderComponent();
    fireEvent.click(screen.getByTestId('btn-back'));
    fireEvent.click(screen.getByTestId('btn-next'));
    expect(onBack).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });

  it('allows you to sort products by producer ascending/descending', () => {
    renderComponent();

    const orderSelect = screen.getByTestId('order-select-0');
    const sortSelect = screen.getByTestId('sort-type');

    fireEvent.change(orderSelect, { target: { value: 'producer' } });
    fireEvent.change(sortSelect, { target: { value: 'asc' } });

    let producers = screen.getAllByTestId('product-producer');
    expect(producers[0]).toHaveTextContent('Prod A');
    expect(producers[1]).toHaveTextContent('Prod B');

    fireEvent.change(sortSelect, { target: { value: 'desc' } });
    producers = screen.getAllByTestId('product-producer');
    expect(producers[0]).toHaveTextContent('Prod B');
    expect(producers[1]).toHaveTextContent('Prod A');
  });
});
