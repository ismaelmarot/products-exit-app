import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Step2Productos from './Step2Products';

test('Render: Step2Productos', () => {
    const mockNext = vi.fn();
    const mockBack = vi.fn();

    render(<Step2Productos initialProducts={[]} onNext={mockNext} onBack={mockBack} />);

    expect(screen.getByText('Productos')).toBeInTheDocument();
});
