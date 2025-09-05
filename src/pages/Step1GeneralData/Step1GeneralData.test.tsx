import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Step1GeneralData from './Step1GeneralData';
import { AppContext } from '../../context/AppContext';
import type { AppContextProps } from '../../interfaces/AppContextProps.interface';

describe('Step1GeneralData', () => {
  const mockOnNext = vi.fn();
  const mockSetGeneralData = vi.fn();

  const contextValue: AppContextProps = {
    generalData: { reason: '', personInCharge: '', departureDate: '', returnDate: '' },
    setGeneralData: mockSetGeneralData,
    products: [],
    setProducts: vi.fn(),
  };

  beforeEach(() => {
    render(
      <AppContext.Provider value={contextValue}>
        <Step1GeneralData onNext={mockOnNext} />
      </AppContext.Provider>
    );
  });

  it('renders the title', () => {
    expect(screen.getByText('Datos Generales')).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    const reasonInput = screen.getByLabelText(/Motivo/i);
    const personInput = screen.getByLabelText(/Responsable/i);

    fireEvent.change(reasonInput, { target: { value: 'Viaje de prueba' } });
    fireEvent.change(personInput, { target: { value: 'Carlos' } });

    expect(reasonInput).toHaveValue('Viaje de prueba');
    expect(personInput).toHaveValue('Carlos');
  });

  it('calls setGeneralData and onNext when clicking Siguiente', () => {
    const reasonInput = screen.getByLabelText(/Motivo/i);
    const personInput = screen.getByLabelText(/Responsable/i);

    fireEvent.change(reasonInput, { target: { value: 'Viaje de prueba' } });
    fireEvent.change(personInput, { target: { value: 'Carlos' } });

    const nextButton = screen.getByText('Siguiente');
    fireEvent.click(nextButton);

    expect(mockSetGeneralData).toHaveBeenCalledWith({
      reason: 'Viaje de prueba',
      personInCharge: 'Carlos',
      departureDate: '',
      returnDate: '',
    });
    expect(mockOnNext).toHaveBeenCalled();
  });
});
