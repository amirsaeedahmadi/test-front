import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: { language: 'en' }
    }),
}));

describe('SearchBar', () => {
    const mockOnChange = jest.fn();
    const mockOnSearch = jest.fn();
    const mockOptions = ['Option 1', 'Option 2', 'Option 3'];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the SearchBar component', () => {
        render(
            <SearchBar
                value=""
                options={mockOptions}
                onChange={mockOnChange}
                onSearch={mockOnSearch}
            />
        );
        expect(screen.getByPlaceholderText('navbar.searchbar')).toBeInTheDocument();
    });

    it('uses custom placeholder when provided', () => {
        render(
            <SearchBar
                value=""
                placeholder="Custom Placeholder"
                options={mockOptions}
                onChange={mockOnChange}
                onSearch={mockOnSearch}
            />
        );
        expect(screen.getByPlaceholderText('Custom Placeholder')).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        render(
            <SearchBar
                value=""
                options={mockOptions}
                onChange={mockOnChange}
                onSearch={mockOnSearch}
            />
        );
        const input = screen.getByPlaceholderText('navbar.searchbar');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'test' } }));
    });

    it('calls onSearch when search button is clicked', () => {
        render(
            <SearchBar
                value="test"
                options={mockOptions}
                onChange={mockOnChange}
                onSearch={mockOnSearch}
            />
        );
        const searchButton = screen.getByLabelText('search');
        fireEvent.click(searchButton);
        expect(mockOnSearch).toHaveBeenCalled();
    });

    it('calls onSearch when Enter key is pressed', () => {
        render(
            <SearchBar
                value="test"
                options={mockOptions}
                onChange={mockOnChange}
                onSearch={mockOnSearch}
            />
        );
        const input = screen.getByPlaceholderText('navbar.searchbar');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(mockOnSearch).toHaveBeenCalled();
    });

    it('clears input when clear button is clicked', () => {
        render(
            <SearchBar
                value="test"
                options={mockOptions}
                onChange={mockOnChange}
                onSearch={mockOnSearch}
            />
        );
        const clearButton = screen.getByLabelText('clear');
        fireEvent.click(clearButton);
        expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '' } }));
    });

    it('displays options in autocomplete', () => {
        render(
            <SearchBar
                value=""
                options={mockOptions}
                onChange={mockOnChange}
                onSearch={mockOnSearch}
            />
        );
        const input = screen.getByPlaceholderText('navbar.searchbar');
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'Option' } });
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
});
