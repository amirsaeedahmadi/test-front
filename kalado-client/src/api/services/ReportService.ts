import { sendRequest } from './axiosInstance';
import { REPORT } from './urls';
import {
    ReportData,
    ReportStatusUpdateData,
    ReportResponse,
    SingleReport,
    ReportListResponse,
    TReportResponseType,
} from '../../constants/apiTypes';


export async function createReportWithImages(reportData: ReportData, imageFiles: File[], token: string | null) {
    console.log('**************************** createReportWithImages called');
    console.log('**************************** reportData:', reportData);
    console.log('**************************** imageFiles:', imageFiles);

    console.log('****************************token retrieved from useAuth:', token);
    if (token == null) {
        throw new Error('user is not authenticated');
    }

    const formData = new FormData();
    console.log('**************************** formData: ', formData);
    formData.append('report', JSON.stringify(reportData));

    imageFiles.forEach((file, index) => {
        formData.append(`evidence[${index}]`, file);
    });

    console.log('**************************** formData before submission:');
    for (let i of formData.entries()) {
        console.log(i[0], i[1]);
    }

    try {
        const response = await sendRequest<TReportResponseType>(
            REPORT.CREATE,
            'POST',
            formData,
            {},
            'multipart/form-data'
        );
        console.log('****************************  api response:', response);
        return response;
    } catch (error) {
        console.error('****************************  error in createReportWithImages:', error);
        throw error;
    }
}


export async function updateReportStatus(reportId: number, reportStatusData: ReportStatusUpdateData) {
    return sendRequest<TReportResponseType>(
        REPORT.UPDATE_STATUS(reportId),
        'POST',
        reportStatusData,
        {},
        'application/json'
    );
}


export async function getAllReports() {
    return sendRequest<TReportResponseType[]>(
        REPORT.GET_ALL_REPORTS,
        'GET',        
        undefined,
        {},
        'application/json'
    );
}


export async function getMyReports() {
    return sendRequest<TReportResponseType[]>(
        REPORT.GET_MY_REPORTS,
        'GET',
    );
}

export async function getReportsToUserId(userId: number) {
    return sendRequest<TReportResponseType[]>(
        REPORT.GET_REPORT_TO_USER_ID(userId),
        'GET',
    );
}


// fetch report statistics for a date range
export async function getReportStatistics(startDate: string, endData: string) {
    return sendRequest<TReportResponseType[]>(
        REPORT.GET_REPORT_STATISTICS(startDate, endData),
        'GET',
        undefined,
        {},
        'application/json'
    );
}