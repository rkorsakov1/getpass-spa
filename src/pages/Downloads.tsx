import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { Android, Apple, AppleSafari, GoogleChrome, DesktopMac, Linux, Windows } from 'mdi-material-ui';

import { Icon, CardWrapper } from 'components';
import { useTranslation } from 'react-i18next';

interface IDownloadData {
	enabled: boolean,
	icon: JSX.Element,
	name: string,
	description: string,
	hyperlink: string
}

const baseURL = "https://github.com/stellarbear";

const Downloads: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const m = (path: string): string => t(path, { joinArrays: '  \n', });

	const DownloadData: IDownloadData[] = [
		{
			enabled: true,
			icon: <Android />,
			name: 'Android',
			description: m('downloads.android'),
			hyperlink: `${baseURL}/getpass-mobile`
		},
		{
			enabled: true,
			icon: <Apple />,
			name: 'IOS',
			description: m('downloads.ios'),
			hyperlink: `${baseURL}/getpass-mobile`
		},
		{
			enabled: true,
			icon: <GoogleChrome />,
			name: 'Chrome extension',
			description: m('downloads.chrome'),
			hyperlink: `${baseURL}/getpass-extension`
		},
		{
			enabled: false,
			icon: <AppleSafari />,
			name: 'Safari extension',
			description: m('downloads.safari'),
			hyperlink: `${baseURL}/getpass-extension`
		},
		{
			enabled: false,
			icon: <Windows />,
			name: 'Windows desktop',
			description: m('downloads.windows'),
			hyperlink: `${baseURL}/getpass-desktop`
		},
		{
			enabled: false,
			icon: <Linux />,
			name: 'Linux desktop',
			description: m('downloads.linux'),
			hyperlink: `${baseURL}/getpass-desktop`
		},
		{
			enabled: false,
			icon: <DesktopMac />,
			name: 'Mac desktop',
			description: m('downloads.macintosh'),
			hyperlink: `${baseURL}/getpass-desktop`
		},
	];

	const DownloadBlock = ({ enabled, icon, name, description, hyperlink }: IDownloadData, key: number) => {
		return (
			<div key={key}>
				<Grid item style={{ opacity: enabled ? 1.0 : 0.4 }}>
					<Grid container direction="row"
						alignItems="center">
						<Grid item style={{ padding: 8 }}>
							<Icon tooltip={name} onClick={() => window.open(hyperlink, '_blank')} enabled={enabled}>
								{icon}
							</Icon>
						</Grid>
						<Grid item xs>
							<Grid container direction="column">
								<Typography variant="h6">{name}</Typography>
								<Typography variant="body2"
									style={{ whiteSpace: 'pre-line' }}>{description}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Divider />
			</div>
		);
	};

	return (
		<CardWrapper>
			<Grid container direction="column" style={{ padding: 8 }}>
				{DownloadData.map((el: IDownloadData, i: number) => DownloadBlock(el, i))}
			</Grid>
		</CardWrapper>
	)
}

export default Downloads;
