import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Step2Productos from './Step2Products';
import { AppProvider } from '../../context/AppContext';

test('Render: Step2Productos', () => {
    const mockNext = vi.fn();
    const mockBack = vi.fn();

    render(
        <AppProvider> 
            <Step2Productos initialProducts={[]} onNext={mockNext} onBack={mockBack} />
        </AppProvider>
    );

    expect(screen.getByText('Productos')).toBeInTheDocument();
});
