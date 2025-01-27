import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from './ItemCard';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const defaultProps = {
  title: 'Test Item',
  price: '۱٬۵۰۰٬۰۰۰ تومان',
  city: 'Tehran',
  date: '۱۴۰۲/۹/۲۴',
  image: '/images/test.jpg',
  onClick: mockNavigate,
};

describe('ItemCard Component', () => {
  test('renders item card with correct details', () => {
    render(<ItemCard {...defaultProps} />);

    // Verify all text and image content
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText(/۱٬۵۰۰٬۰۰۰ تومان/)).toBeInTheDocument();
    expect(screen.getByText('Tehran')).toBeInTheDocument();
    expect(screen.getByText(/۱۴۰۲\/۹\/۲۴/)).toBeInTheDocument();
    expect(screen.getByAltText('Test Item')).toBeInTheDocument();
  });

  test('triggers onClick when the card is clicked', () => {
    render(<ItemCard {...defaultProps} />);
    const itemCard = screen.getByRole('button', { name: /Test Item/i });
    fireEvent.click(itemCard);

    // Ensure onClick handler is called
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});