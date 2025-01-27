import React, { useState, useEffect } from "react";
import AdCard from "../AdCard/AdCard";
import EditAdCard from "../AdCard/EditAdCard";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

const AdList = () => {
  const { t, i18n } = useTranslation();
  const [ads, setAds] = useState([
    { id: 1, title: "", status: "active" },
    { id: 2, title: "", status: "reserved" },
    { id: 3, title: "", status: "active" },
    { id: 4, title: "", status: "reserved" },
  ]);
  const [editingAdId, setEditingAdId] = useState<number | null>(null);
  const [previousAdState, setPreviousAdState] = useState<any | null>(null);

  const language = i18n.language as "en" | "fa";
  const isRtl = language === "fa";

  useEffect(() => {
    setAds((prevAds) =>
      prevAds.map((ad) => ({
        ...ad,
        title: `${t("ad_list.create_ad.input.title")} ${ad.id}`,
      }))
    );
  }, [t, i18n.language]);

  const handleStatusChange =
    (id: number) => (event: SelectChangeEvent<string>) => {
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === id ? { ...ad, status: event.target.value } : ad
        )
      );
    };

  const handleDelete = (id: number) => {
    setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
    if (editingAdId === id) setEditingAdId(null);
  };

  const handleEditTitle = (id: number) => (newTitle: string) => {
    setAds((prevAds) =>
      prevAds.map((ad) =>
        ad.id === id ? { ...ad, title: newTitle } : ad
      )
    );
  };

  const handleEdit = (id: number) => {
    const editingAd = ads.find((ad) => ad.id === id);
    if (editingAd) {
      setEditingAdId(id);
      setPreviousAdState(editingAd); // save previous state for restoration if canceled
    }
  };

  const handleEditAdCardClose = () => {
    setEditingAdId(null);
  };

  const handleCancelEdit = () => {
    if (previousAdState) {
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === previousAdState.id ? previousAdState : ad
        )
      );
    }
    handleEditAdCardClose();
  };

  const editingAd = ads.find((ad) => ad.id === editingAdId);

  return (
    <div style={{ padding: "20px", direction: isRtl ? "rtl" : "ltr" }}>
      {editingAd ? (
        <>
          <EditAdCard
            title={editingAd.title}
            price="1000"
            category="electronics"
            date="2023-01-01"
            description="Sample description"
            images={[]}
            status={editingAd.status}
            onEdit={(updatedData) => {
              handleEditTitle(editingAd.id)(updatedData.title);
            }}
            onCancel={handleCancelEdit}
          />
        </>
      ) : (
        <>
          <Box
            sx={{
              marginBottom: "50px",
              textAlign: isRtl ? "right" : "left",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {t("ad_list.heading")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {ads.map((ad) => (
              <AdCard
                key={ad.id}
                title={ad.title}
                status={ad.status}
                onStatusChange={handleStatusChange(ad.id)}
                onDelete={() => handleDelete(ad.id)}
                onEdit={() => handleEdit(ad.id)}
                onEditTitle={handleEditTitle(ad.id)}
                language={i18n.language as "en" | "fa"}
              />
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default AdList;
