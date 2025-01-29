import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Box, Typography, Card, IconButton, MenuItem, Select, Tooltip } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { ConfirmationDialog } from '../../../components/molecules';
import EditAdCard from './EditAdCard';
import { TProductResponseType } from '../../../constants/apiTypes';
import { updateAdStatus, deleteAd } from '../../../api/services/ProductService';
import { toast } from 'react-toastify';

interface AdCardProps {
  ad: TProductResponseType;
};

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditingModeActive, setIsEditingModeActive] = useState(false);
  const [adNewStatus, setAdNewStatus] = useState(ad.status);

  useEffect(() => {
    setAdNewStatus(ad.status);
  }, [ad]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setAdNewStatus(newStatus);
    handleAdStatusChange(ad.id, newStatus);
  };

  const handleAdStatusChange = async (id: number, newStatus: string) => {
    const response = await updateAdStatus(id, newStatus);
    if (response.isSuccess) {
      toast(t('success.ad_management.status_change'));
    } else {
      toast(t('error.ad_management.status_change_failed'));
    }
  };

  const handleDeleteAd = async (id: number) => {
    setIsDialogOpen(false);
    const response = await deleteAd(id);
    if (response.isSuccess) {
      toast(t('success.ad_management.delete'));
    } else {
      toast(t('error.ad_management.delete_failed'));
    }
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 40px',
          marginBottom: '20px',
          borderRadius: '40px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <Tooltip title={ad.title} arrow>
          <Typography
            variant="h6"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '150px',
            }}
          >
            {ad.title}
          </Typography>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: '30px', padding: '0px 50px' }}>
          <Select
            value={adNewStatus}
            onChange={handleSelectChange}
            displayEmpty
            sx={{ minWidth: '150px', fontSize: '1rem' }}
            inputProps={{
              'aria-label': t('ad_list.ad_status.dropdown'),
            }}
          >
            <MenuItem value="ACTIVE">{t('ad_list.ad_status.ACTIVE')}</MenuItem>
            <MenuItem value="RESERVED">{t('ad_list.ad_status.RESERVED')}</MenuItem>
            <MenuItem value="SOLD">{t('ad_list.ad_status.SOLD')}</MenuItem>
            <MenuItem value="DELETED">{t('ad_list.ad_status.DELETED')}</MenuItem>
          </Select>

        </Box>

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <IconButton onClick={() => setIsEditingModeActive(true)}>
            <EditIcon />
          </IconButton>
        </Box>
      </Card>

      <ConfirmationDialog
        isDialogOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCheck={() => handleDeleteAd(ad.id)}
        message={t("ad_list.delete_confirmation.title")}
      />

      {isEditingModeActive && (
        <EditAdCard
          ad={ad}
          onCancel={() => setIsEditingModeActive(false)}
        />
      )}
    </>
  );
}

export default AdCard;
