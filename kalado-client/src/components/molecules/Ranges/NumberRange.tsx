import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { NumberInput } from '../../atoms';

interface NumberRangeProps {
    minName: string;
    maxName: string;
    minPlaceholder: string;
    maxPlaceholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberRange: React.FC<NumberRangeProps> = ({
    minName,
    maxName,
    minPlaceholder,
    maxPlaceholder,
    onChange
}) => {
    const { t } = useTranslation();

    return (
        <Box>
            <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
                {t("filter.price")}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <NumberInput
                    name={minName}
                    placeholder={minPlaceholder}
                    onChange={onChange}
                />
                <NumberInput
                    name={maxName}
                    placeholder={maxPlaceholder}
                    onChange={onChange}
                />
            </Box>
        </Box>
    );
};

export default NumberRange;
