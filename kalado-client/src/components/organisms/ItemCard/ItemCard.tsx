import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import defaultImage from '../../../assets/images/no-image.png';

interface ItemCardProps {
  title: string;
  price: string;
  createdAt: string;
  imageUrls: string[];
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, price, createdAt, imageUrls, onClick }) => {
  const imageToDisplay = imageUrls.length > 0 ? imageUrls[0] : defaultImage;

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.05)' },
        backgroundColor: 'transparent',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
        width: '300px',
        height: '400px',
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={imageToDisplay}
        alt={title}
        sx={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" noWrap sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {price.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {createdAt}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
