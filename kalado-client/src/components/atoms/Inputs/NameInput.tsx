import React from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';

interface NameInputProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    isStarNeeded?: boolean;
}

const NameInput: React.FC<NameInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    isRequired = false,
    isStarNeeded = false
}) => {
    const { t } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.first_name');

    return (
        <TextField
            type="text"
            name={name}
            placeholder={isStarNeeded ? `${translatedPlaceholder} *` : translatedPlaceholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            sx={{
                width: '70%'
            }}
        />
    );
};

export default NameInput;
