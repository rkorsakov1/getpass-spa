import React from 'react';
import MetaTags from 'react-meta-tags';
import { CardContent, CardActions, Grid, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, IconButton } from '@material-ui/core';

import InputField from 'components/InputField';
import SwitchField from 'components/SwitchField';
import PasswordField from 'components/PasswordField';
import { copyToClipboard, generatePasswordImplementation, GeneratorState } from 'auxiliary';
import { ExpandMore, Settings, Security } from "@material-ui/icons";
import NumericInputField from 'components/NumericInputField';
import { NotificationContext } from 'components/NotifyWrapper';

import jdenticon from 'jdenticon';
import Loading from 'pages/Loading';
import { defaults } from "auxiliary";
import CardWrapper from 'components/CardWrapper';

class Generator extends React.Component {
    state = {
        valid: false,
        buttonText: 'Get Pass!',

        login: '',
        service: '',
        secret: '',
        counter: 0,

        showSettings: false,

        costFactor: 12,
        blockSizeFactor: 4,

        length: 18,
        lower: true,
        upper: true,
        number: true,
        special: true,

        password: '',

        isGenerating: false,
    }
    componentDidMount() {
        this.validate({ ...this.state });
    }
    onChange = (propName: string, value: any) => {
        this.setState({ [propName]: value });
        this.validate({ ...this.state, [propName]: value });
    }
    updateScrypt = (costFactor: number, blockSizeFactor: number) => {
        this.setState({ costFactor, blockSizeFactor });
    }
    validate = (newState: GeneratorState) => {
        const { login, service, secret, number, lower, upper, special } = newState;

        if (login.length === 0) {
            this.setState({ valid: false, buttonText: 'Please, enter your login' });
        }
        else if (service.length === 0) {
            this.setState({ valid: false, buttonText: 'Please, enter website' });
        }
        else if (secret.length === 0) {
            this.setState({ valid: false, buttonText: 'Please, enter secret keyword' });
        }
        else if (!(number || lower || upper || special)) {
            this.setState({ valid: false, buttonText: 'Alphabet cannot be empty!' });
        }
        else {
            this.setState({ valid: true, buttonText: 'Get Pass!' });
        }
    }

    generatePassword = async (notify: (message: string) => void) => {
        this.setState({ isGenerating: true });
        setTimeout(async () => {
            try {
                const pass = await generatePasswordImplementation(this.state);

                notify('Password is generated and copied to clipboard');
                this.setState({ password: pass, isGenerating: false });

                setTimeout(() => {
                    copyToClipboard(pass);
                }, 256);
            }
            catch{
                notify('Incompatible core params!');
                this.setState({ isGenerating: false });
            }
        }, 16);
    }

    renderInputFields = () => {
        const { onChange, state } = this;
        const { login,
            service, } = state;
        return (
            <>
                <Typography variant="caption" style={{ opacity: 0.34 }}>case sensitive</Typography>
                <InputField label='Login' value={login} onChange={(value: string) => onChange('login', value)} adornment={false} />
                <Typography variant="caption" style={{ opacity: 0.34 }}>case sensitive</Typography>
                <InputField label='Website' value={service} onChange={(value: string) => onChange('service', value)} adornment={false} />
            </>
        )
    }

    renderSecretField = () => {
        const { onChange, state } = this;
        const { secret } = state;
        return (
            <Grid container>
                <Grid item xs>
                    <InputField label='Secret keyword' value={secret} onChange={(value: string) => onChange('secret', value)} />
                </Grid>
                <Grid item>
                    <div dangerouslySetInnerHTML={{ __html: jdenticon.toSvg(secret, 60) }}
                        style={{ marginLeft: '8px', }}></div>
                </Grid>
            </Grid>
        );
    }

