import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { Android, Apple, AppleSafari, GoogleChrome, DesktopMac, Linux, Windows } from 'mdi-material-ui';

import { Icon, CardWrapper} from 'components';

interface IDownloadData {
    enabled: boolean,
    icon: JSX.Element,
    name: string,
    description: string,
    hyperlink: string
}

const baseURL = "https://github.com/stellarbear";

const Downloads = () => {

    const DownloadData: IDownloadData[] = [
        {
            enabled: true,
            icon: <Android />,
            name: 'Android',
            description: 'Prebuilt *.apk files available.\nGoogle Play version is scheduled (late summer).',
            hyperlink: `${baseURL}/getpass-mobile`
        },
        {
            enabled: true,
            icon: <Apple />,
            name: 'IOS',
            description: 'You can manually build *.ipa from source code (if you have ADP account).\nApp Store version is scheduled (late autumn).',
            hyperlink: `${baseURL}/getpass-mobile`
        },
        {
            enabled: true,
            icon: <GoogleChrome />,
            name: 'Chrome extension',
            description: 'Prebuilt packed archive is available (through developer mode).\nChrome store version is scheduled (late summer).',
            hyperlink: `${baseURL}/getpass-extension`
        },
        {
            enabled: false,
            icon: <AppleSafari />,
            name: 'Safari extension',
            description: 'Under development.\nLate summer.',
            hyperlink: `${baseURL}/getpass-extension`
        },
        {
            enabled: false,
            icon: <Windows />,
            name: 'Windows desktop',
            description: 'Under development\nLate autumn.',
            hyperlink: `${baseURL}/getpass-desktop`
        },
        {
            enabled: false,
            icon: <Linux />,
            name: 'Linux desktop',
            description: 'Under development\nLate autumn.',
            hyperlink: `${baseURL}/getpass-desktop`
        },
        {
            enabled: false,
            icon: <DesktopMac />,
            name: 'Mac desktop',
            description: 'Under development\nLate summer.',
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