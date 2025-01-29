import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from './urls';


interface ErrorMessages {
    [key: number]: string;
    default: string;
}

const ERROR_MESSAGES: ErrorMessages = {
    400: "لطفا ورودی‌های خود را چک بفرمایید.",
    401: "چنین کاربری در سیستم وجود ندارد.",
    403: "دسترسی رد شد.",
    404: "منبع مورد نظر پیدا نشد.",
    409: "این ایمیل در سیستم ثبت‌نام شده است.",
    500: "خطای سیستمی رخ داده، لطفا دوباره امتحان نمایید.",
    default: "خطای سیستمی رخ داده، لطفا دوباره امتحان نمایید."
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     'Content-Type': 'application/json'
    // }
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `${token}`;
        }
        console.log(config);
        return config;
    },
    (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Response: ', response);
        return { ...response, isSuccess: true };
    },
    (error: any) => {
        const status: number = error.response?.status;
        const errorMessage: string = ERROR_MESSAGES[status] || ERROR_MESSAGES.default;
        console.log('Response interceptor');
        console.log(status);
        console.log(errorMessage);
        return Promise.reject({ message: errorMessage, status, isSuccess: false });
    }
);

interface RequestConfig extends AxiosRequestConfig {
    method: string;
    url: string;
}

interface ApiResponse<T> {
    data: T;
    isSuccess: boolean;
    message?: string;
    status?: number;
}

export const sendRequest = async <T>(
    url: string,
    method: string,
    data: any = null,
    config: Partial<RequestConfig> = {},
    contentType?: string
): Promise<ApiResponse<T>> => {
    try {
        console.log('Sending request: ', url, method, data);

        // Only include Content-Type in headers if it's explicitly provided
        const headers = {
            ...config.headers,
            ...(contentType ? { 'Content-Type': contentType } : {})
        };

        const response: AxiosResponse<T> & { isSuccess: boolean } = await axiosInstance({
            method,
            url,
            data,
            ...config,
            headers
        });

        return {
            data: response.data,
            isSuccess: true
        };
    } catch (error: any) {
        return {
            data: null as T,
            isSuccess: false,
            message: error.message,
            status: error.status
        };
    }
};

