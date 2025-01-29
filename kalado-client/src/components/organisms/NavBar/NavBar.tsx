import React, { useState } from 'react';
import { AppBar, Toolbar, useTheme, Box } from '@mui/material';
import { Logo } from '../../atoms';
import { NavBarButtons, SearchBar } from '../../molecules';
import { OptionsComponent } from '../../../constants/options';
import { useProductContext } from '../../../contexts';

const NavBar: React.FC = () => {
  const theme = useTheme();
  const { searchProductsByKeyword } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchProductsByKeyword(searchQuery);
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
          options={OptionsComponent().search_options}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        {/* Desktop View */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <NavBarButtons />
        </Box>
      </Toolbar>

      {/* Mobile View */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', bottom: 0, padding: '0px 200px' }}>
        <NavBarButtons />
      </Box>
    </AppBar>
  );
};

export default NavBar;
