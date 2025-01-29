import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import NavBar from './NavBar';
import { ProductProvider } from '../../../contexts';

const renderWithProviders = (ui: React.ReactNode) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      <ProductProvider>{ui}</ProductProvider>
    </ThemeProvider>
  );
};

describe('NavBar Component', () => {
  it('renders correctly', () => {
    const { getByText } = renderWithProviders(<NavBar />);

    expect(getByText(/logo/i)).toBeInTheDocument();
    expect(getByText(/search/i)).toBeInTheDocument();
    expect(getByText(/button text/i)).toBeInTheDocument();
  });

  it('handles search input change', () => {
    const { getByPlaceholderText } = renderWithProviders(<NavBar />);

    const searchInput = getByPlaceholderText(/search/i); // Adjust based on actual placeholder text
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput.value).toBe('test');
  });

  it('calls searchProductsByKeyword on form submit', () => {
    const searchProductsByKeywordMock = jest.fn();

    // Mock context
    jest.mock('../../../contexts', () => ({
      useProductContext: () => ({
        searchProductsByKeyword: searchProductsByKeywordMock,
      }),
    }));

    const { getByPlaceholderText, getByRole } = renderWithProviders(<NavBar />);

    const searchInput = getByPlaceholderText(/search/i); // Adjust based on actual placeholder text
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const form = getByRole('form'); // Ensure the SearchBar has a role of form or adjust accordingly
    fireEvent.submit(form);

    expect(searchProductsByKeywordMock).toHaveBeenCalledWith('test');
  });
});
