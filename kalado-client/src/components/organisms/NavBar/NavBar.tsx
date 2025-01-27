import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box, IconButton, useTheme, Menu, MenuItem } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth, useThemeContext, useModalContext, useLanguageContext } from '../../../contexts';
import { OptionsComponent } from '../../../constants/options';
import { useProductContext } from '../../../contexts';

const NavBar: React.FC = () => {
  const { t } = useTranslation();
  const { token, role } = useAuth(); // Get user role
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { currentLanguage, toggleLanguage } = useLanguageContext();
  const { handleOpenLogin, handleOpenCreateAd, handleOpenProfilePage, handleLogoutClick, isInProfile } = useModalContext();
  const { searchProductsByKeyword } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const { search_options } = OptionsComponent();

  // Handle search submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchProductsByKeyword(searchQuery);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: { xs: '10px', sm: '15px', md: '30px' },
        paddingLeft: { xs: '20px', sm: '40px', md: '60px' },
        paddingRight: { xs: '20px', sm: '40px', md: '60px' }
      }}>
        <Logo />

        <SearchBar
          value={searchQuery}
          options={search_options}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', padding: '0px 40px' }}>
          <IconButton onClick={toggleLanguage} color="secondary">
            {currentLanguage === 'en' ? "Fa" : "En"}
          </IconButton>
          <IconButton onClick={toggleTheme} color="secondary">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {(token !== null) ? (
            isInProfile ? (
              <CustomButton text={t('navbar.logout')} onClick={handleLogoutClick} />
            ) : (
              <CustomButton text={t('navbar.profile')} onClick={handleOpenProfilePage} />
            )
          ) : (
            <CustomButton text={t('navbar.login/signup')} onClick={handleOpenLogin} />
          )}

          {role === 'USER' && (
            <CustomButton text={t('navbar.create_ad')} onClick={handleOpenCreateAd} />
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton onClick={handleOpenNavMenu} color="secondary">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ mt: '45px' }}
          >
            <MenuItem onClick={toggleLanguage}>{currentLanguage === 'en' ? "Fa" : "En"}</MenuItem>
            <MenuItem onClick={toggleTheme}>
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </MenuItem>
            {(token !== null) ? (
              isInProfile ? (
                <MenuItem onClick={handleLogoutClick}>{t('navbar.logout')}</MenuItem>
              ) : (
                <MenuItem onClick={handleOpenProfilePage}>{t('navbar.profile')}</MenuItem>
              )
            ) : (
              <MenuItem onClick={handleOpenLogin}>{t('navbar.login/signup')}</MenuItem>
            )}

            {role === 'USER' && (
              <MenuItem onClick={handleOpenCreateAd}>{t('navbar.create_ad')}</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
