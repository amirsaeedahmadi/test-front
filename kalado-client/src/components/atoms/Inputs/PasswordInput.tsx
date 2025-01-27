import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validatePassword } from '../../../validators/validatePassword';

interface PasswordInputProps {
    name?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    isValidatorActive?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    isRequired = true,
    isValidatorActive = false,
}) => {
    const { t, i18n } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.password');
    const [helperText, setHelperText] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (isValidatorActive) {
            const validationResult = validatePassword(value, t);
            setHelperText(validationResult.error);
        }
    }, [value, t]);

    const handleToggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    return (
        <TextField
            type={isVisible ? 'text' : 'password'}
            name={name ? name : 'password'}
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
                }
            }}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleToggleVisibility}
                                edge="end"
                            >
                                {isVisible ? <FaEyeSlash /> : <FaEye />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default PasswordInput;
