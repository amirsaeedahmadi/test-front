import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, TextField } from '@mui/material';

interface DescriptionInputProps {
    name?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isRequired?: boolean;
    isStarNeeded?: boolean;
    maxLength?: number;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
    value,
    onChange,
    placeholder,
    isRequired = false,
    isStarNeeded = false,
    maxLength = 500
}) => {
    const { t, i18n } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.description');
    const [charCount, setCharCount] = useState(value.length);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setCharCount(newValue.length);
        onChange(newValue);
    };

    return (
        <Box style={{ marginBottom: '20px' }}>
            <TextField
                name="description"
                value={value}
                onChange={handleChange}
                placeholder={isStarNeeded ? `* ${translatedPlaceholder}` : translatedPlaceholder}
                required={isRequired}
                multiline
                rows={4}
                variant="outlined"
                sx={{
                    width: '70%',
                }}
            />
            <div style={{
                textAlign: i18n.language === 'fa' ? 'right' : 'left',
                marginRight: i18n.language === 'fa' ? '90px' : '0px',
                marginLeft: i18n.language === 'fa' ? '0px' : '90px',
            }}>
                {charCount}/{maxLength}
            </div>
        </Box>
    );
};

export default DescriptionInput;
