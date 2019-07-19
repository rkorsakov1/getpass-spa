import { createMuiTheme } from "@material-ui/core";
import colors from "./colors";

const light = createMuiTheme({
	palette: {
		primary: { main: colors.primaryColor },   //  Indigo[400]
		secondary: { main: colors.accentColor }, //  Orange[600]
		type: 'light'
	},
});

export default light;
