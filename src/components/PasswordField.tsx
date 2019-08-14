import React from 'react';
import { useState } from "react";
import { TextField, InputAdornment, IconButton, Grid, Tooltip, Zoom, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';
import { FileCopy, Visibility, VisibilityOff } from "@material-ui/icons";
import { copyToClipboard } from 'auxiliary';
import { light, dark } from 'theme';

interface Props {
	value: string;
	label: string;
}

const PasswordField = ({ value, label }: Props): JSX.Element => {
	const [isVisible, setVisibility] = useState(false);

	return (
		<Grid container style={{ margin: 8 }}>
			<ThemeProvider theme={dark}>
				<Grid item xs>
					<TextField
						fullWidth
						autoComplete="off"
						variant="outlined"
						value={value}
						label={label}
						type={isVisible ? 'text' : 'password'}
						aria-label={`password value`}
						InputProps={{
							readOnly: true,
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="password visibility"
										color="secondary"
										onClick={(): void => setVisibility(!isVisible)}
									>
										{isVisible ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item style={{ marginLeft: 24, marginTop: 4 }}>
					<Tooltip TransitionComponent={Zoom} title='Copy' style={{ fontSize: 40 }}>
						<IconButton
							color="secondary"
							onClick={(): void => copyToClipboard(value)}
						>
							<FileCopy />
						</IconButton>
					</Tooltip>
				</Grid>
				<ThemeProvider theme={light}>
					<CssBaseline />
				</ThemeProvider>
			</ThemeProvider>
		</Grid >
	);
}

export default PasswordField;
