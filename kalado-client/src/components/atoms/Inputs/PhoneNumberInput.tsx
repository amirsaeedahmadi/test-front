import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { validatePhoneNumber } from '../../../validators/validatePhoneNumber';

interface PhoneNumberInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    isValidatorActive?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    placeholder,
    value,
    onChange,
    isRequired = true,
    isValidatorActive = true
}) => {
    const { t, i18n } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.phone_number');
    const [helperText, setHelperText] = useState<string>('');

    useEffect(() => {
        if (isValidatorActive) {
            const validationResult = validatePhoneNumber(value, t);
            setHelperText(validationResult.error);
        }
    }, [value, t]);

    return (
        <TextField
            type="tel"
            name="phoneNumber"
            placeholder={translatedPlaceholder}
            value={value}
            onChange={onChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            helperText={helperText}
            sx={{
                width: '70%',
                '& .MuiFormHelperText-root': {
                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                    color: '#D74101'
                },
                '& input': {
                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                }
            }}
        />
    );
};

export default PhoneNumberInput;
