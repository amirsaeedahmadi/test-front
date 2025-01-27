import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { SideBar } from '../../components/molecules';
import { SideBarMenu, ProfileManagement, AdManagement, NavBar, FormGroup } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { useProductContext } from '../../contexts/ProductContext';


const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user_dashboard_menu } = OptionsComponent();
    // const { products, loading, error } = useProductContext();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.user.menu.one"));

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
    };

    const renderContent = () => {
        switch (selectedMenuTitle) {
            case t("dashboard.user.menu.one"):
                return <ProfileManagement />;
            // case t("dashboard.user.menu.two"):
            //     return <AdManagement
            //         ads={products}
            //         onEdit={ }
            //         selectedAd={ }
            //         onCloseEdit={ }
            //     />;
        }
    };

    return (
        <Box>
            <NavBar />

            <SideBar>
                <SideBarMenu
                    categories={user_dashboard_menu}
                    onSelectCategory={handleSelectMenu}
                    initialSelect={t("dashboard.user.menu.one")}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>

            <FormGroup />
        </Box>
    );
};

export default UserDashboard;