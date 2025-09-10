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
            onButton1={() => {}}
            onButton2={() => {}}
        />
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        expect(screen.getByText('Aceptar')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('calls onButton1 when Aceptar button is clicked', () => {
        const onButton1 = vi.fn();
        const onButton2 = vi.fn();

        render(
        <ConfirmModal
            show={true}
            message='Confirm delete?'
            onButton1={onButton1}
            onButton2={onButton2}
            textButton1='Aceptar'
            textButton2='Cancel'
        />
        );

        fireEvent.click(screen.getByText('Aceptar'));
        expect(onButton1).toHaveBeenCalledTimes(1);
    });

    it('calls onButton2 when Cancel button is clicked', () => {
        const onButton1 = vi.fn();
        const onButton2 = vi.fn();

        render(
        <ConfirmModal
            show={true}
            message='Confirm delete?'
            onButton1={onButton1}
            onButton2={onButton2}
            textButton1='Aceptar'
            textButton2='Cancel'
        />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(onButton2).toHaveBeenCalledTimes(1);
    });

    it('does not render when show is false', () => {
        render(
        <ConfirmModal
            show={false}
            message='Hidden'
            onButton1={() => {}}
            onButton2={() => {}}
        />
        );

        expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });
});
