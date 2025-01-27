import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';
import { useAuth, useThemeContext, useModalContext, useLanguageContext, useProductContext } from '../../../contexts';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: () => ({
    palette: {
      background: {
        paper: '#ffffff',
      },
    },
  }),
}));

jest.mock('../../../contexts');
jest.mock('../../../constants/options', () => ({
  OptionsComponent: () => ({
    search_options: ['Option 1', 'Option 2'],
  }),
}));

describe('NavBar', () => {
  const mockToggleTheme = jest.fn();
  const mockToggleLanguage = jest.fn();
  const mockHandleOpenLogin = jest.fn();
  const mockHandleOpenCreateAd = jest.fn();
  const mockHandleOpenProfilePage = jest.fn();
  const mockHandleLogoutClick = jest.fn();
  const mockSearchProductsByKeyword = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ token: null });
    (useThemeContext as jest.Mock).mockReturnValue({ isDarkMode: false, toggleTheme: mockToggleTheme });
    (useLanguageContext as jest.Mock).mockReturnValue({ currentLanguage: 'en', toggleLanguage: mockToggleLanguage });
    (useModalContext as jest.Mock).mockReturnValue({
      handleOpenLogin: mockHandleOpenLogin,
      handleOpenCreateAd: mockHandleOpenCreateAd,
      handleOpenProfilePage: mockHandleOpenProfilePage,
      handleLogoutClick: mockHandleLogoutClick,
      isInProfile: false,
    });
    (useProductContext as jest.Mock).mockReturnValue({ searchProductsByKeyword: mockSearchProductsByKeyword });
  });

  it('renders the NavBar component', () => {
    render(<NavBar />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'En' })).toBeInTheDocument();
    expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'navbar.login/signup' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'navbar.create_ad' })).toBeInTheDocument();
  });

  it('toggles language when language button is clicked', () => {
    render(<NavBar />);
    const languageButton = screen.getByRole('button', { name: 'En' });
    fireEvent.click(languageButton);
    expect(mockToggleLanguage).toHaveBeenCalled();
  });

  it('toggles theme when theme button is clicked', () => {
    render(<NavBar />);
    const themeButton = screen.getByTestId('DarkModeIcon').parentElement;
    fireEvent.click(themeButton!);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('opens login modal when login button is clicked', () => {
    render(<NavBar />);
    const loginButton = screen.getByRole('button', { name: 'navbar.login/signup' });
    fireEvent.click(loginButton);
    expect(mockHandleOpenLogin).toHaveBeenCalled();
  });

  it('opens create ad modal when create ad button is clicked', () => {
    render(<NavBar />);
    const createAdButton = screen.getByRole('button', { name: 'navbar.create_ad' });
    fireEvent.click(createAdButton);
    expect(mockHandleOpenCreateAd).toHaveBeenCalled();
  });

  it('shows profile button when user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ token: 'fake-token' });
    render(<NavBar />);
    expect(screen.getByRole('button', { name: 'navbar.profile' })).toBeInTheDocument();
  });

  it('shows logout button when user is in profile page', () => {
    (useAuth as jest.Mock).mockReturnValue({ token: 'fake-token' });
    (useModalContext as jest.Mock).mockReturnValue({
      ...useModalContext(),
      isInProfile: true,
    });
    render(<NavBar />);
    expect(screen.getByRole('button', { name: 'navbar.logout' })).toBeInTheDocument();
  });

  it('handles search functionality', () => {
    render(<NavBar />);
    const searchInput = screen.getByRole('textbox');
    const searchForm = screen.getByRole('search');

    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.submit(searchForm);

    expect(mockSearchProductsByKeyword).toHaveBeenCalledWith('test search');
  });
});
