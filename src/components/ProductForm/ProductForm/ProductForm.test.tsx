import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProductForm from './ProductForm';

describe('ProductForm', () => {
    const mockOnAdd = vi.fn();

    beforeEach(() => {
        mockOnAdd.mockClear();
    });

    it('renders all inputs and submit button', () => {
        render(<ProductForm onAdd={mockOnAdd} />);
        expect(screen.getByLabelText(/Productor/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Rubro/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Cantidad/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Código/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/\$ Venta/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Agregar/i })).toBeInTheDocument();
    });

    it('updates input values when typing', () => {
        render(<ProductForm onAdd={mockOnAdd} />);
        const descriptionInput = screen.getByLabelText(/Descripción/i);
        fireEvent.change(descriptionInput, { target: { value: 'Producto Test' } });
        expect(descriptionInput).toHaveValue('Producto Test');
    });

    it('calls onAdd with correct product data on submit', () => {
        render(<ProductForm onAdd={mockOnAdd} />);
        fireEvent.change(screen.getByLabelText(/Productor/i), { target: { value: 'ACME' } });
        fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Nuevo Producto' } });
        fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: 3 } });
        fireEvent.change(screen.getByLabelText(/Código/i), { target: { value: 'abc' } });
        fireEvent.change(screen.getByLabelText(/\$ Venta/i), { target: { value: 99 } });

        fireEvent.submit(screen.getByRole('button', { name: /Agregar/i }));

        expect(mockOnAdd).toHaveBeenCalledWith({
            description: 'Nuevo Producto',
            quantity: 3,
            code: 'ABC',
            price: 99,
            producer: 'ACME',
            category: '',
            paymentMethod: '',
        });
    });

    it('resets the form after submit', async () => {
        render(<ProductForm onAdd={mockOnAdd} />);

        fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Reset Test' } });
        fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: 3 } });
        fireEvent.change(screen.getByLabelText(/Código/i), { target: { value: 'XYZ' } });
        fireEvent.change(screen.getByLabelText(/\$ Venta/i), { target: { value: 99 } });

        fireEvent.submit(screen.getByRole('button', { name: /Agregar/i }));

        await waitFor(() => {
            expect(screen.getByLabelText(/Descripción/i)).toHaveValue('');
            expect(screen.getByLabelText(/Cantidad/i)).toHaveValue(1);
            expect(screen.getByLabelText(/Código/i)).toHaveValue('');
            expect(screen.getByLabelText(/\$ Venta/i)).toHaveValue(null);
        });
    });
});
