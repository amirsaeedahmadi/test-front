import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton } from '@mui/material';
import { CustomButton } from '../../atoms';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth, useThemeContext, useModalContext, useLanguageContext } from '../../../contexts';

const NavBarButtons: React.FC = () => {
    const { t } = useTranslation();
    const { token, role } = useAuth();
    const { isDarkMode, toggleTheme } = useThemeContext();
    const { currentLanguage, toggleLanguage } = useLanguageContext();
    const { handleOpenLogin, handleOpenCreateAd, handleOpenProfilePage, handleLogoutClick, isInProfile } = useModalContext();

    const renderAuthButtons = () => {
        if (token !== null) {
            return (
                <>
                    {isInProfile ? (
                        <CustomButton text={t('navbar.logout')} onClick={handleLogoutClick} />
                    ) : (
                        <CustomButton text={t('navbar.profile')} onClick={handleOpenProfilePage} />
                    )}
                    {role === 'USER' && (
                        <CustomButton text={t('navbar.create_ad')} onClick={handleOpenCreateAd} />
                    )}
                </>
            );
        } else {
            return (
                <>
                    <CustomButton text={t('navbar.login/signup')} onClick={handleOpenLogin} />
                    {role === 'USER' && (
                        <CustomButton text={t('navbar.create_ad')} onClick={handleOpenCreateAd} />
                    )}
                </>
            );
        }
    };

    const renderToggleButtons = () => (
        <>
            <IconButton onClick={toggleLanguage} color="secondary">
                {currentLanguage === 'en' ? "Fa" : "En"}
            </IconButton>
            <IconButton onClick={toggleTheme} color="secondary">
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </>
    );

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {renderToggleButtons()}
            {renderAuthButtons()}
        </Box>
    );
};

export default NavBarButtons;
