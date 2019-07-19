import { i18n, paramName, fallbackLng, changeLanguageSafe, getLanguageMeta, getLanguages, getAfterPath } from './i18n';

const baseURL = `/:${paramName}(${getLanguages().join('|')})`;

export { i18n, getLanguageMeta, getLanguages, baseURL, fallbackLng, changeLanguageSafe, getAfterPath };
