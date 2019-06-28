import { useTranslation } from 'react-i18next';

enum locales {
    en = "en",
    ru = "ru"
}

enum I18n {
    NavigationQA,
    NavigationAbout,
    NavigationDownload,
    NavigationGenerator,
    NavigationRandom,
}

const at = (location: I18n) => {
    return location.toString();
};

export interface ILanguageMeta {
    assetPath: string,
    name: string,
    code: string
}

const getLanguageMeta = (inputLocale: string): ILanguageMeta => {
    switch (inputLocale) {
        //case locales.ru:
        //return { name: 'Русский', assetPath: 'rus.png', code: 'ru' };

        case locales.en:
        default:
            return { name: 'English', assetPath: 'eng.png', code: 'en' };
    }
}

export { getLanguageMeta, locales, at, I18n, useTranslation }