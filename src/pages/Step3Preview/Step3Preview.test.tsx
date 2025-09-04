import { render, screen } from '@testing-library/react';
import Step3Preview from './Step3Preview';

test('Render: Step3Previsualizacion', () => {
    render(<Step3Preview />);
    expect(screen.getByText("Pestaña 3 - Previsualización")).toBeInTheDocument();
});
