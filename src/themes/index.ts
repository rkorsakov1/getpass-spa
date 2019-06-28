import { createMuiTheme } from "@material-ui/core";
import { defaults } from "auxiliary";

const light = createMuiTheme({
    palette: {
        primary: { main: defaults.primaryColor },   //  Indigo[400]
        secondary: { main: defaults.accentColor }, //  Orange[600]
        type: 'light'
    },
    typography: { useNextVariants: true },
});

const dark = createMuiTheme({
    palette: {
        primary: { main: '#ffffff' },
        secondary: { main: '#ffffff' },
        type: 'dark'
    },
    typography: { useNextVariants: true },
});

export { light, dark };