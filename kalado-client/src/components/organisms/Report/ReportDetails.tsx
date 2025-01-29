import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Card,
} from '@mui/material';
import { Download as DownloadIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { CustomButton } from '../../atoms';
import { ConfirmationDialog } from '../../../components/molecules';
import { ItemDetailsPopup } from '../../organisms';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReportStatusUpdateData, TReportResponseType } from '../../../constants/apiTypes';
import { useModalContext, useProductContext } from '../../../contexts';

interface ReportDetailsProps {
  report: TReportResponseType;
  onBackToList: () => void;
  onBlockContent: (contentId: number) => void;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({ report, onBackToList, onBlockContent }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [isBlockAdDialogOpen, setIsBlockAdDialogOpen] = useState(false);
  const { isProductDetailsOpen, handleProductDetailsClick } = useModalContext();
  const { singleProduct, loading, error, fetchSingleProduct } = useProductContext();

  useEffect(() => {
    if (!report.reportedContentId) return;
    fetchSingleProduct(Number(report.reportedContentId));
  }, [report.reportedContentId]);

  const handleOpenImage = (image: string) => {
    setOpenImage(image);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  const handleBlockConfirm = () => {
    if (report) {
      onBlockContent(report.reportedContentId);
      toast(t('report.report_card.block_usr_success_message'));
    }
    setIsBlockDialogOpen(false);
  };

  const handleBlockAdConfirm = () => {
    if (report) {
      // Perform ad blocking logic
      toast(t('report.report_card.block_ad_success_message'));
    }
    setIsBlockAdDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          width: '40vw',
          height: 'auto',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 4,
          boxShadow: 2,
          borderRadius: 2,
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 4,
            fontWeight: 'bold',
          }}
        >
          {t('report.report_card.violation_type')}: {t(`report.category.${report.violationType}`)}
        </Typography>

        <Grid container sx={{ flex: 1 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              paddingRight: isRtl ? 2 : 0,
              paddingLeft: isRtl ? 0 : 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {t('report.report_card.description')}:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'justify' }}>
              {report.description}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              borderLeft: isRtl ? 'none' : '1px solid',
              borderRight: isRtl ? '1px solid' : 'none',
              paddingRight: isRtl ? 2 : 0,
              paddingLeft: isRtl ? 0 : 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                textAlign: 'right',
                width: '100%',
              }}
            >
              {t('report.choose_evidence')}:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {report.evidenceFiles.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={image}
                    alt={`${t('report.report_card.evidence')} ${index + 1}`}
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOpenImage(image)}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                    }}
                    onClick={() => window.open(image, '_blank')}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between', gap: 2, marginTop: 4 }}>

          <CustomButton text={t('report.report_card.actions.go_to_ad')} onClick={handleProductDetailsClick} fullWidth={true} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <CustomButton text={t('report.report_card.actions.block_ad')} onClick={() => setIsBlockAdDialogOpen(true)} fullWidth={true} />
            <CustomButton text={t('report.report_card.actions.block_user')} onClick={() => setIsBlockDialogOpen(true)} fullWidth={true} />
          </Box>

          <CustomButton text={t('report.report_card.actions.back_to_list')} onClick={() => onBackToList()} fullWidth={true} />
        </Box>

        <Dialog open={!!openImage} onClose={handleCloseImage}>
          <img
            src={openImage}
            alt={t('report.report_card.evidence')}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          />
        </Dialog>
      </Card>

      <ConfirmationDialog
        isDialogOpen={isBlockDialogOpen}
        onClose={() => setIsBlockDialogOpen(false)}
        onCheck={() => handleBlockConfirm()}
        message={t('report.report_card.block_confirmation.title_usr')}
      />

      <ConfirmationDialog
        isDialogOpen={isBlockAdDialogOpen}
        onClose={() => setIsBlockAdDialogOpen(false)}
        onCheck={() => handleBlockAdConfirm()}
        message={t('report.report_card.block_confirmation.title_ad')}
      />

      {singleProduct && <ItemDetailsPopup singleProduct={singleProduct} />}
    </>
  );
};

export default ReportDetails;
