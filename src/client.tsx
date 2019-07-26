import { hydrate } from 'react-dom';
import { useSSR } from 'react-i18next';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'i18n';

import App from './app';

import { theme } from 'theme';
import { ThemeProvider } from '@material-ui/styles';

declare global {
	interface Window {
		initialLanguage: string;
		initialI18nStore: string;
	}
}

const BaseApp = (): JSX.Element => {
	const { initialI18nStore, initialLanguage } = window;
	useSSR(initialI18nStore, initialLanguage);

	React.useEffect((): void => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			if (jssStyles.parentNode){
				jssStyles.parentNode.removeChild(jssStyles);
			}
		}
	}, []);

	return (
		<Suspense fallback={<div>Still loading i18n...</div>}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</Suspense>
	);
};

hydrate(
	<BaseApp />,
	document.getElementById('root'),
);

if (module.hot) {
	module.hot.accept();
}
