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
    q0, a0,
    q1, a1,
    q2, a2,
    q3, a3,
    q4, a4,
    q5, a5,
    q6, a6,
    q7, a7,
    q8, a8,
    q9, a9,
    q10, a10,
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