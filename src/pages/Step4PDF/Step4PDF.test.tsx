import { render, screen, fireEvent } from '@testing-library/react';
import Step4PDF from './Step4PDF';
import { AppContext } from '../../context/AppContext';
import type { ProductProps } from '../../interfaces/Product.interface';
import { vi } from 'vitest';

const mockContext = {
  generalData: { 
    generalData: {
      reason: 'Test',
      personInCharge: 'Juan',
      departureDate: '2025-09-11',
      returnDate: '2025-09-12'
    },
  },
  setGeneralData: vi.fn(),
  products: [
    { description: 'Producto 1', producer: 'Prod1', category: 'Rubro1', code: '001', quantity: 2, price: 100 },
    { description: 'Producto 2', producer: 'Prod2', category: 'Rubro2', code: '002', quantity: 1, price: 200 },
  ] as ProductProps[],
  setProducts: vi.fn(),
  order1: 'description',
  order2: '',
  order3: '',
  setOrder1: vi.fn(),
  setOrder2: vi.fn(),
  setOrder3: vi.fn(),
  sortType: 'asc' as 'asc' | 'desc',
  setSortType: vi.fn(),
};

describe('Step4PDF', () => {
  it('abre y cierra el modal de descarga JSON', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <Step4PDF onBack={vi.fn()} />
      </AppContext.Provider>
    );

    const jsonButton = screen.getByText('Descargar JSON');
    fireEvent.click(jsonButton);

    const label = screen.getByText('Nombre del archivo:');
    expect(label).toBeInTheDocument();

    const cancelarButton = screen.getByText('Cancelar');
    fireEvent.click(cancelarButton);

    const modal = label.closest('.modal');
    expect(modal).not.toHaveClass('show');
  });

  it('muestra los productos ordenados y total correctamente', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <Step4PDF onBack={vi.fn()} />
      </AppContext.Provider>
    );

    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();

    expect(screen.getByText('400,00')).toBeInTheDocument();
  });
});
