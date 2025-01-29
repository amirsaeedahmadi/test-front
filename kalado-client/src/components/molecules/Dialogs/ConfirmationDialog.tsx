import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

interface ConfirmationDialogProps {
    isDialogOpen: boolean;
    onClose: () => void;
    onCheck: () => void;
    message: string;
    title?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isDialogOpen, onClose, onCheck, message, title }) => {
    return (
        <Dialog
            open={isDialogOpen}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            {title && (
                <DialogTitle id="confirmation-dialog-title">
                    {title}
                </DialogTitle>
            )}
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <IconButton onClick={onCheck} sx={{ backgroundColor: 'green', margin: '0 10px' }}>
                    <CheckIcon />
                </IconButton>
                <IconButton onClick={onClose} sx={{ backgroundColor: 'red', margin: '0 10px' }}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
