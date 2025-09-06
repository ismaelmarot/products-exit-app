import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from './ConfirmModal';
import { describe, it, vi, expect } from 'vitest';

describe('ConfirmModal', () => {
    it('renders the title and message', () => {
        render(
            <ConfirmModal
                show={true}
                title='Test Title'
                message='Are you sure?'
                onConfirm={() => {}}
                onCancel={() => {}}
            />
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    it('calls onConfirm when Eliminar button is clicked', () => {
        const onConfirm = vi.fn();
        const onCancel = vi.fn();

        render(
            <ConfirmModal
                show={true}
                message='Confirm delete?'
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        );

        fireEvent.click(screen.getByText('Eliminar'));
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when Cancelar button is clicked', () => {
        const onConfirm = vi.fn();
        const onCancel = vi.fn();

        render(
            <ConfirmModal
                show={true}
                message='Confirm delete?'
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        );

        fireEvent.click(screen.getByText('Cancelar'));
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('does not render when show is false', () => {
        render(
            <ConfirmModal
                show={false}
                message='Hidden'
                onConfirm={() => {}}
                onCancel={() => {}}
            />
        );

        expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });
});
