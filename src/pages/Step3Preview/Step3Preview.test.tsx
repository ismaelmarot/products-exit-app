import { render, screen } from '@testing-library/react';
import Step3Preview from './Step3Preview';
import { AppProvider } from '../../context/AppContext';

test('Render: Step3Previsualizacion', () => {
  render(
    <AppProvider>
      <Step3Preview onBack={() => {}} onNext={() => {}} />
    </AppProvider>
  );
  expect(screen.getByText("Previsualización")).toBeInTheDocument();
});
