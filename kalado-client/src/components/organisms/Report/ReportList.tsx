import React from 'react';
import { Grid } from '@mui/material';
import ReportCard from './ReportCard';

const ReportList: React.FC = () => {
  const mockReports = [
    {
      violationType: 'Abusiveness',
      description: 'This user was abusive in comments.',
      reportUserId: 'user1@example.com',
      reportedContentId: 'content123',
      submissionDate: '2023-01-01T12:00:00Z',
      evidenceImages: ['https://via.placeholder.com/80', 'https://via.placeholder.com/80'],
    },
    {
      violationType: 'Inappropriate Content',
      description: 'This post contains offensive material.',
      reportUserId: 'user2@example.com',
      reportedContentId: 'content456',
      submissionDate: '2023-01-02T12:00:00Z',
      evidenceImages: ['https://via.placeholder.com/80'],
    },
  ];

  return (
    <Grid container spacing={2}>
      {mockReports.map((report, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <ReportCard {...report} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportList;