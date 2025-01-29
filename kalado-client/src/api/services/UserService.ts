import { sendRequest } from './axiosInstance';
import { USER } from './urls';
import { ProfileData, TUserProfileResponse } from '../../constants/apiTypes';


export async function getProfile() {
    return sendRequest<TUserProfileResponse>(
        USER.GET_PROFILE,
        'GET',
        undefined,
        {}
    );
}

// export async function modifyProfile(profileData: ProfileData) {
//     return sendRequest(
//         USER.MODIFY_PROFILE,
//         'POST',
//         profileData,
//         {},
//         'multipart/form-data'
//     );
// }

export async function modifyProfile(profileData: ProfileData, imageFile: File) {
    const formData = new FormData();
    formData.append('profile', JSON.stringify(profileData));

    // imageFiles.forEach((file, index) => {
    //     formData.append(`profileImage[${index}]`, file);
    // });
    formData.append(`profileImage`, imageFile);

    return sendRequest<TUserProfileResponse>(
        USER.MODIFY_PROFILE,
        'POST',
        formData,
        {},
        'multipart/form-data'
    );
}

export async function getAllUsers() {
    return sendRequest<TUserProfileResponse[]>(
        USER.ALL_USER,
        'GET',
        undefined,
        {}
    );
}

