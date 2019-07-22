import React from 'react';
import { CardContent, CardActions, Grid, Button } from '@material-ui/core';
//import {Helmet} from "react-helmet";

import { SwitchField, PasswordField, NumericInputField, InputField, NotificationContext, CardWrapper, Loading, TitleWrapper } from 'components';
import { copyToClipboard, randomImplementation } from 'auxiliary';
import { alphabet } from 'auxiliary/alphabet';
import colors from 'theme/colors';
import { IRandom } from 'auxiliary/random';
import { useTranslation } from 'react-i18next';

interface IValid {
	message: string,
	isValid: boolean
}

const Random: React.FC = (): JSX.Element => {
	const { t } = useTranslation();

	const [valid, setValid] = React.useState<IValid>({
		message: t('random.mainButton.validInput'),
		isValid: true
	});
	const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
	const [password, setPassword] = React.useState<string>('');

	const [state, setState] = React.useState<IRandom>({
		customAlphabetFlag: false,
		customAlphabetValue: alphabet({
			lower: true,
			upper: true,
			number: true,
			special: true,
		}),
		lower: true,
		upper: true,
		number: true,
		special: true,
		length: 18,
	});

	const onChange = (propName: string, value: any) => {
		const { customAlphabetFlag } = state;
		const customAlphabetValue = customAlphabetFlag ? alphabet(state) : Array.from(new Set(state.customAlphabetValue.split(''))).join('');

		if (customAlphabetValue.length > 0) {
			setValid({ isValid: true, message: t('random.mainButton.validInput') });
		} else {
			setValid({ isValid: false, message: t('random.mainButton.wrongAlphabet') });
		}

		const newState = { ...state, customAlphabetValue, [propName]: value };
		setState(newState);
	}
	const generatePassword = async (notify: (message: string) => void) => {
		setIsGenerating(true);
		setTimeout(async () => {
			try {
				const pass = await randomImplementation(state);

				notify(t('notify.passwordIsGenerated'));
				setPassword(pass);

				setTimeout(() => {
					copyToClipboard(pass);
				}, 256);
			}
			catch{
				notify(t('notify.incompatibleParams'));
			}
			finally {
				setIsGenerating(false);
			}
		}, 16);
	}

	const renderOptions = () => {
		const { length, lower, upper, number, special, } = state;
		return (
			<React.Fragment>
				<SwitchField label={t('random.settings.number')} value={number} onChange={(value: boolean) => onChange('number', value)} />
				<SwitchField label={t('random.settings.lower')} value={lower} onChange={(value: boolean) => onChange('lower', value)} />
				<SwitchField label={t('random.settings.upper')} value={upper} onChange={(value: boolean) => onChange('upper', value)} />
				<SwitchField label={t('random.settings.special')} value={special} onChange={(value: boolean) => onChange('special', value)} />
				<NumericInputField label={t('random.settings.length')} min={1} max={4096} value={length} onChange={(value: number) => onChange('length', value)} />
			</React.Fragment>
		);
	}

	const renderCustomAlphabet = () => {
		const { customAlphabetFlag, customAlphabetValue, } = state;

		return (
			<>
				<SwitchField label={t('random.alphabet.custom')} value={customAlphabetFlag} onChange={(value: boolean) => onChange('customAlphabetFlag', value)} />
				{customAlphabetFlag && <InputField label={t('random.alphabet.label')} adornment={false} disabled={!customAlphabetFlag} value={customAlphabetValue} onChange={(value: string) => onChange('customAlphabetValue', value)} />}
			</>
		);
	}

	const renderGenerateButton = () => {
		const { isValid, message, } = valid;

		return (
			<NotificationContext.Consumer>
				{({ updateMessage }) =>
					<Button variant="contained" color="primary" disabled={!isValid} onClick={() => generatePassword(updateMessage)}>
						{message}
					</Button>
				}
			</NotificationContext.Consumer>);
	}

	return (
		<TitleWrapper componentName="random">
			<React.Fragment>
				<Loading open={isGenerating} />
				<CardWrapper>
					<CardContent>
						<Grid container spacing={8}>
							<Grid item xs={12} style={{ width: 600 }}>
								<Grid container direction="column" >
									{renderOptions()}
									{renderCustomAlphabet()}
									{renderGenerateButton()}
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
					<CardActions style={{ backgroundColor: colors.primaryColor }}>
						<PasswordField label={t('general.password')} value={password} />
					</CardActions>
				</CardWrapper>
			</React.Fragment>
		</TitleWrapper>
	);
};

export default Random;
