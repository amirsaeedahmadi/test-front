import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface Price {
    amount: number;
    unit: string;
}

interface PriceInputProps {
    name?: string;
    placeholder?: string;
    value: Price;
    onChange: (value: Price) => void;
    isRequired?: boolean;
    isStarNeeded?: boolean;
}

const PriceInput: React.FC<PriceInputProps> = ({
    placeholder,
    value,
    onChange,
    isRequired = false,
    isStarNeeded = false,
}) => {
    const { t } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.price');
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setInputValue(value.amount ? value.amount.toString() : '');
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        setInputValue(rawValue);
        const numericValue = parseInt(rawValue, 10);
        onChange({ amount: isNaN(numericValue) ? 0 : numericValue, unit: value.unit });
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ amount: value.amount, unit: e.target.value });
    };

    return (
        <TextField
            type="text"
            name="price"
            placeholder={isStarNeeded ? `${translatedPlaceholder} *` : translatedPlaceholder}
            value={inputValue}
            onChange={handleInputChange}
            required={isRequired}
            variant="standard"
            margin="normal"
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            {t('currency')}
                        </InputAdornment >
                        // <InputAdornment position="end">
                        //     <select value={value.unit} onChange={handleUnitChange}>
                        //         <option value="Toman">Toman</option>
                        //         <option value="Dollar">Dollar</option>
                        //     </select>
                        // </InputAdornment>
                    ),
                    inputMode: 'numeric',
                },
            }}
            sx={{ width: '70%' }}
        />
    );
};

export default PriceInput;
