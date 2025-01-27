import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBarMenu from './SideBarMenu';
import { IconList } from '../../molecules';

jest.mock('../../molecules', () => ({
    IconList: jest.fn(() => null)
}));

describe('SideBarMenu', () => {
    const mockCategories = [
        { title: 'Category 1', icon: <span>Icon1</span> },
        { title: 'Category 2', icon: <span>Icon2</span> },
        { title: 'Category 3', icon: <span>Icon3</span> },
    ];

    const mockOnSelectCategory = jest.fn();

    beforeEach(() => {
        (IconList as jest.Mock).mockClear();
    });

    it('renders the SideBarMenu component', () => {
        render(<SideBarMenu categories={mockCategories} onSelectCategory={mockOnSelectCategory} initialSelect="Category 1" />);
        expect(IconList).toHaveBeenCalled();
    });

    it('passes correct props to IconList', () => {
        const title = 'Test Title';
        render(
            <SideBarMenu
                categories={mockCategories}
                onSelectCategory={mockOnSelectCategory}
                title={title}
                initialSelect="Category 1"
            />
        );

        expect(IconList).toHaveBeenCalledWith(
            {
                items: mockCategories,
                onSelect: mockOnSelectCategory,
                title: title,
                initialSelect: 'Category 1'
            },
            {}
        );
    });

    it('passes correct initialSelect to IconList', () => {
        render(
            <SideBarMenu
                categories={mockCategories}
                onSelectCategory={mockOnSelectCategory}
                initialSelect="Category 2"
            />
        );

        expect(IconList).toHaveBeenCalledWith(
            expect.objectContaining({
                initialSelect: 'Category 2'
            }),
            {}
        );
    });
});
