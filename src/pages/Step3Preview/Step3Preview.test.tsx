import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it } from 'vitest';
import Step3Preview from './Step3Preview';
import { AppContext } from '../../context/AppContext';
import { useState } from 'react';
import type { Step1GeneralDataProps } from '../../interfaces/Step1GeneralData.interface';
import type { ProductProps } from '../../interfaces/Product.interface';

const mockGeneralData: Step1GeneralDataProps = {
  generalData: {
    reason: 'Prueba motivo',
    personInCharge: 'Juan',
    departureDate: '2025-09-06',
    returnDate: '2025-09-08',
  }
};

const mockProducts: ProductProps[] = [
  { description: 'Desc A', producer: 'Prod A', category: 'Cat A', code: '001', quantity: 1, price: 100 },
  { description: 'Desc B', producer: 'Prod B', category: 'Cat B', code: '002', quantity: 2, price: 200 },
];

const Step3PreviewWithState = () => {
  const [order1, setOrder1] = useState('');
  const [order2, setOrder2] = useState('');
  const [order3, setOrder3] = useState('');
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

  return (
    <AppContext.Provider
      value={{
        generalData: mockGeneralData,
        products: mockProducts,
        setGeneralData: () => {},
        setProducts: () => {},
        order1,
        setOrder1,
        order2,
        setOrder2,
        order3,
        setOrder3,
        sortType,
        setSortType,
      }}
    >
      <Step3Preview onBack={() => {}} onNext={() => {}} />
    </AppContext.Provider>
  );
};

describe('Step3Preview', () => {
  it('allows you to sort products by producer ascending/descending', () => {
    render(<Step3PreviewWithState />);

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
