import React from 'react';
import { Box, FormControlLabel, Checkbox } from '@mui/material';

interface CustomCheckBoxProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    id?: string;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
    label,
    checked,
    onChange,
    name,
    id
}) => {
    return (
        <Box>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        name={name}
                        id={id}
                    />
                }
                label={label}
            />
        </Box>
    );
};

export default CustomCheckBox;
