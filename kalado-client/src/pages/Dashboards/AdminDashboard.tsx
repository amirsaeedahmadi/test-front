import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { SideBar } from '../../components/molecules';
import { SideBarMenu, ProfileManagement, UserManagement, ReportHistory, NavBar } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';


const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { admin_dashboard_menu } = OptionsComponent();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.admin.menu.one"));

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
    };

    const renderContent = () => {
        switch (selectedMenuTitle) {
            case t("dashboard.admin.menu.one"):
                return <ProfileManagement />;
            case t("dashboard.admin.menu.two"):
                return <UserManagement />;
            case t("dashboard.admin.menu.three"):
                return <ReportHistory />;
        }
    };

    return (
        <Box>
            <NavBar />

            <SideBar>
                <SideBarMenu
                    categories={admin_dashboard_menu}
                    onSelectCategory={handleSelectMenu}
                    initialSelect={t("dashboard.admin.menu.one")}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>

        </Box>
    );
};

export default AdminDashboard;
