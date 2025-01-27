import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';


interface ProductListBoxProps {
    children: React.ReactNode;
}

const ProductListBox: React.FC<ProductListBoxProps> = ({ children }) => {
    const { i18n } = useTranslation();

    return (
        <Box
            sx={{
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                paddingTop: '200px',
                paddingRight: i18n.language === 'en' ? '0px' : '150px',
                paddingLeft: i18n.language === 'en' ? '150px' : '0px',
            }}
        >
            {children}
        </Box>
    );
};

export default ProductListBox;
