import React, { useEffect } from 'react';
import { CardContent, CardActions, Grid, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, IconButton } from '@material-ui/core';
//import {Helmet} from "react-helmet";

import { Loading, InputField, SwitchField, PasswordField, NumericInputField, NotificationContext, CardWrapper, MarkDown } from 'components';
import { copyToClipboard, generateImplementation } from 'auxiliary';
import { ExpandMore, Settings, Security } from "@material-ui/icons";

import jdenticon from 'jdenticon';
import { IGenerate } from 'auxiliary/generate';
import colors from 'theme/colors';
import { useTranslation } from 'react-i18next';

interface IValid {
	message: string,
	isValid: boolean
}

const Generate: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const m = (path: string): string => t(path, { joinArrays: '  \n', });

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

	useEffect(() => {
		validate(state);
	}, []);

	const onChange = (propName: string, value: any) => {
		const newState = { ...state, [propName]: value };
		setState(newState);
		validate(newState);
	}
	const resetScrypt = (costFactor: number, blockSizeFactor: number) => {
		setState({ ...state, costFactor, blockSizeFactor });
	}

	const validate = (newState: IGenerate) => {
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

	const generatePassword = async (notify: (message: string) => void) => {
		setIsGenerating(true);
		setTimeout(async () => {
			try {
				const pass = await generateImplementation(state);

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

	const renderInputFields = () => {
		const { login, service } = state;
		return (
			<React.Fragment>
				<Typography variant="caption" style={{ opacity: 0.34 }}>{t('general.caseSensitive')}</Typography>
				<InputField label={t('generate.input.login')} value={login} onChange={(value: string) => onChange('login', value)} adornment={false} />
				<Typography variant="caption" style={{ opacity: 0.34 }}>{t('general.caseSensitive')}</Typography>
				<InputField label={t('generate.input.website')} value={service} onChange={(value: string) => onChange('service', value)} adornment={false} />
			</React.Fragment>
		)
	}

	const renderSecretField = () => {
		const { secret } = state;
		return (
			<Grid container>
				<Grid item xs>
					<InputField label={t('generate.input.secret')} value={secret} onChange={(value: string) => onChange('secret', value)} />
				</Grid>
				<Grid item>
					<div dangerouslySetInnerHTML={{ __html: jdenticon.toSvg(secret, 60) }}
						style={{ marginLeft: '8px', }}></div>
				</Grid>
			</Grid>
		);
	}

	const renderAdvancedPanel = () => {
		const { counter, lower, upper, number, special, length, } = state;
		return (
			<div>
				<ExpansionPanel
					style={{ marginBottom: '8px', marginTop: '8px', }}>
					<ExpansionPanelSummary style={{ paddingLeft: '16px' }} expandIcon={<ExpandMore />}>
						<Settings color="secondary" />
						<Typography variant="body1" style={{ paddingLeft: '12px' }}>Advanced settings</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{ paddingRight: 2 }}>
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="flex-start"
						>
							<SwitchField label={t('generate.settings.number')} value={number} onChange={(value: boolean) => onChange('number', value)} />
							<SwitchField label={t('generate.settings.lower')} value={lower} onChange={(value: boolean) => onChange('lower', value)} />
							<SwitchField label={t('generate.settings.upper')} value={upper} onChange={(value: boolean) => onChange('upper', value)} />
							<SwitchField label={t('generate.settings.special')} value={special} onChange={(value: boolean) => onChange('special', value)} />
							<NumericInputField label={t('generate.settings.length')} min={1} max={4096} value={length} onChange={(value: number) => onChange('length', value)} />
							<NumericInputField label={t('generate.settings.counter')} min={0} max={4096} value={counter} onChange={(value: number) => onChange('counter', value)} />
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}

	const renderCorePanel = () => {
		const { blockSizeFactor, costFactor, } = state;

		const costHumanReadable = 1 << costFactor;
		const blockSizeHumanReadable = Math.round(1000 * costHumanReadable * blockSizeFactor * 128 / 1024 / 1024) / 1000;
		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary style={{ paddingLeft: '16px' }} expandIcon={<ExpandMore />}>
						<Security color="secondary" />
						<Typography variant="body1" style={{ paddingLeft: '12px' }}>Core tweaking</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="flex-start"
						>
							<MarkDown source={m('generate.settings.scrypt.warning')} />
							<NumericInputField label={`${t('generate.settings.scrypt.cost')}: ${costHumanReadable}`} min={1} max={24} value={costFactor} onChange={(value: number) => onChange('costFactor', value)} />
							<NumericInputField label={`${t('generate.settings.scrypt.blockSize')}: ${blockSizeHumanReadable} Mb`} min={1} max={24} value={blockSizeFactor} onChange={(value: number) => onChange('blockSizeFactor', value)} />
							<div>
								<Button variant="contained" onClick={() => resetScrypt(12, 4)}>default</Button>
								<Button variant="contained" style={{ marginLeft: '8px', }} onClick={() => resetScrypt(16, 8)}>tough</Button>
							</div>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}

	const renderGenerateButton = () => {
		const { message, isValid } = valid;

		return (
			<Grid container>
				<Grid item xs
					style={{ paddingRight: '12px', }}>
					<NotificationContext.Consumer>
						{({ updateMessage }) =>
							<Button
								style={{ height: '50px' }}
								fullWidth
								variant="contained"
								color="primary"
								disabled={!isValid} onClick={() => generatePassword(updateMessage)}>
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
						onClick={() => setShowSettings(!showSettings)}
					>
						<Settings />
					</IconButton>
				</Grid>
			</Grid>
		);
	}

	return (
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
	);
};

export default Generate;

/*

                <MetaTags>
                    <title>Getpass | Strong Password Generator</title>
                    <meta name="description" content="Generate strong passwords on-demand. We don't store you data. Check our github repository for details." />
                    <HrefLang />
                </MetaTags>
*/
