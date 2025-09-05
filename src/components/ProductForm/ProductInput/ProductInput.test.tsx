import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import ProductInput from './ProductInput';

describe('ProductInput', () => {
    const mockOnChange = vi.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it('renders label and input correctly', () => {
        render(
        <ProductInput
            label="Código"
            name='code'
            value=''
            onChange={mockOnChange}
        />
        );

        expect(screen.getByLabelText(/Código/i)).toBeInTheDocument();
    });

    it('applies type, min, step and placeholder props', () => {
        render(
        <ProductInput
            label="Precio"
            name='price'
            type='number'
            value=''
            onChange={mockOnChange}
            min={0}
            step={0.01}
            placeholder="Ingresa precio"
        />
        );

        const input = screen.getByLabelText(/Precio/i);
        expect(input).toHaveAttribute('type', 'number');
        expect(input).toHaveAttribute('min', '0');
        expect(input).toHaveAttribute('step', '0.01');
        expect(input).toHaveAttribute('placeholder', 'Ingresa precio');
    });

    it('calls onChange when typing', () => {
        const Wrapper = () => {
        const [value, setValue] = useState('');
        return (
            <ProductInput
            label="Código"
            name='code'
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
                mockOnChange(e);
            }}
            />
        );
        };

        render(<Wrapper />);

        const input = screen.getByLabelText(/Código/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'XYZ123' } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('XYZ123');
    });
});
