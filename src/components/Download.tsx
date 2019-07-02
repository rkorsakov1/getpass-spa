import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { GithubCircle, Android, Apple, AppleSafari, GoogleChrome } from 'mdi-material-ui';

import { Icon, navigation } from 'components';


const Navigation = () => (
    <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
    >
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Icon tooltip="Android" onClick={() => { }}>
                <Android />
            </Icon>
            <Icon tooltip="Apple" onClick={() => { }}>
                <Apple />
            </Icon>
            <Icon tooltip="Safari extension" onClick={() => { }}>
                <AppleSafari />
            </Icon>
            <Icon tooltip="Chrome extension" onClick={() => { }}>
                <GoogleChrome />
            </Icon>
            <Icon tooltip="Github sources" onClick={() => { }}>
                <GithubCircle />
            </Icon>
        </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Button onClick={() => navigation.push('/')}>Q&A     </Button>
            <Button onClick={() => navigation.push('/')}>Main   </Button>
            <Button onClick={() => navigation.push('/')}>Security</Button>
            <Button onClick={() => navigation.push('/')}>Contact</Button>
        </Grid>
    </Grid>
);

export default Navigation;