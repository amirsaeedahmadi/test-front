import React from 'react';
import { useTranslation } from 'react-i18next';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface YearInputProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

const YearInput: React.FC<YearInputProps> = ({ label, value, onChange, minDate, maxDate }) => {
    const { t, i18n } = useTranslation();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <DatePicker
                    label={label || t("create_ad.input.production_year")}
                    value={value}
                    onChange={onChange}
                    openTo="year"
                    views={['year']}
                    slotProps={{
                        textField: {
                            variant: 'standard',
                            margin: 'normal',
                        },
                    }}
                    sx={{
                        width: '70%',
                        '& .MuiInputLabel-root': {
                            textAlign: i18n.language === 'fa' ? 'right' : 'left',
                            width: '100%',
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default YearInput;
