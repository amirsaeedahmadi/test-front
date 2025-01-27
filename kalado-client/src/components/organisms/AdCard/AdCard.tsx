import React, { Component } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  IconButton,
  MenuItem,
  Select,
  Dialog,
  DialogContent,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

import { SelectChangeEvent } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';

type AdCardProps = WithTranslation & {
  title: string;
  status: string;
  onStatusChange: (event: SelectChangeEvent<string>) => void;
  onDelete: () => void;
  onEditTitle: (newTitle: string) => void;
  onEdit: () => void;
};

type AdCardState = {
  isEditing: boolean;
  newTitle: string;
  isDeleteDialogOpen: boolean;
};

class AdCard extends Component<AdCardProps, AdCardState> {
  constructor(props: AdCardProps) {
    super(props);
    this.state = {
      isEditing: false,
      newTitle: props.title,
      isDeleteDialogOpen: false,
    };
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 10) {
      this.setState({ newTitle: event.target.value });
    }
  };

  saveTitle = () => {
    this.props.onEditTitle(this.state.newTitle.trim());
    this.setState({ isEditing: false });
  };

  handleDeleteConfirm = () => {
    this.props.onDelete();
    this.setState({ isDeleteDialogOpen: false });
  };

  render() {
    const { title, status, onStatusChange, onEdit, t } = this.props;
    const { isEditing, isDeleteDialogOpen } = this.state;

    return (
      <>
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 40px',
            marginBottom: '40px',
            borderRadius: '40px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ flex: 1, textAlign: 'left' }}>
            {isEditing ? (
              <TextField
                fullWidth
                value={this.state.newTitle}
                onChange={this.handleTitleChange}
                onBlur={this.saveTitle}
                autoFocus
                variant="standard"
              />
            ) : (
              <Tooltip title={title} arrow>
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '150px',
                  }}
                >
                  {title}
                </Typography>
              </Tooltip>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Select
              value={status}
              onChange={onStatusChange}
              displayEmpty
              sx={{ minWidth: '180px', fontSize: '1rem' }}
              inputProps={{
                'aria-label': t('ad_list.ad_status.dropdown'),
              }}
            >
              <MenuItem value="active">{t('ad_list.ad_status.active')}</MenuItem>
              <MenuItem value="reserved">{t('ad_list.ad_status.reserved')}</MenuItem>
              <MenuItem value="sold">{t('ad_list.ad_status.sold')}</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: 'flex', gap: '10px' }}>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => this.setState({ isDeleteDialogOpen: true })}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>

        <Dialog open={isDeleteDialogOpen} onClose={() => this.setState({ isDeleteDialogOpen: false })}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Typography>{t('ad_list.delete_confirmation.title')}</Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <IconButton onClick={this.handleDeleteConfirm} sx={{ backgroundColor: 'green' }}>
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => this.setState({ isDeleteDialogOpen: false })}
                sx={{ backgroundColor: 'red' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withTranslation()(AdCard);
