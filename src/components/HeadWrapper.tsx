import React from 'react';
import { getLanguages, getAfterPath } from 'i18n';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

interface HeadProps extends RouteComponentProps {
	children: JSX.Element;
}

const HeadWrapper: React.FC<HeadProps> =
	({ children, history }): JSX.Element => {
		const alternateLanguages = getLanguages();
		const url = history.location.pathname;

		const { i18n } = useTranslation();
		const { language } = i18n;

		const canonical = (): JSX.Element => (<link rel="canonical" href={`/${language}${getAfterPath(url)}`} hrefLang={language} />);
		const alternate = (altLanguage: string, i: number): JSX.Element =>
			(<link rel="alternate" key={i} href={`/${altLanguage}${getAfterPath(url)}`} hrefLang={altLanguage} />)

		return (
			<React.Fragment>
				<Helmet>
					{canonical()}
					{alternateLanguages.map((altLanguage: string, i: number): JSX.Element => alternate(altLanguage, i))}
				</Helmet>
				{children}
			</React.Fragment>
		)
	}


export default withRouter(HeadWrapper);
