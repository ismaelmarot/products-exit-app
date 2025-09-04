import { render, screen } from '@testing-library/react';
import Step4PDF from './Step4PDF';

test('Render: Step4PDF', () => {
    render(<Step4PDF />);
    expect(screen.getByText("Pestaña 4 - PDF")).toBeInTheDocument();
});
