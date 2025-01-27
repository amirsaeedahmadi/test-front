import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ImageUploadBoxProps {
    onUpload: (files: File[]) => void;
    title: string;
    isRequired?: boolean;
    errorMessage?: string;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
    onUpload,
    title,
    isRequired = false,
    errorMessage = 'This field is required.',
}) => {
    const [error, setError] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            onUpload(selectedFiles); // pass files to the parent component

            // if files are uploaded
            if (isRequired && selectedFiles.length > 0) {
                setError(false);
            }
        }
    };

    const validateFiles = () => {
        if (isRequired && !error) {
            setError(true); // if no files uploaded
        }
    };

    return (
        <Box>
            <Typography>{title}</Typography>
            <Button
                variant="contained"
                component="label"
                sx={{ mt: 1 }}
                onBlur={validateFiles}
            >
                Upload Files
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
};

export default ImageUploadBox;
