import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconList from './IconList';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: {
            language: 'en'
        }
    }),
}));

describe('IconList', () => {
    const mockItems = [
        { title: 'Item 1', icon: <span>Icon1</span> },
        { title: 'Item 2', icon: <span>Icon2</span> },
        { title: 'Item 3', icon: <span>Icon3</span> },
    ];

    const mockOnSelect = jest.fn();

    it('renders the IconList component', () => {
        render(<IconList items={mockItems} onSelect={mockOnSelect} initialSelect="Item 1" />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders the title when provided', () => {
        render(<IconList items={mockItems} onSelect={mockOnSelect} initialSelect="Item 1" title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('calls onSelect when an item is clicked', () => {
        render(<IconList items={mockItems} onSelect={mockOnSelect} initialSelect="Item 1" />);
        fireEvent.click(screen.getByText('Item 2'));
        expect(mockOnSelect).toHaveBeenCalledWith('Item 2');
    });

    it('highlights the selected item', () => {
        render(<IconList items={mockItems} onSelect={mockOnSelect} initialSelect="Item 1" />);
        const selectedItem = screen.getByText('Item 1').closest('div');
        expect(selectedItem).toHaveStyle('background-color: #D74101');
    });

    it('changes the selected item when a new item is clicked', () => {
        render(<IconList items={mockItems} onSelect={mockOnSelect} initialSelect="Item 1" />);
        fireEvent.click(screen.getByText('Item 2'));
        const newSelectedItem = screen.getByText('Item 2').closest('div');
        expect(newSelectedItem).toHaveStyle('background-color: #D74101');
    });

    it('renders icons correctly', () => {
        render(<IconList items={mockItems} onSelect={mockOnSelect} initialSelect="Item 1" />);
        expect(screen.getByText('Icon1')).toBeInTheDocument();
        expect(screen.getByText('Icon2')).toBeInTheDocument();
        expect(screen.getByText('Icon3')).toBeInTheDocument();
    });
});
