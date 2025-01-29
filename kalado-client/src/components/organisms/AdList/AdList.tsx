import React, { useState, useEffect } from 'react';
import AdCard from '../AdCard/AdCard';
import EditAdCard from '../AdCard/EditAdCard';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent, Typography, Box } from '@mui/material';
import { TProductResponseType } from '../../../constants/apiTypes';
import {
  getSellersProducts,
  updateAdStatus,
  deleteAd,
} from '../../../api/services/ProductService';
import { useAuth } from '../../../contexts';
import resources from '../../../resource.json';

const AdList = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as keyof typeof resources;
  const isRtl = language === 'fa';
  const { token } = useAuth();
  const [ads, setAds] = useState<TProductResponseType[]>([]);
  const [editingAdId, setEditingAdId] = useState<number | null>(null);
  const [previousAdState, setPreviousAdState] = useState<TProductResponseType | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        if (token) {
          const data = await getSellersProducts(token);
          setAds(data);
        }
      } catch (error) {
        console.error('Error fetching seller’s products:', error);
      }
    };
    fetchAds();
  }, [token]);

  useEffect(() => {
    setAds((prevAds) =>
      prevAds.map((ad) => ({
        ...ad,
        title: ad.title || `${t('ad_list.create_ad.input.title')} ${ad.id}`,
      }))
    );
  }, [t, i18n.language]);

  const handleStatusChange = (id: number) => async (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    try {
      await updateAdStatus(id, newStatus);
      setAds((prevAds) =>
        prevAds.map((ad) => (ad.id === id ? { ...ad, status: newStatus } : ad))
      );
    } catch (error) {
      console.error('Error updating ad status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAd(id);
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
      if (editingAdId === id) setEditingAdId(null);
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const handleEditTitle = (id: number) => (newTitle: string) => {
    setAds((prevAds) =>
      prevAds.map((ad) => (ad.id === id ? { ...ad, title: newTitle } : ad))
    );
  };

  const handleEdit = (id: number) => {
    const editingAd = ads.find((ad) => ad.id === id);
    if (editingAd) {
      setEditingAdId(id);
      setPreviousAdState(editingAd);
    }
  };

  const handleEditAdCardClose = () => {
    setEditingAdId(null);
  };

  const handleCancelEdit = () => {
    if (previousAdState) {
      setAds((prevAds) =>
        prevAds.map((ad) => (ad.id === previousAdState.id ? previousAdState : ad))
      );
    }
    handleEditAdCardClose();
  };

  const editingAd = ads.find((ad) => ad.id === editingAdId);

  return (
    <div style={{ padding: '20px', direction: isRtl ? 'rtl' : 'ltr' }}>
      {editingAd ? (
        <>
          <EditAdCard
            title={editingAd.title}
            price={editingAd.price.amount}
            category={editingAd.category}
            date={editingAd.createdAt}
            description={editingAd.description}
            images={editingAd.imageUrls}
            status={editingAd.status}
            onEdit={(updatedData) => {
              handleEditTitle(editingAd.id)(updatedData.title);
            }}
            onCancel={handleCancelEdit}
          />
        </>
      ) : (
        <>
      {/* Heading for Ad List */}
      <Box
        sx={{
          marginBottom: '50px',
          textAlign: isRtl ? 'right' : 'left',
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: '#FFF', marginBottom: '15px' }}
        >
          {t('ad_list.heading')}
        </Typography>
      </Box>

      {/* List of Ad Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            title={ad.title}
            status={ad.status}
            onStatusChange={handleStatusChange(ad.id)}
            onDelete={() => handleDelete(ad.id)}
            onEdit={() => handleEdit(ad.id)}
            onEditTitle={handleEditTitle(ad.id)}
            language={i18n.language as 'en' | 'fa'}
          />
        ))}
      </Box>
        </>
      )}
    </div>
  );
};

export default AdList;
