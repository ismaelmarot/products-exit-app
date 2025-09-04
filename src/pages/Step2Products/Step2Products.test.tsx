import { render, screen } from '@testing-library/react';
import Step2Productos from './Step2Products';

test('Render: Step2Products', () => {
    render(<Step2Productos />);
    expect(screen.getByText("Pestaña 2 - Productos")).toBeInTheDocument();
});
