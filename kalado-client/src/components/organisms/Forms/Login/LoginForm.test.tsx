import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
import { loginUser } from '../../../../api/services/AuthService';
import { useAuth } from '../../../../contexts/AuthContext';
import { useModalContext } from '../../../../contexts';
import { toast } from 'react-toastify';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../api/services/AuthService');
jest.mock('../../../contexts/AuthContext');
jest.mock('../../../contexts');
jest.mock('react-toastify');

describe('LoginForm', () => {
  const mockSetToken = jest.fn();
  const mockSetUserRole = jest.fn();
  const mockHandleClosePopups = jest.fn();
  const mockHandleOpenSignup = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      setToken: mockSetToken,
      setUserRole: mockSetUserRole,
    });
    (useModalContext as jest.Mock).mockReturnValue({
      isLoginVisible: true,
      handleOpenSignup: mockHandleOpenSignup,
      handleClosePopups: mockHandleClosePopups,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login_form.login_btn/i })).toBeInTheDocument();
    expect(screen.getByText(/login_form.signup_link/i)).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('displays an error for invalid email', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login_form.login_btn/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid_email/i)).toBeInTheDocument();
    });
  });

  it('calls loginUser with correct credentials on form submission', async () => {
    (loginUser as jest.Mock).mockResolvedValue({ isSuccess: true, token: 'fake-token', role: 'user' });

    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login_form.login_btn/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('handles successful login', async () => {
    (loginUser as jest.Mock).mockResolvedValue({ isSuccess: true, token: 'fake-token', role: 'user' });

    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login_form.login_btn/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith('fake-token');
      expect(mockSetUserRole).toHaveBeenCalledWith('user');
      expect(mockHandleClosePopups).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith('success.login');
    });
  });

  it('handles login failure', async () => {
    (loginUser as jest.Mock).mockResolvedValue({ isSuccess: false, message: 'Invalid credentials' });

    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login_form.login_btn/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('opens signup form when signup link is clicked', () => {
    render(<LoginForm />);
    const signupLink = screen.getByText(/login_form.signup_link/i);

    fireEvent.click(signupLink);

    expect(mockHandleOpenSignup).toHaveBeenCalled();
  });
});
