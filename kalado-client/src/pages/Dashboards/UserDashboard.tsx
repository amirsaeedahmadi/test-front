import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { IconList, SideBar } from '../../components/molecules';
import { ProfileManagement, AdManagement, NavBar, FormGroup } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { useAuth } from '../../contexts';
import { getProfile } from '../../api/services/UserService';
import { getSellersProducts } from '../../api/services/ProductService';
import { TProductResponseType, TUserProfileResponse } from '../../constants/apiTypes';
import { toast } from 'react-toastify';

const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user_dashboard_menu } = OptionsComponent();
    const { token } = useAuth();
    const [userData, setUserData] = useState<TUserProfileResponse | null>(null);
    const [userProduct, setUserProduct] = useState<TProductResponseType[] | null>(null);
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(user_dashboard_menu[0].value);
    const [selectedAd, setSelectedAd] = useState<TProductResponseType | null>(null);

    const fetchUserData = async () => {
        const response = await getProfile();
        console.log(response);
        if (response.isSuccess) {
            setUserData(response.data as TUserProfileResponse);
        } else {
            toast(t('error.profile_management.retrieve_failed'));
        }
    };

    const fetchUserProducts = async () => {
        const response = await getSellersProducts(token);
        console.log(response);
        if (response.isSuccess) {
            setUserProduct(response.data as TProductResponseType[]);
        } else {
            toast(t('error.ad_management.retrieve_failed'));
        }
    };

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
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
                return (
                    <AdManagement
                        onEdit={(adData: TProductResponseType) => setSelectedAd(adData)}
                        selectedAd={selectedAd}
                        onCloseEdit={() => setSelectedAd(null)}
                        adsList={userProduct}
                    />
                );
        }
    };

    return (
        <Box>
            <NavBar />

            <SideBar>
                <IconList
                    categories={user_dashboard_menu}
                    onSelectCategory={handleSelectMenu}
                    selectedCategory={selectedMenuTitle}
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
