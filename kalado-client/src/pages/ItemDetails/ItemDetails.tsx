import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';
import { CustomButton } from '../../components/atoms';
import { ReportSubmissionForm, ItemDetailsCard, NavBar, FormGroup } from '../../components/organisms';
import { useProductContext, useModalContext } from '../../contexts';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ItemDetails: React.FC = () => {
    const { t } = useTranslation();
    const { itemId } = useParams<{ itemId: string }>();
    const { handleOpenReportSubmission } = useModalContext();
    const { singleProduct, loading, error, fetchSingleProduct } = useProductContext();

    useEffect(() => {
        if (!itemId) return;
        fetchSingleProduct(Number(itemId));
    }, [itemId]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            p: 2
        }}>
            <NavBar />
            {loading && <CircularProgress />}
            {!loading && (error || !singleProduct) && (
                <Box sx={{ textAlign: 'center' }}>
                    <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {t("error.item_details.not_found")}
                    </Typography>
                </Box>
            )}
            {!loading && singleProduct && (
                <Stack
                    spacing={2}
                    alignItems="center"
                    sx={{
                        width: '100%',
                        maxWidth: 800
                    }}
                >
                    <ItemDetailsCard
                        item={singleProduct}
                    />

                    <CustomButton
                        text={t("item_details.report_submission_btn")}
                        onClick={handleOpenReportSubmission}
                    />

                    <ReportSubmissionForm reportedContentId={Number(itemId)} />
                </Stack>
            )}

            <FormGroup />
        </Box>
    );
};

export default ItemDetails;
