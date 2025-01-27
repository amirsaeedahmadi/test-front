import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from './Filter';
import { useProductContext } from '../../../contexts/ProductContext';
import { OptionsComponent } from '../../../constants/options';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../contexts/ProductContext');
jest.mock('../../../constants/options');

jest.mock('../../atoms', () => ({
  CustomButton: jest.fn(({ text, onClick }) => <button onClick={onClick}>{text}</button>),
}));

jest.mock('../../molecules', () => ({
  LabelList: jest.fn(({ items, selectedValue, onSelect }) => (
    <div data-testid="label-list">
      {items.map((item: any) => (
        <button key={item.value} onClick={() => onSelect(item.value)}>
          {item.title}
        </button>
      ))}
    </div>
  )),
  NumberRange: jest.fn(({ minName, maxName, onChange }) => (
    <div>
      <input data-testid="min-price" name={minName} onChange={onChange} />
      <input data-testid="max-price" name={maxName} onChange={onChange} />
    </div>
  )),
}));

describe('Filter', () => {
  const mockApplyFilters = jest.fn();
  const mockDateFilterOptions = [
    { title: 'Today', value: 'today' },
    { title: 'This Week', value: 'this_week' },
    { title: 'This Month', value: 'this_month' },
  ];

  beforeEach(() => {
    (useProductContext as jest.Mock).mockReturnValue({
      applyFilters: mockApplyFilters,
    });
    (OptionsComponent as jest.Mock).mockReturnValue({
      date_filter_options: mockDateFilterOptions,
    });
  });

  it('renders the Filter component', () => {
    render(<Filter />);
    expect(screen.getByText('filter.title')).toBeInTheDocument();
    expect(screen.getByTestId('min-price')).toBeInTheDocument();
    expect(screen.getByTestId('max-price')).toBeInTheDocument();
    expect(screen.getByTestId('label-list')).toBeInTheDocument();
    expect(screen.getByText('filter.apply')).toBeInTheDocument();
  });

  it('handles price changes', () => {
    render(<Filter />);
    const minPriceInput = screen.getByTestId('min-price');
    const maxPriceInput = screen.getByTestId('max-price');

    fireEvent.change(minPriceInput, { target: { value: '100' } });
    fireEvent.change(maxPriceInput, { target: { value: '200' } });

    expect(minPriceInput).toHaveValue('100');
    expect(maxPriceInput).toHaveValue('200');
  });

  it('prevents negative price inputs', () => {
    render(<Filter />);
    const minPriceInput = screen.getByTestId('min-price');

    fireEvent.change(minPriceInput, { target: { value: '-100' } });

    expect(minPriceInput).toHaveValue('0');
  });

  it('handles date selection', () => {
    render(<Filter />);
    const dateButton = screen.getByText('This Week');

    fireEvent.click(dateButton);

    // You might need to adjust this expectation based on how your LabelList component works
    expect(dateButton).toHaveStyle('background-color: some-selected-color');
  });

  it('applies filters when apply button is clicked', () => {
    render(<Filter />);
    const applyButton = screen.getByText('filter.apply');

    fireEvent.change(screen.getByTestId('min-price'), { target: { value: '100' } });
    fireEvent.change(screen.getByTestId('max-price'), { target: { value: '200' } });
    fireEvent.click(screen.getByText('This Week'));
    fireEvent.click(applyButton);

    expect(mockApplyFilters).toHaveBeenCalledWith('this_week', 100, 200, 'this_week');
  });
});
