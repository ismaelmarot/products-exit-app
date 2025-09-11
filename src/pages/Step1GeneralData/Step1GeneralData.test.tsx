// import { render, screen, fireEvent } from '@testing-library/react';
// import { vi, beforeEach } from 'vitest';
// import Step1GeneralData from './Step1GeneralData';
// import { AppContext } from '../../context/AppContext';
// import type { AppContextProps } from '../../interfaces/AppContext.interface';

// describe('Step1GeneralData', () => {
//     const mockOnNext = vi.fn();
//     const mockSetGeneralData = vi.fn();

//     // Contexto corregido: generalData anidado
//     const contextValue: AppContextProps = {
//         generalData: {
//             generalData: {
//                 reason: '',
//                 personInCharge: '',
//                 departureDate: '',
//                 returnDate: '',
//             },
//         },
//         setGeneralData: mockSetGeneralData,
//         products: [],
//         setProducts: vi.fn(),
//     };

//     beforeEach(() => {
//         vi.clearAllMocks(); // limpia los mocks antes de cada test
//         render(
//             <AppContext.Provider value={contextValue}>
//                 <Step1GeneralData onNext={mockOnNext} />
//             </AppContext.Provider>
//         );
//     });

//     it('renders the title', () => {
//         expect(screen.getByText('Datos Generales')).toBeInTheDocument();
//     });

//     it('updates input values on change', () => {
//         const reasonInput = screen.getByLabelText(/Motivo/i);
//         const personInput = screen.getByLabelText(/Responsable/i);

//         fireEvent.change(reasonInput, { target: { value: 'Viaje de prueba' } });
//         fireEvent.change(personInput, { target: { value: 'Carlos' } });

//         expect(reasonInput).toHaveValue('Viaje de prueba');
//         expect(personInput).toHaveValue('Carlos');
//     });

//     it('calls setGeneralData and onNext when clicking Siguiente', () => {
//         const reasonInput = screen.getByLabelText(/Motivo/i);
//         const personInput = screen.getByLabelText(/Responsable/i);

//         fireEvent.change(reasonInput, { target: { value: 'Viaje de prueba' } });
//         fireEvent.change(personInput, { target: { value: 'Carlos' } });

//         const nextButton = screen.getByText('Siguiente');
//         fireEvent.click(nextButton);

//         // Comprobación ajustada al objeto anidado
//         expect(mockSetGeneralData).toHaveBeenCalledWith({
//             generalData: {
//                 reason: 'Viaje de prueba',
//                 personInCharge: 'Carlos',
//                 departureDate: '',
//                 returnDate: '',
//             },
//         });
//         expect(mockOnNext).toHaveBeenCalled();
//     });
// });


import { render, screen, fireEvent } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';
import Step1GeneralData from './Step1GeneralData';
import { AppContext } from '../../context/AppContext';
import type { AppContextProps } from '../../interfaces/AppContext.interface';

describe('Step1GeneralData', () => {
    const mockOnNext = vi.fn();
    const mockSetGeneralData = vi.fn();

    const contextValue: AppContextProps = {
        generalData: {
            generalData: {
                reason: '',
                personInCharge: '',
                departureDate: '',
                returnDate: '',
            },
        },
        setGeneralData: mockSetGeneralData,
        products: [],
        setProducts: vi.fn(),
        order1: '',
        setOrder1: vi.fn(),
        order2: '',
        setOrder2: vi.fn(),
        order3: '',
        setOrder3: vi.fn(),
        sortType: 'asc',
        setSortType: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
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

        // Ajustado a la estructura de tu estado
        expect(mockSetGeneralData).toHaveBeenCalledWith({
            generalData: {
                reason: 'Viaje de prueba',
                personInCharge: 'Carlos',
                departureDate: '',
                returnDate: '',
            },
        });
        expect(mockOnNext).toHaveBeenCalled();
    });
});
