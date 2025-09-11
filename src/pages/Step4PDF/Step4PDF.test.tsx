/// <reference types='vitest' />

import { render, screen, fireEvent } from '@testing-library/react';
import Step4PDF from './Step4PDF';
import { AppContext } from '../../context/AppContext';
import sortProducts from '../../helpers/sortProducts/sortProducts';
import exportPDF from '../../helpers/exportPDF/exportPDF';
import { vi, type Mock } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import type { AppContextProps } from '../../interfaces/AppContext.interface';

vi.mock('../../helpers/sortProducts/sortProducts');
vi.mock('../../helpers/exportPDF/exportPDF');

const products = [
  {
    description: 'Producto 1',
    producer: 'ACME',
    category: 'Rubro1',
    code: 'P1',
    quantity: 2,
    price: 50,
  },
];

const generalData = {
  reason: 'Motivo',
  personInCharge: 'Juan',
  departureDate: '2025-09-10',
  returnDate: '2025-09-12',
};

const setGeneralData = vi.fn();
const setProducts = vi.fn();
const setOrder1 = vi.fn();
const setOrder2 = vi.fn();
const setOrder3 = vi.fn();
const setSortType = vi.fn();

const mockOnBack = vi.fn();

const renderComponent = () =>
  render(
    <AppContext.Provider
      value={{
        generalData,
        products,
        order1: '',
        order2: '',
        order3: '',
        sortType: 'asc',
        setGeneralData,
        setProducts,
        setOrder1,
        setOrder2,
        setOrder3,
        setSortType,
      } as AppContextProps}
    >
      <BrowserRouter>
        <Step4PDF onBack={mockOnBack} />
      </BrowserRouter>
    </AppContext.Provider>
  );

describe('Step4PDF', () => {
  beforeEach(() => {
    (sortProducts as unknown as Mock).mockReturnValue(products);
    (exportPDF as unknown as Mock).mockReturnValue(undefined);

    setGeneralData.mockClear();
    setProducts.mockClear();
    mockOnBack.mockClear();

    global.URL.createObjectURL = vi.fn(() => 'blob:url');
    global.URL.revokeObjectURL = vi.fn();
  });

  it('renders general data and product table', () => {
    renderComponent();
    expect(screen.getByText(/Resumen Final \/ Exportar/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto 1/i)).toBeInTheDocument();
  });

  it('calls exportPDF when "Descargar PDF" button is clicked', () => {
    renderComponent();
    const button = screen.getByText(/Descargar PDF/i);
    fireEvent.click(button);
    expect(exportPDF).toHaveBeenCalledWith(generalData, products, 100);
  });

  it('downloads JSON when "Descargar JSON" button is clicked', () => {
    renderComponent();

    const clickMock = vi.fn();
    const originalCreateElement = document.createElement;
    document.createElement = () => ({ href: '', download: '', click: clickMock } as any);

    const button = screen.getByText(/Descargar JSON/i);
    fireEvent.click(button);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();

    document.createElement = originalCreateElement;
  });

  it('calls onBack and resets data when "Reiniciar" button is clicked', () => {
    renderComponent();
    const button = screen.getByText(/Reiniciar/i);
    fireEvent.click(button);

    expect(setGeneralData).toHaveBeenCalledWith({
      reason: '',
      personInCharge: '',
      departureDate: '',
      returnDate: '',
    });
    expect(setProducts).toHaveBeenCalledWith([]);
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('calls onBack when "Volver a productos" button is clicked', () => {
    renderComponent();
    const button = screen.getByText(/Volver a productos/i);
    fireEvent.click(button);
    expect(mockOnBack).toHaveBeenCalled();
  });
});
