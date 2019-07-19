import React from 'react';
import { CardContent, CardActions, Grid, Button } from '@material-ui/core';
//import {Helmet} from "react-helmet";

import { SwitchField, PasswordField, NumericInputField, InputField, NotificationContext, CardWrapper, Loading } from 'components';
import { copyToClipboard, randomImplementation } from 'auxiliary';
import { alphabet } from 'auxiliary/alphabet';
import colors from 'theme/colors';
import { IRandom } from 'auxiliary/random';

interface IValid {
	message: string,
	isValid: boolean
}

const Random: React.FC = (): JSX.Element => {
	const [valid, setValid] = React.useState<IValid>({
		message: 'Generate password',
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
			setValid({ isValid: true, message: 'Get Pass!' });
		} else {
			setValid({ isValid: false, message: 'Alphabet cannot be empty!' });
		}

		const newState = { ...state, customAlphabetValue, [propName]: value };
		setState(newState);
	}
	const generatePassword = async (notify: (message: string) => void) => {
		setIsGenerating(true);
		setTimeout(async () => {
			try {
				const pass = await randomImplementation(state);

				notify('Password is generated and copied to clipboard');
				setPassword(pass);

				setTimeout(() => {
					copyToClipboard(pass);
				}, 256);
			}
			catch{
				notify('Incompatible core params!');
			}
			finally {
				setIsGenerating(false);
			}
		}, 16);
	}

	const renderOptions = () => {
		const { length, lower, upper, number, special, } = state;
		return (
			<>
				<SwitchField label='Numbers (0-9)' value={number} onChange={(value: boolean) => onChange('number', value)} />
				<SwitchField label='Lower case (a-z)' value={lower} onChange={(value: boolean) => onChange('lower', value)} />
				<SwitchField label='Upper case (A-Z)' value={upper} onChange={(value: boolean) => onChange('upper', value)} />
				<SwitchField label='Special (!#$%&()*+,-.:;<=>?@[]^_{})' value={special} onChange={(value: boolean) => onChange('special', value)} />
				<NumericInputField label='Password length' min={1} max={4096} value={length} onChange={(value: number) => onChange('length', value)} />
			</>
		);
	}

	const renderCustomAlphabet = () => {
		const { customAlphabetFlag, customAlphabetValue, } = state;

		return (
			<>
				<SwitchField label='Custom alphabet' value={customAlphabetFlag} onChange={(value: boolean) => onChange('customAlphabetFlag', value)} />
				{customAlphabetFlag && <InputField label='alphabet' adornment={false} disabled={!customAlphabetFlag} value={customAlphabetValue} onChange={(value: string) => onChange('customAlphabetValue', value)} />}
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
					<PasswordField label="Password" value={password} />
				</CardActions>
			</CardWrapper>
		</React.Fragment>
	);
};

export default Random;
/*
<MetaTags>
					<title>Getpass | Strong Password Generator</title>
					<meta name="description" content="Generate strong passwords on-demand. We don't store you data. Check our github repository for details." />
					<HrefLang />
				</MetaTags>
*/
