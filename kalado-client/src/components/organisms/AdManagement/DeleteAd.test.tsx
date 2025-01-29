import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteAd from './DeleteAd';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

describe('DeleteAd Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
  };

  test('opens and closes correctly', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();

    // Render the component with isOpen as true
    renderWithProviders(
      <DeleteAd isOpen={true} onClose={handleClose} onConfirm={handleConfirm} />
    );

    // Check if dialog is open
    expect(screen.getByText(/آیا از حذف این آگهی اطمینان دارید؟/)).toBeInTheDocument();

    // Close the dialog by clicking the "Cancel" button
    fireEvent.click(screen.getByRole('button', { name: /Cancel/ }));

    // Ensure onClose is called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('clicking confirm button calls onConfirm', () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();

    // Render the component with isOpen as true
    renderWithProviders(
      <DeleteAd isOpen={true} onClose={handleClose} onConfirm={handleConfirm} />
    );

    // Click the "Confirm" button
    fireEvent.click(screen.getByRole('button', { name: /Confirm/ }));

    // Ensure onConfirm is called
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});