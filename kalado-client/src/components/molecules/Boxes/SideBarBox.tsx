import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SideBarBoxProps {
    children: React.ReactNode;
}

const SideBarBox: React.FC<SideBarBoxProps> = ({ children }) => {
    const { i18n } = useTranslation();

    return (
        <Box
            sx={{
                width: { xs: '100%', sm: '300px', md: i18n.language === 'en' ? '400px' : '350px' },
                padding: 2,
                height: '100vh',
                position: 'fixed',
                overflowY: 'auto',
                top: '150px',
                left: { xs: '0', md: i18n.language === 'en' ? '30px' : 'unset' },
                right: { xs: '0', md: i18n.language === 'fa' ? '30px' : 'unset' },
                p: 2,
            }}
        >
            {children}
        </Box>
    );
};

export default SideBarBox;
