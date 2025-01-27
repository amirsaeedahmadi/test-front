import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LabelList from './LabelList';

describe('LabelList', () => {
    const mockItems = [
        { title: 'Label 1', value: 'value1' },
        { title: 'Label 2', value: 'value2' },
        { title: 'Label 3', value: 'value3' },
    ];

    const mockOnSelect = jest.fn();

    it('renders the LabelList component', () => {
        render(<LabelList items={mockItems} selectedValue={null} onSelect={mockOnSelect} />);
        expect(screen.getByText('Label 1')).toBeInTheDocument();
        expect(screen.getByText('Label 2')).toBeInTheDocument();
        expect(screen.getByText('Label 3')).toBeInTheDocument();
    });

    it('renders the title when provided', () => {
        render(<LabelList items={mockItems} selectedValue={null} onSelect={mockOnSelect} title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('calls onSelect with the correct value when an item is clicked', () => {
        render(<LabelList items={mockItems} selectedValue={null} onSelect={mockOnSelect} />);
        fireEvent.click(screen.getByText('Label 2'));
        expect(mockOnSelect).toHaveBeenCalledWith('value2');
    });

    it('highlights the selected item', () => {
        render(<LabelList items={mockItems} selectedValue="value2" onSelect={mockOnSelect} />);
        const selectedItem = screen.getByText('Label 2');
        expect(selectedItem).toHaveStyle('background-color: #D74101');
    });

    it('deselects the item when clicked again', () => {
        render(<LabelList items={mockItems} selectedValue="value2" onSelect={mockOnSelect} />);
        fireEvent.click(screen.getByText('Label 2'));
        expect(mockOnSelect).toHaveBeenCalledWith(null);
    });

    it('applies correct styles to items', () => {
        render(<LabelList items={mockItems} selectedValue={null} onSelect={mockOnSelect} />);
        const item = screen.getByText('Label 1');
        expect(item).toHaveStyle({
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '15px',
            border: '1px solid',
            textAlign: 'center',
        });
    });
});
