import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import logo from '../../../assets/images/logo.png';
import { useModalContext } from '../../../contexts';


const Logo: React.FC = () => {
    const { t } = useTranslation();
    const { handlePopState } = useModalContext();

    return (
        <Box
            component="img"
            src={logo}
            alt={t("brand_name")}
            sx={{
                height: 70,
                width: 'auto',
                marginBottom: '10px',
                cursor: 'pointer',
            }}
            onClick={handlePopState}
        />
    );
};

export default Logo;
