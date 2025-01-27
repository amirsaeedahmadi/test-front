import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import resources from '../resource.json';

i18n.init({
  lng: 'fa',
  fallbackLng: 'fa',
  debug: false,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

const renderWithProviders = (ui: React.ReactElement, { ...options } = {}) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {ui}
    </I18nextProvider>,
    options
  );
};

export default renderWithProviders;