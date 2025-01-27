import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface ItemSortProps {
    sortOption: string;
    setSortOption: (event: SelectChangeEvent<string>) => void;
}

const ItemSort: React.FC<ItemSortProps> = ({ sortOption, setSortOption }) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, position: 'relative' }}>
            <Select
                value={sortOption}
                onChange={setSortOption}
                displayEmpty
                inputProps={{ 'aria-label': 'Sort Items' }}
                sx={{ minWidth: 120 }}
            >
                <MenuItem value="newest">{t("sort.newest")}</MenuItem>
                <MenuItem value="oldest">{t("sort.oldest")}</MenuItem>
                <MenuItem value="most_expensive">{t("sort.most_expensive")}</MenuItem>
                <MenuItem value="cheapest">{t("sort.cheapest")}</MenuItem>
            </Select>
        </Box>
    );
};

export default ItemSort;
