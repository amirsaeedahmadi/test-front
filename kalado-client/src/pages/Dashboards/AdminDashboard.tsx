import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress } from '@mui/material';
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
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserDataList = async () => {
        setIsLoading(true);
        const response = await getAllUsers();
        if (response.isSuccess) {
            setUserDataList(response.data as TUserProfileResponse[]);
        } else {
            toast(t('error.user_management.retrieve_failed'));
        }
        setIsLoading(false);
    };

    const fetchUserReportList = async () => {
        setIsLoading(true);
        const response = await getAllReports();
        if (response.isSuccess) {
            setUserReportList(response.data as TReportResponseType[]);
        } else {
            toast(t('error.report_history.retrieve_failed'));
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (selectedMenuTitle === admin_dashboard_menu[0].value) {
            fetchUserDataList();
        } else if (selectedMenuTitle === admin_dashboard_menu[1].value) {
            fetchUserReportList();
        }
    }, [selectedMenuTitle]);

    const renderContent = () => {
        switch (selectedMenuTitle) {
            case admin_dashboard_menu[0].value:
                return <UserManagement userDataList={userDataList} />;
            case admin_dashboard_menu[1].value:
                return <ReportHistory reportsList={userReportList} />;
            default:
                return null;
        }
    };

    const renderLoadingState = () => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <CircularProgress />
        </Box>
    );

    return (
        <Box>
            <NavBar />

            <SideBar>
                <IconList
                    categories={admin_dashboard_menu}
                    onSelectCategory={(menuTitle: string) => setSelectedMenuTitle(menuTitle)}
                    selectedCategory={selectedMenuTitle}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {isLoading ? renderLoadingState() : renderContent()}
            </Box>
        </Box>
    );
};

export default AdminDashboard;
