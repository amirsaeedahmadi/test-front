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
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextFieldProps } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resources from '../../../resource.json';
import { useTranslation } from 'react-i18next';
import ImageUploadBox from '../../molecules/Boxes/ImageUploadBox';

type EditAdCardProps = {
  title: string;
  price: number;
  category: string;
  date: string;
  description?: string;
  images: string[];
  status: string;
  onEdit: (data: any) => void;
  onCancel: () => void;
};

const normalizeDigits = (value: string): string => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';

  return value.replace(/[۰-۹]/g, (char) =>
    englishDigits[persianDigits.indexOf(char)]
  );
};

const EditAdCard: React.FC<EditAdCardProps> = ({
  title,
  price,
  category,
  date,
  description,
  images,
  status,
  onEdit,
  onCancel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title,
    price,
    category,
    date: new Date(date),
    description,
    status,
    images,
  });

  const { i18n } = useTranslation();
  const language = i18n.language as keyof typeof resources;
  const isRtl = language === 'fa';

  const handleChange = (field: keyof typeof formData, value: any) => {
    if (field === 'price') {
      const normalizedValue = normalizeDigits(value.toString());
      const numericValue = Number(normalizedValue);

      if (!isNaN(numericValue)) {
        setFormData((prev) => ({ ...prev, [field]: numericValue }));
      } else {
        toast.error('Invalid input. Please enter a valid number.');
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = async (files: File[]) => {
    const uploadedImageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => {
      const newImages = [...prev.images, ...uploadedImageUrls];
      if (newImages.length > 3) {
        toast.error('You can only upload a maximum of 3 images.');
        return { ...prev, images: newImages.slice(0, 3) };
      }
      return { ...prev, images: newImages };
    });
  };

  const handleImageDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    const { title, price, category, date, description, status, images } = formData;
    onEdit({
      title,
      price,
      category,
      date: (date as Date).toISOString().split('T')[0],
      description,
      status,
      images,
    });
    setIsEditing(false);
    const successMessage =
      resources[language]?.ad_list?.save_success ||
      (language === 'fa' ? 'تغییرات با موفقیت ذخیره شد.' : 'Changes saved successfully.');
    toast.success(successMessage);
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: isRtl ? 'right' : 'left',
        }}
      >
        <Box>
          <Typography variant="h5">{formData.title}</Typography>
          <Typography variant="subtitle1" sx={{ marginTop: '5px' }}>
            {resources[language]?.ad_list?.ad_status?.[formData.status]}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <SaveIcon onClick={handleSave} /> : <EditIcon />}
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ marginY: '20px' }} />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '15px' }}>
        <Typography>{resources[language]?.general_inputs.price}</Typography>
        {isEditing ? (
          <TextField
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9۰-۹]*',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {resources[language]?.currency || (language === 'fa' ? 'تومان' : 'Toman')}
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Typography>{`${formData.price} ${resources[language]?.currency || 'Toman'}`}</Typography>
        )}

        <Typography>{resources[language]?.create_ad.input.category}</Typography>
        {isEditing ? (
          <Select
            value={formData.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            fullWidth
            displayEmpty
            sx={{ direction: isRtl ? 'rtl' : 'ltr' }}
          >
            {Object.keys(categories || {}).map((key) => (
              <MenuItem key={key} value={key}>
                {categories[key as keyof typeof categories]}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography>{categories?.[formData.category as keyof typeof categories] || resources[language]?.create_ad.default.category}</Typography>
        )}

        <Typography>{resources[language]?.general_inputs.date}</Typography>
        {isEditing ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={formData.date}
              onChange={(newDate) => handleChange('date', newDate)}
              renderInput={(params: TextFieldProps) => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : (
          <Typography>
            {formData.date instanceof Date ? formData.date.toLocaleDateString() : formData.date}
          </Typography>
        )}

        <Typography>{resources[language]?.general_inputs.description}</Typography>
        {isEditing ? (
          <TextField
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={3}
            helperText={`${formData.description?.length || 0}/500`}
            sx={{ textAlign: isRtl ? 'right' : 'left' }}
          />
        ) : (
          <Typography>{formData.description || 'No Description'}</Typography>
        )}
      </Box>

      <Divider sx={{ marginY: '20px' }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {formData.images.map((image, index) => (
          <Box
            key={index}
            sx={{
              width: '160px',
              height: '160px',
              position: 'relative',
            }}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
            {isEditing && (
              <IconButton
                onClick={() => handleImageDelete(index)}
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
        {isEditing && formData.images.length < 3 && (
          <ImageUploadBox
            onUpload={handleImageUpload}
            // title={resources[language]?.general_inputs.add_image}
            numberOfImages={3 - formData.images.length}
          />
        )}
      </Box>
    </Card>
  );
};

export default EditAdCard;