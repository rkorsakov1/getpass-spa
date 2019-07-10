import React from 'react';
import { getLanguageMeta, locales, ILanguageMeta, fallback } from 'localization';
import { MenuItem, Select, Input } from '@material-ui/core';
import { useTranslation } from 'react-i18next';


const LanguagePicker = () => {
    const { i18n } = useTranslation();

    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const oldLang = fallback(i18n.language);
        i18n.changeLanguage(event.target.value);
        const newLang = fallback(i18n.language);

        //  I'm not proud of this way, but i need to somehow replace url without page reloading
        //  #tricky
        const newUrl = window.location.pathname.replace(`/${oldLang}/`, `/${newLang}/`);
        window.history.replaceState("", "", newUrl);
    }

    const buildPicker = () => {
        const localeCodes: string[] = Object.values(locales);
        const languages: ILanguageMeta[] = localeCodes.map((locale: string) => getLanguageMeta(locale));

        const currentLanguage = fallback(i18n.language);

        return (
            <Select
                value={currentLanguage}
                onChange={onLanguageChange}
                input={<Input name="lang" />}
            >
                {languages.map(language =>
                    <MenuItem key={language.code} value={language.code}>
                        <img
                            alt={`language: ${language.code}`}
                            src={require(`assets/localization/${language.assetPath}`)}
                            height="18"
                            width="18" />
                    </MenuItem>
                )}
            </Select>
        );
    }

    return buildPicker();
}

export default LanguagePicker;