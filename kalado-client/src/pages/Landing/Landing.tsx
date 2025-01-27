import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton } from '@mui/material';
import { SideBar } from '../../components/molecules';
import { NavBar, SideBarMenu, Filter, FormGroup, ItemsHolder } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { useProductContext } from '../../contexts';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';


const Landing: React.FC = () => {
    const { t } = useTranslation();
    const { product_categories } = OptionsComponent();
    const [selectedCategory, setSelectedCategory] = useState({
        value: product_categories[0].value,
        title: product_categories[0].title
    });

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleSelectCategory = (categoryValue: string) => {
        const selected = product_categories.find(cat => cat.value === categoryValue);
        if (selected) {
            setSelectedCategory({ value: selected.value, title: selected.title });
        }
    }

    const { fetchProductsByCategory } = useProductContext();
    useEffect(() => {
        fetchProductsByCategory(selectedCategory.value);
    }, [selectedCategory]);

    return (
        <Box>
            <NavBar />

            {/* Hamburger Menu Icon for Mobile */}
            <IconButton
                sx={{ display: { xs: 'block', md: 'none', marginTop: '100px' } }}
                onClick={() => setDrawerOpen(true)}
            >
                <MenuIcon />
            </IconButton>

            {/* Sidebar for Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <SideBar>
                    <SideBarMenu
                        categories={product_categories}
                        onSelectCategory={handleSelectCategory}
                        title={t("category.title")}
                        initialSelect={product_categories[0].title}
                    />
                    <Filter />
                </SideBar>
            </Box>

            {/* Drawer for Mobile */}
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ zIndex: 1200, top: 200 }} // Ensure it's below the AppBar
            >
                <Box sx={{ width: '100%', paddingTop: '64px' }}> {/* Adjust padding to match NavBar height */}
                    <SideBarMenu
                        categories={product_categories}
                        onSelectCategory={handleSelectCategory}
                        title={t("category.title")}
                        initialSelect={product_categories[0].title}
                    />
                    <Filter />
                </Box>
            </Drawer>

            <ItemsHolder selectedCategoryTitle={selectedCategory.title} />

            <FormGroup />
        </Box>
    );
};

export default Landing;
