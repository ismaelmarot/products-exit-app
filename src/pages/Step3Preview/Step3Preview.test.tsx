import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Step3Preview from './Step3Preview';
import { AppContext } from '../../context/AppContext';
import type { AppContextProps } from '../../interfaces/AppContextProps.interface';

describe('Step3Preview', () => {
  const mockOnBack = vi.fn();
  const mockOnNext = vi.fn();

  const contextValue: AppContextProps = {
    generalData: {
      reason: 'Viaje de prueba',
      personInCharge: 'Carlos',
      departureDate: '2025-09-01',
      returnDate: '2025-09-10',
    },
    setGeneralData: vi.fn(),
    products: [
      { description: 'Manzanas', producer: 'Juan', category: 'Frutas', code: 'A1', quantity: 10, price: 100 },
      { description: 'Zanahorias', producer: 'Ana', category: 'Verduras', code: 'B2', quantity: 5, price: 50 },
    ],
    setProducts: vi.fn(),
  };

  beforeEach(() => {
    render(
      <AppContext.Provider value={contextValue}>
        <Step3Preview onBack={mockOnBack} onNext={mockOnNext} />
      </AppContext.Provider>
    );
  });

  it('renders title and general data', () => {
    expect(screen.getByText('Previsualización')).toBeInTheDocument();
    expect(screen.getByTestId('motivo')).toHaveTextContent('Viaje de prueba');
    expect(screen.getByTestId('responsable')).toHaveTextContent('Carlos');
    expect(screen.getByTestId('salida')).toHaveTextContent('2025-09-01');
    expect(screen.getByTestId('regreso')).toHaveTextContent('2025-09-10');
  });

  it('renders products in table', () => {
    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('Frutas')).toBeInTheDocument();
    expect(screen.getByText('Manzanas')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('Zanahorias')).toBeInTheDocument();
  });

  it('calls onBack and onNext when buttons are clicked', () => {
    fireEvent.click(screen.getByTestId('btn-back'));
    expect(mockOnBack).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('btn-next'));
    expect(mockOnNext).toHaveBeenCalled();
  });

  it('changes sorting order when selects are used', () => {
    const sortSelect = screen.getByTestId('sort-type');
    expect(sortSelect).toHaveValue('asc');
    fireEvent.change(sortSelect, { target: { value: 'desc' } });
    expect(sortSelect).toHaveValue('desc');
  });
});
