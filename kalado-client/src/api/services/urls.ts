import { SortOrder } from "../../constants/types";

export const BASE_URL = 'http://kaladoshop.com:8083/v1';

export const AUTH = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
    FORETPASSWORD: '/auth/forgot-password',
    RESETPASSWORD: '/auth/reset-password',
    CHANGEUSERTOADMIN: '/auth/roles',
};

export const USER = {
    GET: '/user',
    PUT: '/user',
    GET_PROFILE: '/user/profile',
    MODIFY_PROFILE: '/user/modifyProfile',
    BLOCK: '/user/user/block',
    ALL_USER: '/user/all'
};

export const PRODUCT = {
    CREATE: '/product',
    UPDATE: (productId: number) => `/product/${productId}`,
    DELETE: (productId: number) => `/product/delete/${productId}`,
    UPDATE_STATUS: (productId: number) => `/product/status/${productId}`,
    GET_BY_SELLER: '/product/seller',
    GET_BY_SELLER_ID: (sellerId: number) => `/product/seller/${sellerId}`,
    GET_BY_CATEGORY: (category: string) => `/product/category/${category}`,
    GET_SINGLE: (productId: number) => `/product/${productId}`,
};

export const SEARCH = {
    BY_KEYWORD: (keyword: string) => `/search/products?keyword=${encodeURIComponent(keyword)}`,
    BY_PRICE_RANGE: (minPrice: number, maxPrice: number) =>
        `/search/products?minPrice=${minPrice}&maxPrice=${maxPrice}`,
    BY_KEYWORD_SORTED: (keyword: string, sortBy: string, sortOrder: SortOrder) =>
        `/search/products?keyword=${encodeURIComponent(keyword)}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    FILTERED: (
        keyword: string | '',
        minPrice: number | 0,
        maxPrice: number | 0,
        timeFilter: string | null
    ) =>
        `/search/products?keyword=${encodeURIComponent(keyword)}&minPrice=${minPrice}&maxPrice=${maxPrice}&timeFilter=${timeFilter}`,
    PAGINATED: (page: number, size: number) => `/search/products?page=${page}&size=${size}`,
};

export const REPORT = {
    CREATE: '/reports',
    UPDATE_STATUS: (reportId: number) => `/reports/admin/status${reportId}`,
    GET_MY_REPORTS: `/reports/my-reports`,
    GET_ALL_REPORTS: `/reports/admin/all`,
    GET_REPORT_STATISTICS: (startDate: string, endDate: string) =>
        `/reports/admin/statistics?startDate=${startDate}&endDate=${endDate}`,
    GET_REPORT_TO_USER_ID: (userId: number) => `/reports/my-reports/${userId}`,
};