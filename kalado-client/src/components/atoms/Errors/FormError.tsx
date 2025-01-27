import React from 'react';
import { Typography } from '@mui/material';

interface FormErrorProps {
    message: string | null;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
    if (!message) return null;

    return (
        <Typography
            style={{ color: 'red', marginTop: '20px' }}
            variant="h6"
        >
            {message}
        </Typography>
    );
};

export default FormError;
