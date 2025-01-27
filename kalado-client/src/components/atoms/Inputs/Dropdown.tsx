import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

interface Option {
    value: string;
    title: string;
    icon?: React.ReactNode;
}

interface DropdownProps {
    options: Option[];
    placeholder: string;
    onChange: (value: Option | null) => void;
    value: Option | null;
    isRequired?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder, onChange, value, isRequired = true }) => {
    const { t, i18n } = useTranslation();
    const translatedPlaceholder = placeholder || t('general_inputs.category');

    return (
        <Autocomplete
            disablePortal
            options={options}
            includeInputInList
            autoComplete
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={translatedPlaceholder}
                    variant="standard"
                    margin="normal"
                    required={isRequired}
                    sx={{
                        width: '70%',
                        '& .MuiInputLabel-root': {
                            textAlign: i18n.language === 'fa' ? 'right' : 'left',
                            width: '90%',
                        },
                    }}
                />
            )}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            noOptionsText={t("general_inputs.no_option")}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            value={value}
        />
    );
};

export default Dropdown;