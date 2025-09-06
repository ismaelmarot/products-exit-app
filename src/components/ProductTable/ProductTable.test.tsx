import { describe, it, expect, beforeEach, vi } from 'vitest'; 
import { render, screen, fireEvent } from '@testing-library/react';
import ProductTable from './ProductTable';

const mockProducts = [
    { description: 'Producto 1', quantity: 5, code: 'A01', price: 100 },
    { description: 'Producto 2', quantity: 10, code: 'B02', price: 200 },
];

describe('ProductTable', () => {
    let onEdit: ReturnType<typeof vi.fn>;
    let onDelete: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        onEdit = vi.fn();
        onDelete = vi.fn();

        render(
            <ProductTable
                products={mockProducts}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );
    });

    it('renders all products', () => {
        mockProducts.forEach((p) => {
            expect(screen.getByText(p.description)).toBeInTheDocument();
            expect(screen.getByText(p.quantity.toString())).toBeInTheDocument();
            expect(screen.getByText(p.code)).toBeInTheDocument();
            expect(screen.getByText(p.price.toString())).toBeInTheDocument();
        });
    });

    it('calls onEdit when Editar button is clicked', () => {
        const editButtons = screen.getAllByText('Editar');
        fireEvent.click(editButtons[0]);
        expect(onEdit).toHaveBeenCalledWith(0);
    });

    it('calls onDelete when Eliminar button is clicked', () => {
        const deleteButtons = screen.getAllByText('Eliminar');
        fireEvent.click(deleteButtons[1]);
        expect(onDelete).toHaveBeenCalledWith(1);
    });

    it('has correct text alignment classes', () => {
        expect(screen.getByText('Cant')).toHaveClass('text-end');
        expect(screen.getByText('Código')).toHaveClass('text-end');
        expect(screen.getByText('$ Venta')).toHaveClass('text-end');
        expect(screen.getByText('Acciones')).toHaveClass('text-center');
    });
});
