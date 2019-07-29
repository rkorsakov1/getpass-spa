import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import 'css/router-animation.css';


const AnimatedSwitch: React.FC<RouteComponentProps> = ({ location, children }): JSX.Element => (
	<TransitionGroup component="main" className="animated-router-outer">
		<CSSTransition key={location.key} timeout={300} classNames="fade" appear>
			<section className="animated-router-inner">
				<Switch location={location}>
					{children}
				</Switch>
			</section>
		</CSSTransition>
	</TransitionGroup>
);

export default withRouter(AnimatedSwitch);
