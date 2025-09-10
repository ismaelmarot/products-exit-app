import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GeneralDataInfo from './GeneralDataInfo';
import type { GeneraDataPros } from '../../interfaces/GeneralData.interface';

vi.mock('../../helpers/formatDate/formatDate', () => ({
    formatDate: (date: string | undefined) => (date ? `formatted-${date}` : '—'),
}));

describe('GeneralDataInfo', () => {
    const mockData: GeneraDataPros['generalData'] = {
        reason: 'Viaje de negocios',
        departureDate: '2025-09-10',
        personInCharge: 'Juan Pérez',
        returnDate: '2025-09-15',
    };

    it('muestra los datos generales correctamente con fechas formateadas', () => {
        render(<GeneralDataInfo generalData={mockData} />);

        expect(screen.getByText(/Información General/i)).toBeInTheDocument();

        expect(screen.getByText(/Motivo:/i)).toBeInTheDocument();
        expect(screen.getByText('Viaje de negocios')).toBeInTheDocument();

        expect(screen.getByText(/Salida:/i)).toBeInTheDocument();
        expect(screen.getByText('formatted-2025-09-10')).toBeInTheDocument();

        expect(screen.getByText(/Responsable:/i)).toBeInTheDocument();
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();

        expect(screen.getByText(/Regreso:/i)).toBeInTheDocument();
        expect(screen.getByText('formatted-2025-09-15')).toBeInTheDocument();
    });

    it('muestra fallback cuando alguna fecha es undefined', () => {
        const incompleteData = {
        reason: 'Mantenimiento',
        departureDate: undefined,
        personInCharge: 'Carlos',
        returnDate: undefined,
        };

        render(<GeneralDataInfo generalData={incompleteData} />);

        expect(screen.getByText('Mantenimiento')).toBeInTheDocument();
        expect(screen.getAllByText('—')).toHaveLength(2);
    });
});
