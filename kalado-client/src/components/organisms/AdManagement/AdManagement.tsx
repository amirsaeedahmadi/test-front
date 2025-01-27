import React from 'react';
import { Box } from '@mui/material';
import AdList from '../AdList/AdList';
import EditAdCard from '../AdCard/EditAdCard';
import { TProductResponseType } from '../../../constants/apiTypes';


interface AdManagementProps {
    ads: TProductResponseType[];
    onEdit: (adData: TProductResponseType) => void;
    selectedAd?: TProductResponseType;
    onCloseEdit: () => void;
}

const AdManagement: React.FC<AdManagementProps> = ({ ads, onEdit, selectedAd, onCloseEdit }) => {
    return (
        <Box sx={{ padding: 15 }}>
            <Box sx={{ marginBottom: 4 }}>
                <AdList ads={ads} onEdit={onEdit} />
            </Box>

            {selectedAd && (
                <Box sx={{ marginTop: 4 }}>
                    <EditAdCard
                        title={selectedAd.title}
                        price={selectedAd.price.amount}
                        category={selectedAd.category}
                        date={selectedAd.createdAt}
                        description={selectedAd.description}
                        images={selectedAd.imageUrls}
                        status={selectedAd.status}
                        onEdit={(updatedData) => onEdit(updatedData)}
                        onCancel={onCloseEdit}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AdManagement;
