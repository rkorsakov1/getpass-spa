import React from 'react';
import { getLanguageMeta, getLanguages } from 'i18n';
import { MenuItem, Select, Input, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { changeLanguageSafe } from 'i18n';
import { ILanguageMeta } from 'i18n/i18n';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const color = "#FAFAFA";
const styles = (theme: Theme): Record<"icon", CSSProperties | (() => CSSProperties)> => createStyles({
	icon: {
		fill: color,
	},
});

interface LanguagePickerProps extends WithStyles<typeof styles> {
	inverted?: boolean;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ inverted, classes }): JSX.Element => {
	const { i18n } = useTranslation();

	const onLanguageChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode): void =>
		changeLanguageSafe(event.target.value as string);

	const buildPicker = (): JSX.Element => {
		const languages: ILanguageMeta[] = getLanguages().map((language: string): ILanguageMeta => getLanguageMeta(language));

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
				{languages.map((language: ILanguageMeta): JSX.Element =>
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

export default withStyles(styles)(LanguagePicker);
