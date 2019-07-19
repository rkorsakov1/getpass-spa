import React from 'react';
import { getLanguages, baseURL, getAfterPath } from 'i18n';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

interface HeadProps extends RouteComponentProps<any> {
	children: JSX.Element;
}

const HeadWrapper: React.FC<HeadProps> =
	({ children, history }) => {
		const alternateLanguages = getLanguages();
		const url = history.location.pathname;

		const { i18n } = useTranslation();
		const { language } = i18n;

		const canonical = () => (<link rel="canonical" href={`/${language}${getAfterPath(url)}`} hrefLang={language} />);
		const alternate = (altLanguage: string, i: number) =>
			(<link rel="alternate" key={i} href={`/${altLanguage}${getAfterPath(url)}`} hrefLang={altLanguage} />)

		return (
			<React.Fragment>
				<Helmet
					htmlAttributes={{ lang: "en", amp: undefined }} // amp takes no value
					titleTemplate="%s | React App"
					titleAttributes={{ itemprop: "name", lang: "en" }}
					meta={[
						{ name: "description", content: "Server side rendering example" },
						{ name: "viewport", content: "width=device-width, initial-scale=1" },
					]}
				>
					{canonical()}
					{alternateLanguages.map((altLanguage, i) => alternate(altLanguage, i))}
				</Helmet>
				{children}
			</React.Fragment>
		)
	}


export default withRouter(HeadWrapper);
