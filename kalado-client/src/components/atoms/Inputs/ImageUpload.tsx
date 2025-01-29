import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, useTheme } from '@mui/material';
import FormError from '../Errors/FormError';
import { FaTrash } from 'react-icons/fa';


interface ImageUploadProps {
    onUpload: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages: File[] = [];
            const newPreviews: string[] = [];
            let errorFound = false;

            Array.from(files).forEach((file) => {
                if (file.size <= 1 * 1024 * 1024) {
                    newImages.push(file);
                    newPreviews.push(URL.createObjectURL(file));
                } else {
                    errorFound = true;
                }
            });

            if (errorFound) {
                setError(t("error.input.invalid_image.max_size"));
            } else {
                setError(null);
            }

            setSelectedImages(newImages);
            setImagePreviews(newPreviews);
            onUpload(newImages);
        }
    };

    const handleRemoveImage = (index: number, event: React.MouseEvent) => {
        event.stopPropagation();
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        setImagePreviews(updatedPreviews);
        onUpload(updatedImages);
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Box>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <Box
                className="image-preview-square"
                onClick={handleBrowseClick}
                sx={{
                    width: 80,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                {imagePreviews.length === 0 ? (
                    <Button
                        variant="outlined"
                        sx={{
                            color: theme.palette.text.primary,
                            border: '2px dashed',
                            borderRadius: 2
                        }}>
                        {t("general_inputs.add_image")}
                    </Button>
                ) : (
                    imagePreviews.map((preview, index) => (
                        <Box key={index} className="image-preview" sx={{ position: 'relative', width: '100%', height: '100%' }}>
                            <img src={preview} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <IconButton
                                onClick={(event) => handleRemoveImage(index, event)}
                                sx={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        color: '#D74101',
                                    },
                                }}
                            >
                                <FaTrash />
                            </IconButton>
                        </Box>
                    ))
                )}
            </Box>
            <FormError message={error} />
        </Box>
    );
};

export default ImageUpload;
