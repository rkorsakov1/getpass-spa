import React from 'react';
import { getLanguageMeta, getLanguages } from 'i18n';
import { MenuItem, Select, Input, withStyles, createStyles, Theme, InputBase, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { changeLanguageSafe } from 'i18n';
import { ILanguageMeta } from 'i18n/i18n';

const color = "#FAFAFA";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		icon: {
			fill: color,
		},
	}),
);

interface LanguagePickerProps {
	inverted?: boolean
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ inverted }) => {
	const classes = useStyles();
	const { i18n } = useTranslation();

	const onLanguageChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) =>
		changeLanguageSafe(event.target.value as string);

	const buildPicker = () => {
		const languages: ILanguageMeta[] = getLanguages().map((language: string) => getLanguageMeta(language));

		const { language } = i18n;
		const inputProps = inverted ? {
			classes: {
				icon: classes.icon,
			},
		} : undefined;

		return (
			<Select
				value={language}
				disableUnderline
				inputProps={inputProps}
				onChange={onLanguageChange}
				input={<Input name="lang" />}
			>
				{languages.map(language =>
					<MenuItem key={language.code} value={language.code}>
						<img
							height="18" width="18"
							alt={`language: ${language.code}`}
							src={require(`assets/localization/${language.assetPath}`)}
							style={{ verticalAlign: "middle" }} />
					</MenuItem>
				)}
			</Select>
		);
	}

	return buildPicker();
}

LanguagePicker.defaultProps = {
	inverted: false,
};

export default LanguagePicker;
