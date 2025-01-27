import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DateInputProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange, minDate, maxDate }) => {
    const { i18n } = useTranslation();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={value}
                onChange={onChange}
                minDate={minDate}
                maxDate={maxDate}
                slots={{
                    textField: (params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            margin="normal"
                            label={label}
                            sx={{
                                width: '70%',
                                '& .MuiInputLabel-root': {
                                    textAlign: i18n.language === 'fa' ? 'right' : 'left',
                                    width: '100%',
                                },
                            }}
                        />
                    ),
                }}
            />
        </LocalizationProvider>
    );
};

export default DateInput;
