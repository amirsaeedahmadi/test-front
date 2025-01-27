import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from './SignupForm';
import { signupUser } from '../../../../api/services/AuthService';
import { useModalContext } from '../../../../contexts';
import { toast } from 'react-toastify';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../api/services/AuthService');
jest.mock('../../../contexts');
jest.mock('react-toastify');

describe('SignupForm', () => {
  const mockHandleOpenLogin = jest.fn();
  const mockHandleOpenCodeVerification = jest.fn();

  beforeEach(() => {
    (useModalContext as jest.Mock).mockReturnValue({
      isSignupVisible: true,
      handleOpenLogin: mockHandleOpenLogin,
      handleOpenCodeVerification: mockHandleOpenCodeVerification,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the signup form', () => {
    render(<SignupForm />);
    expect(screen.getByPlaceholderText('general_inputs.first_name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('general_inputs.last_name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('general_inputs.email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('general_inputs.phone_number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('general_inputs.password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('general_inputs.password_repeat')).toBeInTheDocument();
    expect(screen.getByLabelText('signup_form.is_admin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'signup_form.signup_btn' })).toBeInTheDocument();
    expect(screen.getByText('signup_form.login_link')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<SignupForm />);
    const firstNameInput = screen.getByPlaceholderText('general_inputs.first_name');
    const lastNameInput = screen.getByPlaceholderText('general_inputs.last_name');
    const emailInput = screen.getByPlaceholderText('general_inputs.email');
    const phoneInput = screen.getByPlaceholderText('general_inputs.phone_number');
    const passwordInput = screen.getByPlaceholderText('general_inputs.password');
    const passwordRepeatInput = screen.getByPlaceholderText('general_inputs.password_repeat');
    const adminCheckbox = screen.getByLabelText('signup_form.is_admin');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordRepeatInput, { target: { value: 'password123' } });
    fireEvent.click(adminCheckbox);

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('1234567890');
    expect(passwordInput).toHaveValue('password123');
    expect(passwordRepeatInput).toHaveValue('password123');
    expect(adminCheckbox).toBeChecked();
  });

  it('displays an error for invalid phone number', async () => {
    render(<SignupForm />);
    const phoneInput = screen.getByPlaceholderText('general_inputs.phone_number');
    const submitButton = screen.getByRole('button', { name: 'signup_form.signup_btn' });

    fireEvent.change(phoneInput, { target: { value: 'invalid-phone' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('invalid_phone_number')).toBeInTheDocument();
    });
  });

  it('displays an error for invalid password', async () => {
    render(<SignupForm />);
    const passwordInput = screen.getByPlaceholderText('general_inputs.password');
    const submitButton = screen.getByRole('button', { name: 'signup_form.signup_btn' });

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('invalid_password')).toBeInTheDocument();
    });
  });

  it('displays an error for password mismatch', async () => {
    render(<SignupForm />);
    const passwordInput = screen.getByPlaceholderText('general_inputs.password');
    const passwordRepeatInput = screen.getByPlaceholderText('general_inputs.password_repeat');
    const submitButton = screen.getByRole('button', { name: 'signup_form.signup_btn' });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordRepeatInput, { target: { value: 'password456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('signup_form.error.password_mismatch')).toBeInTheDocument();
    });
  });

  it('calls signupUser with correct data on form submission', async () => {
    (signupUser as jest.Mock).mockResolvedValue({ isSuccess: true });

    render(<SignupForm />);
    const firstNameInput = screen.getByPlaceholderText('general_inputs.first_name');
    const lastNameInput = screen.getByPlaceholderText('general_inputs.last_name');
    const emailInput = screen.getByPlaceholderText('general_inputs.email');
    const phoneInput = screen.getByPlaceholderText('general_inputs.phone_number');
    const passwordInput = screen.getByPlaceholderText('general_inputs.password');
    const passwordRepeatInput = screen.getByPlaceholderText('general_inputs.password_repeat');
    const submitButton = screen.getByRole('button', { name: 'signup_form.signup_btn' });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordRepeatInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signupUser).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        role: 'USER'
      });
    });
  });

  it('handles successful signup', async () => {
    (signupUser as jest.Mock).mockResolvedValue({ isSuccess: true });

    render(<SignupForm />);
    const submitButton = screen.getByRole('button', { name: 'signup_form.signup_btn' });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleOpenCodeVerification).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith('success.signup');
    });
  });

  it('handles signup failure', async () => {
    (signupUser as jest.Mock).mockResolvedValue({ isSuccess: false, message: 'Signup failed' });

    render(<SignupForm />);
    const submitButton = screen.getByRole('button', { name: 'signup_form.signup_btn' });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Signup failed')).toBeInTheDocument();
    });
  });

  it('opens login form when login link is clicked', () => {
    render(<SignupForm />);
    const loginLink = screen.getByText('signup_form.login_link');

    fireEvent.click(loginLink);

    expect(mockHandleOpenLogin).toHaveBeenCalled();
  });
});
