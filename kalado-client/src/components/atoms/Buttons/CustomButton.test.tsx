import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('CustomButton Component', () => {
    it('renders correctly with default props', () => {
        const { getByRole } = render(<CustomButton onClick={() => { }} />);
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle('background-color: #D74101');
        expect(button).toHaveStyle('color: #FFFFFF');
    });

    it('renders with custom text', () => {
        const { getByText } = render(<CustomButton text="Click Me" onClick={() => { }} />);
        const button = getByText('Click Me');
        expect(button).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        const { getByRole } = render(<CustomButton onClick={handleClick} />);

        const button = getByRole('button');
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom styles correctly', () => {
        const { getByRole } = render(
            <CustomButton
                onClick={() => { }}
                backgroundColor="blue"
                color="white"
                padding="15px 25px"
                margin="10px"
            />
        );

        const button = getByRole('button');
        expect(button).toHaveStyle('background-color: blue');
        expect(button).toHaveStyle('color: white');
        expect(button).toHaveStyle('padding: 15px 25px');
        expect(button).toHaveStyle('margin: 10px');
    });

    it('renders with square shape when specified', () => {
        const { getByRole } = render(<CustomButton shape="square" onClick={() => { }} />);

        const button = getByRole('button');
        expect(button).toHaveStyle('border-radius: 0px');
    });

    it('renders with rounded shape when specified', () => {
        const { getByRole } = render(<CustomButton shape="rounded" onClick={() => { }} />);

        const button = getByRole('button');
        expect(button).toHaveStyle('border-radius: 30px');
    });
});