    renderAdvancedPanel = () => {
        const { onChange, state } = this;
        const {
            counter,
            lower,
            upper,
            number,
            special,
            length, } = state;
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
                            <SwitchField label='Numbers (0-9)' value={number} onChange={(value: boolean) => onChange('number', value)} />
                            <SwitchField label='Lower case (a-z)' value={lower} onChange={(value: boolean) => onChange('lower', value)} />
                            <SwitchField label='Upper case (A-Z)' value={upper} onChange={(value: boolean) => onChange('upper', value)} />
                            <SwitchField label='Special (!#$%&()*+,-.:;<=>?@[]^_{})' value={special} onChange={(value: boolean) => onChange('special', value)} />
                            <NumericInputField label='Password length' min={1} max={4096} value={length} onChange={(value: number) => onChange('length', value)} />
                            <NumericInputField label='Counter' min={0} max={4096} value={counter} onChange={(value: number) => onChange('counter', value)} />
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

    renderCorePanel = () => {
        const { onChange, state, updateScrypt } = this;
        const {
            blockSizeFactor,
            costFactor, } = state;

        const costHumanReadable = 1 << costFactor;
        const blockSizeHumanReadable = Math.round(1000 * costHumanReadable * blockSizeFactor * 128 / 1024 / 1024) / 1000;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary style={{ paddingLeft: '16px' }} expandIcon={<ExpandMore />}>
                    <Security color="secondary" />
                    <Typography variant="body1" style={{ paddingLeft: '12px' }}>Core tweaking</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ paddingRight: 2 }}>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Typography variant="caption">Warning: You must be confident in the changes you make. This directly affects the time of generating passwords, as well as the result itself. Moreover, in addition to the secret, you will need to remember the settings used here, if you changed them, in order to get the same passwords on different devices. You can always reset to the default settings.</Typography>
                        <NumericInputField label={`Cost factor: ${costHumanReadable}`} min={1} max={24} value={costFactor} onChange={(value: number) => onChange('costFactor', value)} />
                        <NumericInputField label={`Block size factor: ${blockSizeHumanReadable} Mb`} min={1} max={24} value={blockSizeFactor} onChange={(value: number) => onChange('blockSizeFactor', value)} />
                        <div>
                            <Button variant="contained" onClick={() => updateScrypt(12, 4)}>default</Button>
                            <Button variant="contained" style={{ marginLeft: '8px', }} onClick={() => updateScrypt(16, 8)}>tough</Button>
                        </div>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    renderGenerateButton = () => {
        const { state, generatePassword } = this;
        const {
            valid,
            buttonText,
            showSettings
        } = state;

        return (
            <Grid container spacing={24}>
                <Grid item xs
                    style={{ paddingRight: '0px', }}>
                    <NotificationContext.Consumer>
                        {({ updateMessage }) =>
                            <Button
                                style={{ height: '50px' }}
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!valid} onClick={() => generatePassword(updateMessage)}>
                                {buttonText}
                            </Button>
                        }
                    </NotificationContext.Consumer>
                </Grid>
                <Grid item>
                    <IconButton
                        style={{ marginRight: '8px', }}
                        color="secondary"
                        onClick={() => this.setState({ showSettings: !showSettings })}
                    >
                        <Settings />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    render() {
        const { state, renderInputFields, renderSecretField, renderAdvancedPanel, renderCorePanel, renderGenerateButton } = this;
        const { password, showSettings, isGenerating } = state;

        return (
            <React.Fragment>
                <MetaTags>
                    <title>Getpass | Strong Password Generator</title>
                    <meta name="description" content="Generate strong passwords on-demand. We don't store you data. Check our github repository for details." />
                </MetaTags>
                <Loading open={isGenerating} />
                <CardWrapper>
                    <CardContent>
                        <Grid container spacing={24}>
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
                    <CardActions style={{ backgroundColor: defaults.primaryColor }}>
                        <PasswordField label="Password" value={password} />
                    </CardActions>
                </CardWrapper>
            </React.Fragment>
        );
    }
};

export default Generator;
