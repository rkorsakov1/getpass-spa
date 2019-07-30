import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
import { StaticRouterContext } from 'react-router';

import fs from 'fs';
import path from 'path';
import express from 'express';

import App from './app';
import Backend from 'i18next-node-fs-backend';
import { I18nextProvider } from 'react-i18next';
import { i18n, getLanguages, fallbackLng } from 'i18n';
import { LanguageDetector, handle } from "i18next-express-middleware";


import { theme } from 'theme';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';

import customCss from "css";
import "fonts/index.css";


interface IAsset {
	js: string;
	css: string;
}

interface IAssets {
	client: IAsset;
}

interface ITemplate {
	ssrCss: string;
	customCss: string;
	markup: string;
	assets: IAssets;
	helmet: HelmetData;
	initialLanguage: string;
	initialI18nStore: i18n.ResourceLanguage;
}

declare module "express" {
	export interface Request {
		i18n: i18n.i18n;
	}
}

const server = express();
const appSrc: string = path.resolve(fs.realpathSync(process.cwd()), 'src');

const template = ({ helmet, markup, assets, initialI18nStore, initialLanguage, ssrCss, customCss }: ITemplate): string => (`
<!doctype html>
<html lang="${initialLanguage}">
<head>
	<base href="/" />
	${helmet.meta.toString()}
	${helmet.link.toString()}
	${helmet.title.toString()}
	<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
	<meta charSet='utf-8' />
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="manifest" href="/manifest.json">
	<style id="jss-server-side">${ssrCss}</style>

	${process.env.NODE_ENV === 'production'
		? `<script src="${assets.client.js}" defer></script>`
		: `<script src="${assets.client.js}" defer crossorigin></script>`}
	${assets.client.css
		? `<link rel="stylesheet" href="${assets.client.css}">`
		: ''}

	<style>${customCss}</style>

	<script>
		window.initialI18nStore = JSON.parse('${JSON.stringify(
		initialI18nStore
		/* eslint-disable-next-line no-useless-escape */
	).replace(/[\/\(\)\']/g, '\\$&')}');
		window.initialLanguage = '${initialLanguage}';
	</script>
</head>
<body>
	<div class="desktop">
		<div class="background">
		<div class="wave _one"></div>
		<div class="wave _two"></div>
		<div class="wave _three"></div>
		</div>
	</div>

	<div class="mobile">
		<div class="background">
			<div class="wave"></div>
		</div>
	</div>

	<div class="content">
	<div id="root">${markup}</div>
	  <div id="clipboard"></div>
	</div>
</body>
</html>
`);

const i18nOptions = {
	fallbackLng,
	debug: false,
	preload: getLanguages(),
	ns: ['translations'],
	defaultNS: 'translations',
	backend: {
		loadPath: `${appSrc}/i18n/locales/{{lng}}/{{ns}}.json`,
		addPath: `${appSrc}/i18n/locales/{{lng}}/{{ns}}.missing.json`,
	},
};

const minifyCss = (css: string): string => {
	css = css.replace(': ', ':');

	const replaceArray = ["\r\n", "\r", "\n", "\t", '  ', '    ', '    '];
	css = css.replace(RegExp('/' + replaceArray.join('|') + '/', 'g'), '');

	return css;
}

i18n
	.use(Backend)
	.use(LanguageDetector)
	.init(
		i18nOptions,
		(): void => {
			server
				.disable('x-powered-by')
				.use(handle(i18n))
				.use('/locales', express.static(`${appSrc}/i18n/locales`))
				.use(express.static(process.env.RAZZLE_PUBLIC_DIR as string))
				.get('/*', async (req: express.Request, res: express.Response): Promise<void> => {
					const context: StaticRouterContext = {};
					const sheets: ServerStyleSheets = new ServerStyleSheets();

					const markup: string = renderToString(
						sheets.collect(
							<ThemeProvider theme={theme}>
								<I18nextProvider i18n={req.i18n}>
									<StaticRouter context={context} location={req.url}>
										<App />
									</StaticRouter>
								</I18nextProvider>
							</ThemeProvider>
						),
					);

					const { url } = context;
					if (url) {
						res.redirect(url);
					} else {
						const assets: IAssets = await import(process.env.RAZZLE_ASSETS_MANIFEST as string);

						res.status(200).send(
							template({
								assets,
								markup,
								customCss: minifyCss(customCss),
								ssrCss: minifyCss(sheets.toString()),
								helmet: Helmet.renderStatic(),
								initialLanguage: req.i18n.language,
								initialI18nStore: req.i18n.services.resourceStore.data
							}),
						);
					}
				});
		},
	);

export default server;
