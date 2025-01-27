import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CodeVerificationForm from './CodeVerificationForm';
import { verifyCode } from '../../../../api/services/AuthService';
import { useModalContext } from '../../../../contexts';
import { toast } from 'react-toastify';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../api/services/AuthService');
jest.mock('../../../contexts');
jest.mock('react-toastify');

describe('CodeVerificationForm', () => {
    const mockHandleClosePopups = jest.fn();

    beforeEach(() => {
        (useModalContext as jest.Mock).mockReturnValue({
            isCodeVerificationVisible: true,
            handleClosePopups: mockHandleClosePopups,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the code verification form', () => {
        render(<CodeVerificationForm />);
        expect(screen.getByText('code_verification.enter_code')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'code_verification.verify_btn' })).toBeInTheDocument();
    });

    it('handles input changes and only allows numbers', () => {
        render(<CodeVerificationForm />);
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: '123abc' } });
        expect(input).toHaveValue('123');

        fireEvent.change(input, { target: { value: '1234567' } });
        expect(input).toHaveValue('123456');
    });

    it('disables submit button when code length is not 6', () => {
        render(<CodeVerificationForm />);
        const input = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: 'code_verification.verify_btn' });

        expect(submitButton).toBeDisabled();

        fireEvent.change(input, { target: { value: '12345' } });
        expect(submitButton).toBeDisabled();

        fireEvent.change(input, { target: { value: '123456' } });
        expect(submitButton).not.toBeDisabled();
    });

    it('calls verifyCode with correct code on form submission', async () => {
        (verifyCode as jest.Mock).mockResolvedValue({ isSuccess: true });

        render(<CodeVerificationForm />);
        const input = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: 'code_verification.verify_btn' });

        fireEvent.change(input, { target: { value: '123456' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(verifyCode).toHaveBeenCalledWith('123456');
        });
    });

    it('handles successful code verification', async () => {
        (verifyCode as jest.Mock).mockResolvedValue({ isSuccess: true });

        render(<CodeVerificationForm />);
        const input = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: 'code_verification.verify_btn' });

        fireEvent.change(input, { target: { value: '123456' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockHandleClosePopups).toHaveBeenCalled();
            expect(toast).toHaveBeenCalledWith('success.code_verification');
        });
    });

    it('handles code verification failure', async () => {
        (verifyCode as jest.Mock).mockResolvedValue({ isSuccess: false, message: 'Invalid code' });

        render(<CodeVerificationForm />);
        const input = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: 'code_verification.verify_btn' });

        fireEvent.change(input, { target: { value: '123456' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid code')).toBeInTheDocument();
        });
    });
});
