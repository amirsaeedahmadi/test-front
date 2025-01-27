import React from 'react';
import { Box, Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

interface CustomButtonProps extends Omit<MuiButtonProps, 'color'> {
    text?: string;
    fontSize?: string | number;
    icon?: React.ReactNode;
    shape?: 'rounded' | 'square';
    borderRadius?: string;
    backgroundColor?: string;
    color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error', React.ElementType>;
    padding?: string;
    margin?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    text,
    fontSize,
    icon,
    shape = 'rounded',
    borderRadius,
    backgroundColor = '#D74101',
    color = '#FFFFFF',
    padding = '5px 15px',
    margin = '20px 5px',
    type = 'button',
    onClick,
    disabled,
    ...props
}) => {

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <MuiButton
                sx={{
                    borderRadius: borderRadius || (shape === 'square' ? '0px' : '30px'),
                    width: 'auto',
                    backgroundColor: backgroundColor,
                    padding: type === 'submit' ? '5px 30px' : padding,
                    margin: margin,
                    color: color,
                    fontSize: fontSize,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#FF5722',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                        transition: 'all 0.2s ease',
                    },
                }}
                onClick={onClick}
                type={type}
                disabled={disabled}
                {...props}
            >
                {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
                {text || children}
            </MuiButton>
        </Box>
    );
};

export default CustomButton;
