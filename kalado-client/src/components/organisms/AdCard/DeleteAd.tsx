import React from 'react';
import { Box, Typography, Button, Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiX } from 'react-icons/fi';

type DeleteAdProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteAd: React.FC<DeleteAdProps> = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#2c2f3e',
          borderRadius: '20px',
          padding: '40px',
          minWidth: '450px',
          minHeight: '200px',
          textAlign: 'center',
          border: '2px solid #fff',
        },
      }}
    >
      <Box>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            marginBottom: '20px',
            fontWeight: 'normal',
            fontSize: '1.25rem',
          }}
        >
          {t('ad_list.delete_confirmation.title')}
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <Button
            onClick={onConfirm}
            sx={{
              backgroundColor: 'green',
              color: '#fff',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              fontSize: '1.5rem',
              '&:hover': { backgroundColor: 'darkgreen' },
            }}
            aria-label="Confirm"
          >
             <FiCheck size={30} />
          </Button>
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: 'red',
              color: '#fff',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              fontSize: '1.5rem',
              '&:hover': { backgroundColor: 'darkred' },
            }}
            aria-label="Cancel" 
          >
            <FiX size={30} />
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteAd;
