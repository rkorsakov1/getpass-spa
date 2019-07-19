import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const paramName = 'lang';
const fallbackLng = 'en';
enum languages {
	en = "en",
	ru = "ru"
}

const getLanguages = (): string[] => Object.values(languages)

const detection = {
	order: ['path'],
	lookupQuerystring: paramName,
};

// for browser use xhr backend to load translations and browser lng detector
if (process && !process.release) {
	i18n
		.use(XHR)
		.use(initReactI18next)
		.use(LanguageDetector);
}

// initialize if not already initialized
if (!i18n.isInitialized) {
	i18n.init({
		detection,

		fallbackLng,
		whitelist: getLanguages(),
		load: 'languageOnly',

		ns: ['translations'],
		defaultNS: 'translations',

		saveMissing: true,
		debug: true,

		interpolation: {
			escapeValue: false,
		},
	});
}



export interface ILanguageMeta {
	assetPath: string;
	name: string;
	code: string;
}

const getLanguageMeta = (inputLocale: string): ILanguageMeta => {
	switch (inputLocale) {
		case languages.ru:
			return { name: 'Русский', assetPath: 'rus.png', code: 'ru' };

		case languages.en:
		default:
			return { name: 'English', assetPath: 'eng.png', code: 'en' };
	}
}

const getAfterPath = (url: string): string => url.replace(new RegExp(`/(${getLanguages().join('|')})`, "gm"), "");

const changeLanguageSafe = (newLanguage = fallbackLng): void => {
	i18n.changeLanguage(newLanguage);

	//  I'm not proud of this way, but i need to somehow replace url without page reloading
	//  #tricky
	const newUrl = `/${newLanguage}${getAfterPath(window.location.pathname)}`;
	window.history.replaceState("", "", newUrl);
}

export { i18n, paramName, fallbackLng, changeLanguageSafe, getLanguageMeta, getLanguages, getAfterPath };
