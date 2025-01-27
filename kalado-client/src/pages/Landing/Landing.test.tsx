import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from './Landing';
import { ProductProvider, useProductContext } from '../../contexts';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../components/molecules', () => ({
  SideBar: jest.fn(({ children }) => <div data-testid="sidebar">{children}</div>),
}));

jest.mock('../../components/organisms', () => ({
  NavBar: jest.fn(() => <div data-testid="navbar" />),
  SideBarMenu: jest.fn(({ onSelectCategory }) => (
    <div data-testid="sidebar-menu">
      <button onClick={() => onSelectCategory('category.one')}>Category One</button>
      <button onClick={() => onSelectCategory('category.two')}>Category Two</button>
    </div>
  )),
  Filter: jest.fn(() => <div data-testid="filter" />),
  LoginForm: jest.fn(() => <div data-testid="login-form" />),
  SignupForm: jest.fn(() => <div data-testid="signup-form" />),
  CodeVerificationForm: jest.fn(() => <div data-testid="code-verification-form" />),
  CreateAdForm: jest.fn(() => <div data-testid="create-ad-form" />),
  ItemsHolder: jest.fn(() => <div data-testid="items-holder" />),
}));

jest.mock('../../contexts', () => ({
  ProductProvider: jest.fn(({ children }) => <div>{children}</div>),
  useProductContext: jest.fn(() => ({
    fetchProductsByCategory: jest.fn(),
  })),
}));

describe('Landing', () => {
  it('renders the Landing component', () => {
    render(<Landing />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument();
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByTestId('items-holder')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('signup-form')).toBeInTheDocument();
    expect(screen.getByTestId('code-verification-form')).toBeInTheDocument();
    expect(screen.getByTestId('create-ad-form')).toBeInTheDocument();
  });

  it('changes category and fetches products when a new category is selected', async () => {
    const mockFetchProductsByCategory = jest.fn();
    (useProductContext as jest.Mock).mockReturnValue({
      fetchProductsByCategory: mockFetchProductsByCategory,
    });

    render(<Landing />);

    fireEvent.click(screen.getByText('Category Two'));

    await waitFor(() => {
      expect(mockFetchProductsByCategory).toHaveBeenCalledWith('category.two');
    });
  });

  it('wraps LandingContent with ProductProvider', () => {
    render(<Landing />);
    expect(ProductProvider).toHaveBeenCalled();
  });
});
