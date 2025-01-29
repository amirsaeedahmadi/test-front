import { sendRequest } from './axiosInstance';
import { REPORT } from './urls';
import { ReportData, ReportStatusUpdateData, TReportResponseType } from '../../constants/apiTypes';


export async function createReportWithImages(reportData: ReportData, imageFiles: File[]) {
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

    return sendRequest<TReportResponseType>(
        REPORT.CREATE,
        'POST',
        formData,
        {},
        'multipart/form-data'
    );
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