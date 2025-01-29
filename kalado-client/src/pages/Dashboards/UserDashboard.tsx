import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress } from '@mui/material';
import { IconList, SideBar } from '../../components/molecules';
import { ProfileManagement, AdManagement, NavBar, FormGroup } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { getProfile } from '../../api/services/UserService';
import { getSellersProducts } from '../../api/services/ProductService';
import { TProductResponseType, TUserProfileResponse } from '../../constants/apiTypes';
import { toast } from 'react-toastify';

const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user_dashboard_menu } = OptionsComponent();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(user_dashboard_menu[0].value);
    const [userData, setUserData] = useState<TUserProfileResponse | null>(null);
    const [userProduct, setUserProduct] = useState<TProductResponseType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        setIsLoading(true);
        const response = await getProfile();
        if (response.isSuccess) {
            setUserData(response.data as TUserProfileResponse);
        } else {
            toast(t('error.profile_management.retrieve_failed'));
        }
        setIsLoading(false);
    };

    const fetchUserProducts = async () => {
        setIsLoading(true);
        const response = await getSellersProducts();
        if (response.isSuccess) {
            setUserProduct(response.data as TProductResponseType[]);
        } else {
            toast(t('error.ad_management.retrieve_failed'));
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (selectedMenuTitle === user_dashboard_menu[0].value) {
            fetchUserData();
        } else if (selectedMenuTitle === user_dashboard_menu[1].value) {
            fetchUserProducts();
        }
    }, [selectedMenuTitle]);

    const renderContent = () => {
        switch (selectedMenuTitle) {
            case user_dashboard_menu[0].value:
                return <ProfileManagement userData={userData} />;
            case user_dashboard_menu[1].value:
                return <AdManagement adsList={userProduct} />;
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
                    categories={user_dashboard_menu}
                    onSelectCategory={(menuTitle: string) => setSelectedMenuTitle(menuTitle)}
                    selectedCategory={selectedMenuTitle}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {isLoading ? renderLoadingState() : renderContent()}
            </Box>

            <FormGroup />
        </Box>
    );
};

export default UserDashboard;
