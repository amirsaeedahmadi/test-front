import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from 'react-i18next';
import ReportDetails from './ReportDetails';
import { TReportResponseType } from '../../../utils/apiTypes';
import { getAllReports } from '../../../api/services/ReportService';
import { useAuth } from '../../../contexts';
import { FormError } from '../../atoms';

const ReportHistory: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'fa';
    const [selectedReport, setSelectedReport] = useState<TReportResponseType | null>(null);
    const [reports, setReports] = useState<TReportResponseType[]>([]);
    const [error, setError] = useState<string>('');
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            fetchReports();
        }
    }, [token]);

    const fetchReports = async () => {
        try {
            const response = await getAllReports(token);
            if (response.isSuccess && response.data) {
                setReports(response.data);
            } else {
                setError(t('error.report_history.retrieve_failed'));
            }
        } catch {
            setError(t('error.report_history.retrieve_failed'));
        }
    };

    const handleShowDetails = (report: TReportResponseType) => {
        setSelectedReport(report);
    };

    const handleBackToList = () => {
        setSelectedReport(null);
    };

    return (
        <Box
            sx={{
                padding: 20,
                maxWidth: '50vw',
                margin: '0 auto',
                direction: isRtl ? 'rtl' : 'ltr',
                textAlign: isRtl ? 'right' : 'left',
            }}
        >
            {error && <FormError message={error} />}

            {!selectedReport ? (
                <>
                    <Typography
                        variant="h4"
                        sx={{
                            marginBottom: 4,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        {t('report.report_card.history_title')}
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <Grid item xs={12} sm={6} md={4} key={report.id}>
                                    <Card
                                        sx={{
                                            padding: 2,
                                            boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                                            borderRadius: '15px',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ marginBottom: 1 }}>
                                            {t('report.report_card.violation_type')}: {report.violationType}
                                        </Typography>
                                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                            {t('report.report_card.reporter_id')}: {report.reporterId}
                                        </Typography>
                                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                            {t('report.report_card.content_id')}: {report.reportedContentId}
                                        </Typography>
                                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                            {t('general_inputs.date')}: {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
                                                new Date(
                                                    report.createdAt[0], // Year
                                                    report.createdAt[1] - 1, // Month (0-based index)
                                                    report.createdAt[2] // Day
                                                )
                                            )}
                                        </Typography>
                                        <Button
                                            variant="text"
                                            onClick={() => handleShowDetails(report)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginTop: 2,
                                                textTransform: 'none',
                                                justifyContent: isRtl ? 'flex-end' : 'flex-start',
                                            }}
                                        >
                                            <InfoOutlinedIcon sx={{ marginRight: isRtl ? 0 : 1, marginLeft: isRtl ? 1 : 0 }} />
                                            {t('report.report_card.actions.show_details')}
                                        </Button>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4 }}>
                                {t('report.report_card.no_reports')}
                            </Typography>
                        )}
                    </Grid>
                </>
            ) : (
                <ReportDetails
                    report={{
                        violationType: selectedReport.violationType,
                        description: selectedReport.description,
                        image: selectedReport.evidenceFiles,
                        contentId: selectedReport.reportedContentId,
                    }}
                    onBackToList={handleBackToList}
                    onBlockContent={(contentId) => {
                        console.log('Block content with ID:', contentId);
                    }}
                />
            )}
        </Box>
    );
};

export default ReportHistory;
