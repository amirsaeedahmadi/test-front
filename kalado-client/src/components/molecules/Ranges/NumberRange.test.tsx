import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberRange from './NumberRange';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../atoms', () => ({
    NumberInput: jest.fn(({ name, placeholder, onChange }) => (
        <input
            type="number"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            data-testid={`number-input-${name}`}
        />
    )),
}));

describe('NumberRange', () => {
    const mockOnChange = jest.fn();
    const props = {
        minName: 'minPrice',
        maxName: 'maxPrice',
        minPlaceholder: 'Min Price',
        maxPlaceholder: 'Max Price',
        onChange: mockOnChange,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the NumberRange component', () => {
        render(<NumberRange {...props} />);
        expect(screen.getByText('filter.price')).toBeInTheDocument();
        expect(screen.getByTestId('number-input-minPrice')).toBeInTheDocument();
        expect(screen.getByTestId('number-input-maxPrice')).toBeInTheDocument();
    });

    it('passes correct props to NumberInput components', () => {
        render(<NumberRange {...props} />);
        const minInput = screen.getByTestId('number-input-minPrice');
        const maxInput = screen.getByTestId('number-input-maxPrice');

        expect(minInput).toHaveAttribute('name', 'minPrice');
        expect(minInput).toHaveAttribute('placeholder', 'Min Price');
        expect(maxInput).toHaveAttribute('name', 'maxPrice');
        expect(maxInput).toHaveAttribute('placeholder', 'Max Price');
    });

    it('calls onChange when min input value changes', () => {
        render(<NumberRange {...props} />);
        const minInput = screen.getByTestId('number-input-minPrice');
        fireEvent.change(minInput, { target: { value: '100' } });
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('calls onChange when max input value changes', () => {
        render(<NumberRange {...props} />);
        const maxInput = screen.getByTestId('number-input-maxPrice');
        fireEvent.change(maxInput, { target: { value: '1000' } });
        expect(mockOnChange).toHaveBeenCalled();
    });
});
