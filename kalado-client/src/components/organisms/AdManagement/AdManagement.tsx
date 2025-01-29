import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Typography } from '@mui/material';
import AdCard from './AdCard';
import { TProductResponseType } from '../../../constants/apiTypes';

interface AdManagementProps {
  adsList: TProductResponseType[] | null;
}

const AdManagement: React.FC<AdManagementProps> = ({ adsList }) => {
  const { t } = useTranslation();
  const [ads] = useState<TProductResponseType[] | null>(adsList);

  return (
    <Box sx={{ padding: 15 }}>
      {(!ads || ads.length == 0) ? (
        <Typography color="error" align="center">
          {t('error.profile_management.save_failed')}
        </Typography>
      ) : (
        <Box sx={{ marginBottom: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {ads && ads.map((ad) => (
              <AdCard ad={ad} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdManagement;