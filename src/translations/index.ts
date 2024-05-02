import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './English.json';
import itan from './Italiano.json';

i18next.use(initReactI18next).init({
  resources: {
    itan: {
      translation: itan,
    },
    en: {
      translation: en,
    },
  },
  lng: 'en',
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v3',
});

export default i18next;
