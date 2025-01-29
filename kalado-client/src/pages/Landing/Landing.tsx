import React from 'react';
import { Box } from '@mui/material';
import { NavBar, LandingSideBar, ItemsHolder, FormGroup } from '../../components/organisms';

const Landing: React.FC = () => {
    return (
        <Box>
            <NavBar />

            <LandingSideBar />

            <ItemsHolder />

            <FormGroup />
        </Box>
    );
};

export default Landing;
