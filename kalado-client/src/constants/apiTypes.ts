import { ReportStatus, User, UserType, ViolationType } from './types'


// Login
export interface LoginRequest {
    email: string;
    password: string;
}

export type TLoginResponseType = {
    token: string
    role: UserType
}

// Register
export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
}

export interface RegisterResponse {
    success: boolean;
    message?: string;
}

// Code Verify
export interface CodeVerifyRequest {
    token: string;
}

export interface CodeVerifyResponse {
    success: boolean;
    message?: string;
}

export interface ReportResponse {
    isSuccess: boolean;
    message?: string;
}

export interface SingleReport {
    id: number;
    violationType: string;
    description: string;
    createdAt: string;
    reporterId: number;
    contentId: number;
}

export interface ReportListResponse {
    isSuccess: boolean;
    message?: string;
    data: SingleReport[] | null;
}


// Product
export interface ProductData {
    title: string;
    description: string;
    price: {
        amount: number;
        unit: string;
    };
    category: string;
    images?: File[] | null;
    productionYear?: Date | null;
    brand?: string | null;
    // sellerId: number;
}

export type TProductResponseType = {
    id: number;
    title: string;
    createdAt: string;
    imageUrls?: string[];
    price: {
        amount: number,
        unit: string,
    },
    description?: string;
    sellerPhoneNumber: string;
    sellerId: number;
    brand?: string;
    productionYear?: string;
    status: string;
};


// Report
export interface ReportData {
    violationType: string;
    description: string;
    // reportedUserId?: number;
    reportedContentId?: number;
}

export interface ReportStatusUpdateData {
    status: string;
    adminNotes: string;
    blockUser: boolean;
    blockReason: string | null;
    blockProduct: boolean;
}

export interface TReportResponseType {
    id: number;
    violationType: ViolationType;
    description: string;
    reporterId: number;
    reportedContentId: number;
    evidenceFiles: string[]; // Array of file Image URLs
    createdAt: [number, number, number, number, number, number, number]; // Tuple for date 
    status: ReportStatus;
    adminNotes: string | null;
    lastUpdatedAt: [number, number, number, number, number, number, number]; // Tuple for date 
    adminId: number | null;
    userBlocked: boolean;
}

// User
export interface ProfileData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
}

export type TUserProfileResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string | null;
    phoneNumber: string;
};

// Search
export type PageableResponseType<T> = {
    content: T[];
    pageable: {
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        unpaged: boolean;
        paged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
};
