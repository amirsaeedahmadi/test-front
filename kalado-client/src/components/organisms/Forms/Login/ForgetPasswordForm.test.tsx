import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ForgetPasswordForm from './ForgetPasswordForm';
import { forgetPassword } from '../../../../api/services/AuthService';
import { toast } from 'react-toastify';

jest.mock('../../../../api/services/AuthService', () => ({
    resetPassword: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: jest.fn(),
}));

jest.mock('../../../../contexts', () => ({
    useModalContext: () => ({
        isForgetPasswordVisible: true,
        handleClosePopups: jest.fn(),
    }),
}));

describe('ForgetPasswordForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('renders correctly', () => {
        const { getByText } = render(<ForgetPasswordForm />);

        expect(getByText(/enter_your_email/i)).toBeInTheDocument();
        expect(getByText(/forget_password_btn/i)).toBeInTheDocument();
    });

    it('validates email input and shows error message', async () => {
        const { getByText, getByRole } = render(<ForgetPasswordForm />);

        // Simulate invalid email input
        fireEvent.change(getByRole('textbox'), { target: { value: 'invalid-email' } });

        fireEvent.click(getByText(/forget_password_btn/i));

        await waitFor(() => {
            expect(getByText(/invalid email/i)).toBeInTheDocument(); // Adjust this based on your actual validation message
        });
    });

    it('handles successful password reset', async () => {
        resetPassword.mockResolvedValueOnce({ isSuccess: true }); // Mock successful response

        const { getByText, getByRole } = render(<ForgetPasswordForm />);

        fireEvent.change(getByRole('textbox'), { target: { value: 'test@example.com' } });
        fireEvent.click(getByText(/forget_password_btn/i));

        await waitFor(() => {
            expect(resetPassword).toHaveBeenCalledWith('test@example.com'); // Check if resetPassword was called with correct email
            expect(toast).toHaveBeenCalledWith("success.forget_password"); // Check if toast was called with success message
        });
    });

    it('handles failed password reset and shows error message', async () => {
        resetPassword.mockResolvedValueOnce({ isSuccess: false, message: 'Error resetting password' }); // Mock failure response

        const { getByText, getByRole } = render(<ForgetPasswordForm />);

        fireEvent.change(getByRole('textbox'), { target: { value: 'test@example.com' } });
        fireEvent.click(getByText(/forget_password_btn/i));

        await waitFor(() => {
            expect(getByText('Error resetting password')).toBeInTheDocument(); // Check if error message is displayed
        });
    });
});
