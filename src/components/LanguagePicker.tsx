import React from 'react';
import { getLanguageMeta, getLanguages } from 'i18n';
import { MenuItem, Select, Input } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { changeLanguageSafe } from 'i18n';
import { ILanguageMeta } from 'i18n/i18n';


const LanguagePicker: React.FC = () => {
	const { i18n } = useTranslation();

	const onLanguageChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) =>
		changeLanguageSafe(event.target.value as string);

	const buildPicker = () => {
		const languages: ILanguageMeta[] = getLanguages().map((language: string) => getLanguageMeta(language));

		const { language } = i18n;

		return (
			<Select
				value={language}
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
