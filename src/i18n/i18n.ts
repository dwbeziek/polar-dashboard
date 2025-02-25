import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import pt from '../i18n/pt.json';
import fr from '../i18n/fr.json';
import it from '../i18n/it.json';
import zhTW from '../i18n/zh-TW.json';
import zhCN from '../i18n/zh-CN.json';
import da from '../i18n/da.json';
import sv from '../i18n/sv.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
            pt: { translation: pt },
            fr: { translation: fr },
            it: { translation: it },
            'zh-TW': { translation: zhTW },
            'zh-CN': { translation: zhCN },
            da: { translation: da },
            sv: { translation: sv },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        debug: true,
    });

export default i18n;