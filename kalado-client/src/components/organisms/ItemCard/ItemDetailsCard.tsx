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
    const imageToDisplay = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : defaultImage;

    const formatDate = (timestamp: string | null): string => {
        if (!timestamp) return t("item_details.no_date");
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    const copyPhoneNumberToClipboard = () => {
        if (!token) {
            return;
        }
        if (navigator.clipboard && item.sellerPhoneNumber) {
            navigator.clipboard.writeText(item.sellerPhoneNumber)
                .then(() => {
                    toast(t("success.copy_phone_number"));
                })
                .catch(err => {
                    fallbackCopyTextToClipboard(item.sellerPhoneNumber);
                });
        } else {
            fallbackCopyTextToClipboard(item.sellerPhoneNumber);
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
            const successful = document.execCommand('copy');
            if (successful) {
                toast(t("success.copy_phone_number"));
            } else {
                toast(t("error.item_details.copy_phone_number_failed"));
            }
        } catch (err) {
            toast(t("error.item_details.copy_phone_number_failed"));
        }

        document.body.removeChild(textArea);
    };

    const maskPhoneNumber = (phoneNumber: string) => {
        if (!phoneNumber) return t("item_details.no_seller_phone");

        if (!token) {
            const visiblePart = phoneNumber.slice(-4);
            const maskedPart = phoneNumber.slice(0, -4).replace(/\d/g, '*');
            return maskedPart + visiblePart;
        }

        return phoneNumber;
    };

    return (
        <Card sx={{ width: 800, height: 'auto' }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <CardContent>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
                            {item.title || t("item_details.no_title")}
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <PriceIcon sx={{ ml: 2 }} />
                            <Typography variant="h6">
                                {`${item.price?.amount?.toLocaleString() || 0} ${t("currency")}`}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <LocalOfferIcon sx={{ ml: 2 }} />
                            <Typography variant="h6">
                                {item.brand || t("item_details.no_brand")}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <DateIcon sx={{ ml: 2 }} />
                            <Typography variant="h6">
                                {formatDate(item.createdAt)}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <DescriptionIcon sx={{ ml: 2 }} />
                            <Typography variant="h6">
                                {item.description || t("item_details.no_description")}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <PhoneIcon sx={{ ml: 2 }} />
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

                        </Box>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    image={imageToDisplay}
                    alt={item.title || 'Item Image'}
                    sx={{ height: 400, width: 500, objectFit: 'cover' }}
                />
            </Box >
        </Card >
    );
};

export default ItemDetailsCard;
