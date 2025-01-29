import React from 'react';
import { Box, Typography } from '@mui/material';
import { ImageUpload } from '../../atoms';

interface ImageUploadBoxProps {
    onUpload: (files: File[]) => void;
    title?: string;
    numberOfImages?: number;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ onUpload, title, numberOfImages = 3 }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Typography sx={{ marginBottom: "10px" }}>{title}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}
            >
                {Array.from({ length: numberOfImages }, (_, index) => (
                    <Box key={index} sx={{ margin: '10px 10px' }}>
                        <ImageUpload onUpload={onUpload} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ImageUploadBox;
