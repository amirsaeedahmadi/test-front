import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

interface IconListProps {
    categories: {
        value: string;
        title: string;
        icon: React.ReactNode;
    }[];
    onSelectCategory: (title: string) => void;
    selectedCategory: string;
    title?: string;
}

const IconList: React.FC<IconListProps> = ({ categories, onSelectCategory, selectedCategory, title }) => {
    const { i18n } = useTranslation();

    const handleCategoryClick = (categoryTitle: string) => {
        onSelectCategory(categoryTitle);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                {title}
            </Typography>
            <List>
                {categories.map((item) => (
                    <ListItemButton
                        key={item.title}
                        onClick={() => handleCategoryClick(item.value)}
                        sx={{
                            backgroundColor: 'transparent',
                            color: selectedCategory === item.value ? '#D74101' : 'inherit',
                            '& .MuiListItemIcon-root': {
                                color: selectedCategory === item.value ? '#D74101' : 'inherit',
                            },
                            '&:hover': {
                                color: '#D74101',
                                transform: i18n.language === 'fa' ? 'translateX(-30px)' : 'translateX(30px)',
                                '& .MuiListItemIcon-root': {
                                    color: '#D74101',
                                },
                            },
                            cursor: 'pointer',
                            textAlign: i18n.language === 'fa' ? 'right' : 'left',
                            transition: 'color 0.5s ease, transform 0.5s ease',
                        }}
                    >
                        <ListItemIcon>
                            {React.cloneElement(item.icon as React.ReactElement<any>)}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default IconList;
