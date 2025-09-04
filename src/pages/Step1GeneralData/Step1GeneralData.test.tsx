import { render, screen, fireEvent } from '@testing-library/react';
import Step1GeneralData from './Step1GeneralData';
import { describe, it, expect } from 'vitest';

describe('Step1GeneralData', () => {
    it('renderiza todos los campos correctamente', () => {
        render(<Step1GeneralData />);

        expect(screen.getByLabelText(/Motivo del egreso/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Responsable/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Fecha de salida/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Fin/i)).toBeInTheDocument();
    });

    it('permite ingresar valores en los campos', () => {
        render(<Step1GeneralData />);

        const reasonInput = screen.getByLabelText(/Motivo del egreso/i);
        fireEvent.change(reasonInput, { target: { value: 'Venta' } });
        expect((reasonInput as HTMLInputElement).value).toBe('Venta');

        const personInput = screen.getByLabelText(/Responsable/i);
        fireEvent.change(personInput, { target: { value: 'Ismael' } });
        expect((personInput as HTMLInputElement).value).toBe('Ismael');

        const departureInput = screen.getByLabelText(/Fecha de salida/i);
        fireEvent.change(departureInput, { target: { value: '2025-09-04' } });
        expect((departureInput as HTMLInputElement).value).toBe('2025-09-04');

        const returnInput = screen.getByLabelText(/Fin/i);
        fireEvent.change(returnInput, { target: { value: '2025-09-10' } });
        expect((returnInput as HTMLInputElement).value).toBe('2025-09-10');
    });
});
