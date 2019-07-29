import React from 'react';
import { baseURL, fallbackLng } from 'i18n';
import { Generate, Random, NotFound, QA, Downloads } from 'pages';
import { Route, Redirect } from 'react-router-dom';
import AnimatedSwitch from 'components/AnimatedSwitch';
import { HeadWrapper, NavigationWrapper, NotifyWrapper } from 'components';

function App() {
	return (
		<HeadWrapper>
			<NotifyWrapper>
				<NavigationWrapper>
					<AnimatedSwitch>
						<Route path={`${baseURL}/`} exact component={Generate} />
						<Route path={`${baseURL}/generator/`} exact component={Generate} />
						<Route path={`${baseURL}/download/`} exact component={Downloads} />
						<Route path={`${baseURL}/random/`} exact component={Random} />
						<Route path={`${baseURL}/faq/`} exact component={QA} />
						<Redirect from='/' exact to={`/${fallbackLng}`} />
						<Route component={NotFound} />
					</AnimatedSwitch>
				</NavigationWrapper>
			</NotifyWrapper>
		</HeadWrapper>
	);
}

export default App;
