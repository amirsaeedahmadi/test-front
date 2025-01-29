import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Avatar, IconButton } from '@mui/material';
import { CustomButton, NameInput, PhoneNumberInput, PasswordInput } from '../../atoms';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import defaultImage from '../../../assets/images/no-image.png';
import { modifyProfile } from '../../../api/services/UserService';
import { TUserProfileResponse } from '../../../constants/apiTypes';

interface ProfileManagementProps {
    userData: TUserProfileResponse | null;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ userData }) => {
    const { t } = useTranslation();
    const [modifiedUserData, setModifiedUserData] = useState<TUserProfileResponse | null>(userData);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setModifiedUserData(prevData => ({
            ...prevData!,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setModifiedUserData(prevData => ({
                ...prevData!,
                profileImage: file
            }));
        }
    };

    const handleSaveChanges = async () => {
        if (!modifiedUserData) return;

        console.log('Update Profile API call', modifiedUserData);
        const response = await modifyProfile(modifiedUserData);
        console.log(response);

        if (response.isSuccess) {
            toast(t('success.profile_management'));
        } else {
            toast(t('error.profile_management.save_failed'));
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '90px auto', padding: 3 }}>

            {!userData && (
                <p></p>
            )}

            {userData && (
                <>
                    <Box sx={{ position: 'relative', width: 100, height: 100, margin: '20px auto' }}>
                        <Avatar
                            src={userData.profileImageUrl ? userData.profileImageUrl : defaultImage}
                            sx={{ width: 100, height: 100 }}
                        />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <EditIcon />
                        </IconButton>
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </Box>
                    <NameInput
                        name="firstName"
                        value={userData.firstName || ''}
                        onChange={handleInputChange}
                    />
                    <NameInput
                        name="lastName"
                        placeholder={t('dashboard.user.profile_management.last_name')}
                        value={userData.lastName || ''}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        value={''}
                        placeholder={t('dashboard.user.profile_management.enter_new_password')}
                        onChange={handleInputChange}
                        isValidatorActive={true}
                    />
                    <PhoneNumberInput
                        value={userData.phoneNumber || ''}
                        onChange={handleInputChange}
                    />
                    <NameInput
                        name="address"
                        placeholder={t('dashboard.user.profile_management.address')}
                        value={userData.address || ''}
                        onChange={handleInputChange}
                    />
                    <CustomButton
                        text={t('dashboard.user.profile_management.save_changes_btn')}
                        onClick={handleSaveChanges}
                        type="submit"
                    />
                </>
            )}
        </Box>
    );
};

export default ProfileManagement;
