import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { validateEmail } from '../../../validators/validateEmail';

interface EmailInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    disabled?: boolean;
    isValidatorActive?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
    placeholder,
    value,
    onChange,
    isRequired = true,
    disabled = false,
    isValidatorActive = false,
}) => {
    const { t, i18n } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.email');
    const [helperText, setHelperText] = useState<string>('');

    useEffect(() => {
        if (isValidatorActive) {
            const validationResult = validateEmail(value, t);
            setHelperText(validationResult.error);
        }
    }, [value, t]);

    return (
        <TextField
            type="email"
            name="email"
            placeholder={translatedPlaceholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            disabled={disabled}
            variant="standard"
            margin="normal"
            helperText={helperText}
            sx={{
                width: '70%',
                '& .MuiFormHelperText-root': {
                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                    color: '#D74101'
                }
            }}
        />
    );
};

export default EmailInput;
