import React from 'react';
import { CardContent, CardActions, Grid, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, IconButton } from '@material-ui/core';

import { Loading, InputField, SwitchField, PasswordField, NumericInputField, NotificationContext, CardWrapper, MarkDown, TitleWrapper } from 'components';
import { copyToClipboard, generateImplementation } from 'auxiliary';
import { ExpandMore, Settings, Security } from "@material-ui/icons";

import jdenticon from 'jdenticon';
import { IGenerate } from 'auxiliary/generate';
import colors from 'theme/colors';
import { useTranslation } from 'react-i18next';

interface IValid {
	message: string;
	isValid: boolean;
}

const Generate: React.FC = (): JSX.Element => {
	const { t, i18n } = useTranslation();
	const m = (path: string): string => t(path, { joinArrays: '  \n', });

	const [language, setLanguage] = React.useState<string>();
	const [valid, setValid] = React.useState<IValid>({
		message: t('generate.mainButton.loginMissing'),
		isValid: false
	});

	const [showSettings, setShowSettings] = React.useState<boolean>(false);
	const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
	const [password, setPassword] = React.useState<string>('');

	const [state, setState] = React.useState<IGenerate>({
		login: '',
		service: '',
		secret: '',
		counter: 0,

		costFactor: 12,
		blockSizeFactor: 4,

		length: 18,
		lower: true,
		upper: true,
		number: true,
		special: true,
	});

	const validate = (newState: IGenerate): void => {
		const { login, service, secret, number, lower, upper, special } = newState;


		if (login.length === 0) {
			setValid({ isValid: false, message: t('generate.mainButton.loginMissing') });
		}
		else if (service.length === 0) {
			setValid({ isValid: false, message: t('generate.mainButton.websiteMissing') });
		}
		else if (secret.length === 0) {
			setValid({ isValid: false, message: t('generate.mainButton.secretMissing') });
		}
		else if (!(number || lower || upper || special)) {
			setValid({ isValid: false, message: t('generate.mainButton.wrongAlphabet') });
		}
		else {
			setValid({ isValid: true, message: t('generate.mainButton.validInput') });
		}
	}

	if (language != i18n.language) {
		validate(state);
		setLanguage(i18n.language);
	}

	const onChange = (propName: string, value: boolean | number | string): void => {
		const newState = { ...state, [propName]: value };
		setState(newState);
		validate(newState);
	}
	const resetScrypt = (costFactor: number, blockSizeFactor: number): void => {
		setState({ ...state, costFactor, blockSizeFactor });
	}

	const generatePassword = (notify: (message: string) => void): void => {
		setIsGenerating(true);
		setTimeout(async (): Promise<void> => {
			try {
				const pass = await generateImplementation(state);

				notify(t('notify.passwordIsGenerated'));
				setPassword(pass);

				setTimeout((): void => {
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

	const renderInputFields = (): JSX.Element => {
		const { login, service } = state;
		return (
			<React.Fragment>
				<Typography variant="caption" style={{ opacity: 0.34 }}>{t('general.caseSensitive')}</Typography>
				<InputField label={t('generate.input.login')} value={login} onChange={(value: string): void => onChange('login', value)} adornment={false} />
				<Typography variant="caption" style={{ opacity: 0.34 }}>{t('general.caseSensitive')}</Typography>
				<InputField label={t('generate.input.website')} value={service} onChange={(value: string): void => onChange('service', value)} adornment={false} />
			</React.Fragment>
		)
	}

	const renderSecretField = (): JSX.Element => {
		const { secret } = state;
		return (
			<Grid container>
				<Grid item xs>
					<InputField label={t('generate.input.secret')} value={secret} onChange={(value: string): void => onChange('secret', value)} />
				</Grid>
				<Grid item>
					<div dangerouslySetInnerHTML={{ __html: jdenticon.toSvg(secret, 60) }}
						style={{ marginLeft: '8px', }}></div>
				</Grid>
			</Grid>
		);
	}

	const renderAdvancedPanel = (): JSX.Element => {
		const { counter, lower, upper, number, special, length, } = state;
		const pre = 'generate.settings.advanced';
		return (
			<div>
				<ExpansionPanel
					style={{ marginBottom: '8px', marginTop: '8px', }}>
					<ExpansionPanelSummary style={{ paddingLeft: '16px' }} expandIcon={<ExpandMore />}>
						<Settings color="secondary" />
						<Typography variant="body1" style={{ paddingLeft: '12px' }}>{t(`${pre}.title`)}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{ paddingRight: 2 }}>
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="flex-start"
						>
							<SwitchField label={t(`${pre}.number`)} value={number} onChange={(value: boolean): void => onChange('number', value)} />
							<SwitchField label={t(`${pre}.lower`)} value={lower} onChange={(value: boolean): void => onChange('lower', value)} />
							<SwitchField label={t(`${pre}.upper`)} value={upper} onChange={(value: boolean): void => onChange('upper', value)} />
							<SwitchField label={t(`${pre}.special`)} value={special} onChange={(value: boolean): void => onChange('special', value)} />
							<NumericInputField label={t(`${pre}.length`)} min={1} max={4096} value={length} onChange={(value: number): void => onChange('length', value)} />
							<NumericInputField label={t(`${pre}.counter`)} min={0} max={4096} value={counter} onChange={(value: number): void => onChange('counter', value)} />
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}

	const renderCorePanel = (): JSX.Element => {
		const { blockSizeFactor, costFactor, } = state;
		const pre = 'generate.settings.scrypt';

		const costHumanReadable = 1 << costFactor;
		const blockSizeHumanReadable = Math.round(1000 * costHumanReadable * blockSizeFactor * 128 / 1024 / 1024) / 1000;
		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary style={{ paddingLeft: '16px' }} expandIcon={<ExpandMore />}>
						<Security color="secondary" />
						<Typography variant="body1" style={{ paddingLeft: '12px' }}>{t(`${pre}.title`)}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="flex-start"
						>
							<MarkDown source={m(`${pre}.warning`)} />
							<NumericInputField label={`${t(`${pre}.cost`)}: ${costHumanReadable}`} min={1} max={24} value={costFactor} onChange={(value: number): void => onChange('costFactor', value)} />
							<NumericInputField label={`${t(`${pre}.blockSize`)}: ${blockSizeHumanReadable} Mb`} min={1} max={24} value={blockSizeFactor} onChange={(value: number): void => onChange('blockSizeFactor', value)} />
							<div>
								<Button variant="contained" onClick={(): void => resetScrypt(12, 4)}>default</Button>
								<Button variant="contained" style={{ marginLeft: '8px', }} onClick={(): void => resetScrypt(16, 8)}>tough</Button>
							</div>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}

	const renderGenerateButton = (): JSX.Element => {
		const { message, isValid } = valid;

		return (
			<Grid container>
				<Grid item xs
					style={{ paddingRight: '12px', }}>
					<NotificationContext.Consumer>
						{({ updateMessage }): JSX.Element =>
							<Button
								style={{ height: '50px' }}
								fullWidth
								variant="contained"
								color="primary"
								disabled={!isValid} onClick={(): void => generatePassword(updateMessage)}>
								{message}
							</Button>
						}
					</NotificationContext.Consumer>
				</Grid>
				<Grid item>
					<IconButton
						aria-label="show advanced settings"
						style={{ marginRight: '8px', }}
						color="secondary"
						onClick={(): void => setShowSettings(!showSettings)}
					>
						<Settings />
					</IconButton>
				</Grid>
			</Grid>
		);
	}

	return (
		<TitleWrapper componentName="generate">
			<React.Fragment>
				<Loading open={isGenerating} />
				<CardWrapper>
					<CardContent>
						<Grid container spacing={8}>
							<Grid item xs={12} style={{ width: 600 }}>
								<Grid container direction="column" >
									{renderInputFields()}
									{renderSecretField()}
									{renderGenerateButton()}
									{showSettings ?
										<>
											{renderAdvancedPanel()}
											{renderCorePanel()}
										</> : <></>}

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

export default Generate;
