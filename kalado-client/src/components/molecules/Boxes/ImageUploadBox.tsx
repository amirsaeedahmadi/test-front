import React from 'react';
import { Box, Typography } from '@mui/material';
import { ImageUpload } from '../../atoms';

interface ImageUploadBoxProps {
    onUpload: (files: File[]) => void;
    title: string;
    numberOfImages?: number;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ onUpload, title, numberOfImages = 3 }) => {
    return (
        <Box>
            <Typography sx={{ marginBottom: "10px" }}>{title}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                {Array.from({ length: numberOfImages }, (_, index) => (
                    <ImageUpload key={index} onUpload={onUpload} />
                ))}
            </Box>
        </Box>
    );
};

export default ImageUploadBox;
