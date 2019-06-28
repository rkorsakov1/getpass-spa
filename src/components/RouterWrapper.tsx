import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

interface Props {
	children: JSX.Element;
}

const navigation = createBrowserHistory();

const RouterWrapper = ({ children }: Props) => (
	<Router history={navigation}>
		{children}
	</Router>
);

export { RouterWrapper, navigation }
