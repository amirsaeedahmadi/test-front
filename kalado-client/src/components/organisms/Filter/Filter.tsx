import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CustomButton } from '../../atoms';
import { LabelList, NumberRange } from '../../molecules';
import { OptionsComponent } from '../../../constants/options';
import { useProductContext } from '../../../contexts/ProductContext';

const Filter: React.FC = () => {
  const { t } = useTranslation();
  const { date_filter_options } = OptionsComponent();
  const { applyFilters } = useProductContext();
  const [date, setDate] = useState<string | ''>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();

    const persianToEnglish = (str: string) =>
      str.replace(/[٠-٩]/g, (d) => (d.charCodeAt(0) - 1632).toString()) // Persian digits
         .replace(/[۰-۹]/g, (d) => (d.charCodeAt(0) - 1776).toString()); // Arabic digits

    value = persianToEnglish(value);

    if (/^\d*$/.test(value)) {
      const numericValue = value ? parseFloat(value) : null;

      if (e.target.name === 'minPrice') {
        setMinPrice(numericValue !== null && numericValue < 0 ? 0 : numericValue);
      } else if (e.target.name === 'maxPrice') {
        setMaxPrice(numericValue !== null && numericValue < 0 ? 0 : numericValue);
      }
    }
  };

  const handleApplyFilters = () => {
    applyFilters(
      minPrice !== null ? minPrice : undefined, 
      maxPrice !== null ? maxPrice : undefined, 
      date
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        {t("filter.title")}
      </Typography>

      <NumberRange
        minName="minPrice"
        maxName="maxPrice"
        minPlaceholder={t("filter.min_price")}
        maxPlaceholder={t("filter.max_price")}
        onChange={handlePriceChange}
      />

      <LabelList
        items={date_filter_options}
        selectedValue={date}
        onSelect={(newDate) => setDate(newDate)}
        title={t("filter.ad_date")}
      />

      <CustomButton
        text={t('filter.apply')}
        onClick={handleApplyFilters}
      />
    </Box>
  );
};

export default Filter;
