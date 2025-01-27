import React from 'react';
import TextField from '@mui/material/TextField';

interface NameInputProps {
    name: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<NameInputProps> = ({
    name,
    placeholder,
    onChange,
}) => {
    return (
        <TextField
            type="number"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, mr: 1 }}
        />
    );
};

export default NameInput;
