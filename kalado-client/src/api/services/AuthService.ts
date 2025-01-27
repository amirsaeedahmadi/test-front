import { sendRequest } from './axiosInstance'
import { AUTH } from './urls'
import { TLoginResponseType, UserData } from '../../constants/apiTypes';


export async function loginUser(email: string, password: string) {
    return sendRequest<TLoginResponseType>(
        AUTH.LOGIN,
        'POST',
        { email, password },
    );
}

export async function signupUser(userData: UserData) {
    return sendRequest(
        AUTH.REGISTER,
        'POST',
        userData,
    );
}

export async function verifyCode(code: string) {
    return sendRequest(
        `${AUTH.VERIFY}?token=${code}`,
        'POST'
    );
}

export async function resetPassword(email: string) {
    return sendRequest(
        AUTH.RESETPASSWORD,
        'POST',
        email,
    );
}