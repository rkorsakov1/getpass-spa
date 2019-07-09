import en from './en';
import ru from './ru';

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { locales } from "localization";

const resources = {
  [locales.en]: {
    translations: en
  },
  [locales.ru]: {
    translations: ru
  }
}

const detection = {
  // order and from where user language should be detected
  order: ['path'],

  // keys or params to lookup language from
  lookupQuerystring: 'lang',
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection,

    // we init with resources
    resources,
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;