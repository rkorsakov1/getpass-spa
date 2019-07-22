import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface TitleProps {
	children: JSX.Element,
	componentName: string
}

const TitleWrapper: React.FC<TitleProps> =
	({ children, componentName }) => {
		const { t } = useTranslation();

		return (
			<React.Fragment>
				<Helmet>
					<title>{t(`meta.title.${componentName}`)}</title>
					<meta name="description" content={t(`meta.description.${componentName}`)} />
				</Helmet>
				{children}
			</React.Fragment>
		)
	}

export default TitleWrapper;
