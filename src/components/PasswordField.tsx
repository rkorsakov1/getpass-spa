import React from 'react';
import { useState } from "react";
import { TextField, InputAdornment, IconButton, Grid, Tooltip, Zoom, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { FileCopy, Visibility, VisibilityOff } from "@material-ui/icons";
import { copyToClipboard } from 'auxiliary';
import { light, dark } from 'themes';

interface Props {
    value: string,
    label: string,
}

export default ({ value, label }: Props) => {
    const [isVisible, setVisibility] = useState(false);

    return (
        <Grid container style={{ margin: 8 }}>
            <MuiThemeProvider theme={dark}>
                <Grid item xs>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={value}
                        label={label}
                        type={isVisible ? 'text' : 'password'}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        color="secondary"
                                        onClick={() => setVisibility(!isVisible)}
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
                            onClick={() => copyToClipboard(value)}
                        >
                            <FileCopy />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <MuiThemeProvider theme={light}>
                    <CssBaseline />
                </MuiThemeProvider>
            </MuiThemeProvider>
        </Grid >
    );
}
