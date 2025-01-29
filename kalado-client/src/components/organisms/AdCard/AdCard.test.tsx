import React from 'react';
import renderWithProviders from '../../../tests/renderWithProviders';
import { screen, fireEvent } from '@testing-library/react';
import AdCard from './AdCard';
import i18n from 'i18next';

describe('AdCard Component', () => {
  const defaultProps = {
    title: 'Test Ad',
    status: 'active',
    onStatusChange: jest.fn(),
    onDelete: jest.fn(),
    onEditTitle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage('fa');
  });

  test('edits the title when the Edit button is clicked and Enter is pressed', () => {
    renderWithProviders(<AdCard {...defaultProps} />);

    const editButton = screen.getByRole('button', { name: i18n.t('ad_list.buttons.edit') });
    fireEvent.click(editButton);

    const titleInput = screen.getByRole('textbox');
    fireEvent.change(titleInput, { target: { value: 'عنوان جدید' } });
    fireEvent.keyDown(titleInput, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onEditTitle).toHaveBeenCalledWith('عنوان جدید');
  });

  test('does not allow the title to exceed 50 characters', () => {
    renderWithProviders(<AdCard {...defaultProps} />);

    const editButton = screen.getByRole('button', { name: i18n.t('ad_list.buttons.edit') });
    fireEvent.click(editButton);

    const titleInput = screen.getByRole('textbox');
    fireEvent.change(titleInput, { target: { value: 'آ'.repeat(51) } });
    fireEvent.keyDown(titleInput, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onEditTitle).toHaveBeenCalledWith('آ'.repeat(50));
  });

  test('changes status when a new status is selected', () => {
    renderWithProviders(<AdCard {...defaultProps} />);

    const statusDropdown = screen.getByRole('combobox');
    fireEvent.mouseDown(statusDropdown);

    const reservedOption = screen.getByText(i18n.t('ad_list.ad_status.RESERVED'));
    fireEvent.click(reservedOption);

    expect(defaultProps.onStatusChange).toHaveBeenCalledWith('reserved');
  });

  test('renders correctly with RTL (right-to-left) language setting', () => {
    renderWithProviders(<AdCard {...defaultProps} />);

    const cardElement = screen.getByTestId('ad-card-container');
    expect(cardElement).toHaveStyle({ direction: 'rtl' });
  });

  test('renders correctly with LTR (left-to-right) language setting', () => {
    i18n.changeLanguage('en');
    renderWithProviders(<AdCard {...defaultProps} />);

    const cardElement = screen.getByTestId('ad-card-container');
    expect(cardElement).toHaveStyle({ direction: 'ltr' });
  });

  test('opens the delete confirmation dialog when delete button is clicked', () => {
    renderWithProviders(<AdCard {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: i18n.t('ad_list.buttons.delete') });
    fireEvent.click(deleteButton);

    const dialogTitle = screen.getByText(i18n.t('ad_list.delete_confirmation.title'));
    expect(dialogTitle).toBeInTheDocument();
  });

  test('confirms deletion when confirm button is clicked', () => {
    renderWithProviders(<AdCard {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: i18n.t('ad_list.buttons.delete') });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByLabelText('Confirm');
    fireEvent.click(confirmButton);

    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
  });

  test('cancels deletion when cancel button is clicked', () => {
    renderWithProviders(<AdCard {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: i18n.t('ad_list.buttons.delete') });
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByLabelText('Cancel');
    fireEvent.click(cancelButton);

    expect(defaultProps.onDelete).not.toHaveBeenCalled();
  });
});