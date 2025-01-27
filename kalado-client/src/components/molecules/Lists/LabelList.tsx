import React from 'react';
import { Box, Typography } from '@mui/material';

interface LabelListProps {
    items: { title: string; value: string }[];
    selectedValue: string | null;
    onSelect: (value: string | '') => void;
    title?: string;
}

const LabelList: React.FC<LabelListProps> = ({ items, selectedValue, onSelect, title }) => {
    return (
        <Box>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                {items.map((item) => (
                    <Typography
                        key={item.value}
                        onClick={() => onSelect(selectedValue === item.value ? '' : item.value)}
                        sx={{
                            cursor: 'pointer',
                            backgroundColor: selectedValue === item.value ? '#D74101' : 'transparent',
                            padding: '5px 10px',
                            borderRadius: '15px',
                            border: '1px solid',
                            textAlign: 'center',
                            flexGrow: 1,
                            marginRight: '5px',
                        }}
                    >
                        {item.title}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default LabelList;
