import { render, screen } from '@testing-library/react';
import Step1GeneralData from './Step1GeneralData';

test('Render: Step1GeneralData', () => {
    render(<Step1GeneralData />);
    expect(screen.getByText("Pestaña 1 - Datos Generales")).toBeInTheDocument();
});
