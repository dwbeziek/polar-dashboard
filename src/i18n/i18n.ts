import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;