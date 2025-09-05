import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    test('renders the footer and displays the copyright text', () => {
        render(<Footer />);
        expect(
        screen.getByText(/© \d{4} Designed and developed by Ismael Marot/i)
        ).toBeInTheDocument();
    });

    test('opens and closes LegalModal when clicking the Legal button', async () => {
        render(<Footer />);
        const legalButton = screen.getByRole('button', { name: 'Legal' } );
        fireEvent.click(legalButton);

        const closeButton = screen.getByLabelText('Close');
        expect(closeButton).toBeVisible();

        fireEvent.click(closeButton);

        await waitFor(() => {
        expect(closeButton).not.toBeVisible();
        });
    });

    test('opens and closes TermsModal when clicking the Terms of Use button', async () => {
        render(<Footer />);
        const termsButton = screen.getByRole('button', { name: 'Terms of Use' });
        fireEvent.click(termsButton);

        const closeButton = screen.getByLabelText('Close');
        expect(closeButton).toBeVisible();

        fireEvent.click(closeButton);

        await waitFor(() => {
        expect(closeButton).not.toBeVisible();
        });
    });
});
