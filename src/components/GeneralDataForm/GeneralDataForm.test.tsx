import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GeneralDataForm from './GeneralDataForm';
import type { GeneralDataFormProps } from '../../interfaces/GeneralDataForm.interface';

describe("GeneralDataForm", () => {
    const mockData: GeneralDataFormProps['data'] = {
        generalData: {
            reason: '',
            personInCharge: '',
            departureDate: '',
            returnDate: '',
        }
    };

    const handleChange = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        render(<GeneralDataForm data={mockData} onChange={handleChange} />);
    });

    it("renderiza todos los inputs", () => {
        expect(screen.getByLabelText(/Motivo egreso/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Responsable/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Fecha salida/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Fecha regreso/i)).toBeInTheDocument();
    });

    it("llama a onChange al escribir en los inputs", () => {
        const reasonInput = screen.getByLabelText(/Motivo egreso/i);
        fireEvent.change(reasonInput, { target: { value: 'Venta' } });
        expect(handleChange).toHaveBeenCalledTimes(1);

        const personInput = screen.getByLabelText(/Responsable/i);
        fireEvent.change(personInput, { target: { value: 'Ismael' } });
        expect(handleChange).toHaveBeenCalledTimes(2);

        const departureInput = screen.getByLabelText(/Fecha salida/i);
        fireEvent.change(departureInput, { target: { value: '2025-09-05' } });
        expect(handleChange).toHaveBeenCalledTimes(3);

        const returnInput = screen.getByLabelText(/Fecha regreso/i);
        fireEvent.change(returnInput, { target: { value: '2025-09-10' } });
        expect(handleChange).toHaveBeenCalledTimes(4);
    });
});
