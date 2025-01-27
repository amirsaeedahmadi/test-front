import React from 'react';
import { Card, Typography, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ReportCardProps = {
  violationType: string;
  reportUserId: string;
  reportedContentId: string;
  submissionDate: string;
  evidenceImages: string[];
};

const ReportCard: React.FC<ReportCardProps> = ({
  violationType,
  reportUserId,
  reportedContentId,
  submissionDate,
  evidenceImages,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: 2,
        maxWidth: '100%',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          {t('report.report_card.violation_type')}: {violationType}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t('report.report_card.reporter_id')}: {reportUserId}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t('report.report_card.content_id')}: {reportedContentId}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t('general_inputs.date')}: {new Date(submissionDate).toLocaleDateString()}
        </Typography>

        <Box sx={{ marginTop: 2, textAlign: 'right' }}>
          <Button variant="outlined" size="small">
            {t('item_details.report_submission_btn')}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ReportCard;