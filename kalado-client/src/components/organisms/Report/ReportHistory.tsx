import React, { useState } from 'react';
import { Box, Typography, Grid, Card, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from 'react-i18next';
import ReportDetails from './ReportDetails';
import { TReportResponseType } from '../../../constants/apiTypes';

interface ReportHistoryProps {
    reportsList: TReportResponseType[] | null;
}

const ReportHistory: React.FC<ReportHistoryProps> = ({ reportsList }) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'fa';
    const [selectedReport, setSelectedReport] = useState<TReportResponseType | null>(null);

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

            {(reportsList && reportsList.length > 0) && (
                <Grid container spacing={3} justifyContent="center">
                    {reportsList.map((report) => (
                        <Grid item xs={12} sm={6} md={4} key={report.id}>
                            <Card
                                sx={{
                                    padding: '10px 10px',
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
                                    onClick={() => setSelectedReport(report)}
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
                    ))}
                </Grid>
            )}

            {
                (!reportsList || reportsList.length == 0) && (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4 }}>
                        {t('report.report_card.no_reports')}
                    </Typography>
                )
            }

            {selectedReport && (
                <ReportDetails
                    report={selectedReport}
                    onBackToList={() => setSelectedReport(null)}
                    onBlockContent={(contentId) => {
                        console.log('Block content with ID:', contentId);
                    }}
                />
            )}
        </Box>
    );
};

export default ReportHistory;
