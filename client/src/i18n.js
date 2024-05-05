import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./i18next/en.json";
import cs from "./i18next/cs.json";

i18next
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {translation: en},
            cs: {translation: cs}
        }
    });