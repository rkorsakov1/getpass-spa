import React from 'react';
import { locales, useTranslation, fallback } from 'localization';

const HrefLang = () => {
	const { i18n } = useTranslation();
	const language = fallback(i18n.language);
	const alternateLanguages = Object.values(locales).filter(el => el !== language);

	const url = window.location.href;

	const canonical = () => (<link rel="canonical" href={url} hrefLang={language} />);
	const alternate = (altLanguage: string) => (<link rel="alternate" href={url.replace(`/${language}/`, `/${altLanguage}/`)} hrefLang={altLanguage} />);

	debugger;
	return (
		<React.Fragment>
			{canonical()}
			{alternateLanguages.map(altLanguage => alternate(altLanguage))}
		</React.Fragment>
	)
}

export { HrefLang };