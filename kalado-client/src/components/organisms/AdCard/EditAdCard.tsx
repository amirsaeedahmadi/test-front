import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  IconButton,
  MenuItem,
  Select,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resources from '../../../resource.json';
import { useTranslation } from 'react-i18next';
import ImageUploadBox from '../../molecules/Boxes/ImageUploadBox';
import { updateAd, createProductWithImages } from '../../../api/services/ProductService';
import { useAuth } from '../../../contexts';
import { ProductData, TProductResponseType } from '../../../constants/apiTypes';

type EditAdCardProps = {
  ad: TProductResponseType;
  onEdit: (updatedAd: TProductResponseType) => void;
  onCancel: () => void;
};

const normalizeDigits = (value: string): string => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';
  return value.replace(/[۰-۹]/g, (char) => englishDigits[persianDigits.indexOf(char)]);
};

const EditAdCard: React.FC<EditAdCardProps> = ({ ad, onEdit, onCancel }) => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<ProductData>({
    title: ad.title,
    price: ad.price,
    category: ad.category,
    productionYear: ad.productionYear || new Date(ad.createdAt).getFullYear(),
    description: ad.description || '',
    images: ad.imageUrls || [],
  });

  const { i18n } = useTranslation();
  const language = i18n.language as keyof typeof resources;
  const isRtl = language === 'fa';

  const handleChange = (field: keyof ProductData, value: any) => {
    if (field === 'price') {
      const normalizedValue = normalizeDigits(value.toString());
      const numericValue = Number(normalizedValue);
      if (!isNaN(numericValue)) {
        setFormData((prev) => ({ ...prev, price: { amount: numericValue, unit: prev.price.unit } }));
      } else {
        toast.error('Invalid input. Please enter a valid number.');
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = async (files: File[]) => {
    try {
      if (token) {
        const updatedProduct = await createProductWithImages(formData, files);
        setFormData((prev) => ({
          ...prev,
          images: updatedProduct.imageUrls || [],
        }));
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images. Please try again.');
    }
  };

  const handleImageDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSave = async () => {
    try {
      if (!token) {
        toast.error('User is not authenticated.');
        return;
      }
      const response = await updateAd(ad.id, formData);
      const newToken = response.headers?.authorization || response.headers?.['Authorization'];
      if (newToken) {
        auth.setToken(newToken);
      }
  
      onEdit(response.data);
      setIsEditing(false);
      toast.success(resources[language]?.ad_list?.save_success || 'Changes saved successfully.');
    } catch (error) {
      console.error('Error updating ad:', error);
      toast.error('Error updating ad. Please try again.');
    }
  };

  const categories = resources[language]?.category;

  return (
    <Card
      sx={{
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        maxWidth: '900px',
        margin: '20px auto',
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5">{formData.title}</Typography>
          <Typography variant="subtitle1">{resources[language]?.ad_list?.ad_status?.[ad.status]}</Typography>
        </Box>
        <Box>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={() => setIsEditing(!isEditing)}>
            {!isEditing ? <EditIcon /> : <SaveIcon onClick={handleSave} />}
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ marginY: '20px' }} />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '15px' }}>
        {/* Price */}
        <Typography>{resources[language]?.general_inputs.price}</Typography>
        {isEditing ? (
          <TextField
            value={formData.price.amount}
            onChange={(e) => handleChange('price', e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9۰-۹]*' }}
            InputProps={{ endAdornment: <InputAdornment position="end">{formData.price.unit}</InputAdornment> }}
          />
        ) : (
          <Typography>{`${formData.price.amount} ${formData.price.unit}`}</Typography>
        )}

        {/* Category */}
        <Typography>{resources[language]?.create_ad.input.category}</Typography>
        {isEditing ? (
          <Select value={formData.category || ''} onChange={(e) => handleChange('category', e.target.value)} fullWidth>
            {Object.keys(categories || {}).map((key) => (
              <MenuItem key={key} value={key}>
                {categories[key as keyof typeof categories]}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography>{categories?.[formData.category as keyof typeof categories]}</Typography>
        )}
      </Box>

      <Divider sx={{ marginY: '20px' }} />

      {/* Image Upload */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {formData.images?.map((image, index) => (
          <Box key={index} sx={{ width: '160px', height: '160px', position: 'relative' }}>
            <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {isEditing && (
              <IconButton onClick={() => handleImageDelete(index)} sx={{ position: 'absolute', top: 5, right: 5 }}>
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
        {isEditing && (formData.images?.length || 0) < 3 && <ImageUploadBox onUpload={handleImageUpload} />}
      </Box>
    </Card>
  );
};

export default EditAdCard;
