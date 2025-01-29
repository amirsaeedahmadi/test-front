import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import defaultImage from '../../../assets/images/no-image.png';
import PriceIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DateIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts';
import { TProductResponseType } from '../../../constants/apiTypes';

interface ItemDetailsCardProps {
    item: TProductResponseType;
}

const ItemDetailsCard: React.FC<ItemDetailsCardProps> = ({ item }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const imageToDisplay = item.imageUrls?.[0] || defaultImage;

    const formatDate = (timestamp: number | null): string => {
        if (!timestamp) return t("item_details.no_date");
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(timestamp));
    };

    const copyPhoneNumberToClipboard = () => {
        if (!token) {
            toast(t("error.item_details.login_to_copy_phone_number"));
            return;
        }

        const phoneNumber = item.sellerPhoneNumber;
        if (phoneNumber) {
            navigator.clipboard.writeText(phoneNumber)
                .then(() => toast(t("success.copy_phone_number")))
                .catch(() => fallbackCopyTextToClipboard(phoneNumber));
        }
    };

    const fallbackCopyTextToClipboard = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy')
                ? toast(t("success.copy_phone_number"))
                : toast(t("error.item_details.copy_phone_number_failed"));
        } catch {
            toast(t("error.item_details.copy_phone_number_failed"));
        } finally {
            document.body.removeChild(textArea);
        }
    };

    const maskPhoneNumber = (phoneNumber: string) => {
        if (!phoneNumber) return t("item_details.no_seller_phone");

        return token
            ? phoneNumber
            : `${phoneNumber.slice(0, -4).replace(/\d/g, '*')}${phoneNumber.slice(-4)}`;
    };

    const InfoRow: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
            {icon}
            <Typography variant="h6">{children}</Typography>
        </Box>
    );

    return (
        <Card sx={{ width: 800 }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <CardContent>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
                            {item.title || t("item_details.no_title")}
                        </Typography>
                        <InfoRow icon={<PriceIcon sx={{ ml: 2 }} />}>
                            {`${item.price?.amount?.toLocaleString() || 0} ${t("currency")}`}
                        </InfoRow>
                        <InfoRow icon={<LocalOfferIcon sx={{ ml: 2 }} />}>
                            {item.brand || t("item_details.no_brand")}
                        </InfoRow>
                        <InfoRow icon={<DateIcon sx={{ ml: 2 }} />}>
                            {formatDate(item.createdAt)}
                        </InfoRow>
                        <InfoRow icon={<DescriptionIcon sx={{ ml: 2 }} />}>
                            {item.description || t("item_details.no_description")}
                        </InfoRow>
                        <InfoRow icon={<PhoneIcon sx={{ ml: 2 }} />}>
                            <Typography
                                variant="h6"
                                onClick={copyPhoneNumberToClipboard}
                                sx={{
                                    cursor: 'pointer',
                                    userSelect: 'text',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {maskPhoneNumber(item.sellerPhoneNumber)}
                            </Typography>
                        </InfoRow>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    image={imageToDisplay}
                    alt={item.title || 'Item Image'}
                    sx={{ height: 400, width: 500, objectFit: 'cover' }}
                />
            </Box>
        </Card>
    );
};

export default ItemDetailsCard;
