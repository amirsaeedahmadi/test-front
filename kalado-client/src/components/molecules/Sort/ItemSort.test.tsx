import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemSort from './ItemSort';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

describe('ItemSort', () => {
    const mockSetSortOption = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the ItemSort component', () => {
        render(<ItemSort sortOption="newest" setSortOption={mockSetSortOption} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays the current sort option', () => {
        render(<ItemSort sortOption="newest" setSortOption={mockSetSortOption} />);
        expect(screen.getByRole('button')).toHaveTextContent('sort.newest');
    });

    it('opens the select menu when clicked', () => {
        render(<ItemSort sortOption="newest" setSortOption={mockSetSortOption} />);
        fireEvent.mouseDown(screen.getByRole('button'));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('displays all sort options', () => {
        render(<ItemSort sortOption="newest" setSortOption={mockSetSortOption} />);
        fireEvent.mouseDown(screen.getByRole('button'));
        expect(screen.getByText('sort.newest')).toBeInTheDocument();
        expect(screen.getByText('sort.oldest')).toBeInTheDocument();
        expect(screen.getByText('sort.most_expensive')).toBeInTheDocument();
        expect(screen.getByText('sort.cheapest')).toBeInTheDocument();
    });

    it('calls setSortOption when a new option is selected', () => {
        render(<ItemSort sortOption="newest" setSortOption={mockSetSortOption} />);
        fireEvent.mouseDown(screen.getByRole('button'));
        fireEvent.click(screen.getByText('sort.oldest'));
        expect(mockSetSortOption).toHaveBeenCalled();
    });

    it('sets the correct aria-label', () => {
        render(<ItemSort sortOption="newest" setSortOption={mockSetSortOption} />);
        expect(screen.getByLabelText('Sort Items')).toBeInTheDocument();
    });
});
