import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { IconList, SideBar } from '../../components/molecules';
import { UserManagement, ReportHistory, NavBar } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { getAllUsers } from '../../api/services/UserService';
import { getAllReports } from '../../api/services/ReportService';
import { TUserProfileResponse, TReportResponseType } from '../../constants/apiTypes';
import { toast } from 'react-toastify';


const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { admin_dashboard_menu } = OptionsComponent();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(admin_dashboard_menu[0].value);
    const [userDataList, setUserDataList] = useState<TUserProfileResponse[] | null>(null);
    const [userReportList, setUserReportList] = useState<TReportResponseType[] | null>(null);

    const fetchUserDataList = async () => {
        const response = await getAllUsers();
        console.log("fetchUserDataList");
        console.log(response);
        if (response.isSuccess) {
            setUserDataList(response.data as TUserProfileResponse[]);
        } else {
            toast(t('error.user_management.retrieve_failed'));
        }
    };

    const fetchUserReportList = async () => {
        const response = await getAllReports();
        console.log("fetchUserReportList");
        console.log(response);
        if (response.isSuccess) {
            setUserReportList(response.data as TReportResponseType[]);
        } else {
            toast(t('error.report_history.retrieve_failed'));
        }
    };

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
    };

    useEffect(() => {
        if (selectedMenuTitle === admin_dashboard_menu[0].value) {
            fetchUserDataList();
        } else if (selectedMenuTitle === admin_dashboard_menu[1].value) {
            fetchUserReportList();
        }
    }, [selectedMenuTitle]);

    const renderContent = () => {
        console.log("UUUUUUUUUUUU");
        switch (selectedMenuTitle) {
            case admin_dashboard_menu[0].value:
                return <UserManagement userDataList={userDataList} />;
            case admin_dashboard_menu[1].value:
                return <ReportHistory reportsList={userReportList} />;
        }
    };

    return (
        <Box>
            <NavBar />

            <SideBar>
                <IconList
                    categories={admin_dashboard_menu}
                    onSelectCategory={handleSelectMenu}
                    selectedCategory={selectedMenuTitle}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default AdminDashboard;
