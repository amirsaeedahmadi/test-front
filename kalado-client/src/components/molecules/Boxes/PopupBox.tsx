import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Backdrop as MuiBackdrop } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { FaTimes } from 'react-icons/fa';

interface PopupBoxProps {
    open: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const PopupBox: React.FC<PopupBoxProps> = ({ open, children, onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('MuiBackdrop-root')) {
            onClose();
        }
    };

    return (
        <MuiBackdrop
            open={open}
            onClick={handleBackdropClick}
            sx={{
                zIndex: 1200,
            }}
        >
            <Box sx={{
                width: isMobile ? "90vw" : "450px",
                padding: isMobile ? "10px 20px" : "25px 20px",
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: theme.palette.background.default,
                borderRadius: 10,
                overflowY: 'auto',
                maxHeight: '90vh',
            }}>
                <Logo />
                <CustomButton
                    onClick={onClose}
                    style={{
                        color: theme.palette.primary.main,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: '10px',
                        right: '5px',
                        padding: '0',
                    }}
                >
                    <FaTimes size={20} />
                </CustomButton>
                {children}
            </Box>
        </MuiBackdrop>
    );
};

export default PopupBox;
