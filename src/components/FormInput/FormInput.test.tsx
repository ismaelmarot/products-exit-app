import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormInput from './FormInput';

describe('FormInput', () => {
    const handleChange = vi.fn();

    it("renderiza correctamente el input con label", () => {
        render(
        <FormInput
            label="Nombre"
            name='name'
            value=''
            onChange={handleChange}
            placeholder="Ingrese nombre"
        />
        );

        const input = screen.getByLabelText(/Nombre/i);
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', "Ingrese nombre");
    });

    it("llama a onChange al modificar el valor", () => {
        render(
        <FormInput
            label="Nombre"
            name='name'
            value=''
            onChange={handleChange}
        />
        );

        const input = screen.getByLabelText(/Nombre/i);
        fireEvent.change(input, { target: { value: "Ismael" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
