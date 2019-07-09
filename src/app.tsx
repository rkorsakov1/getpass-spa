import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { NotFound } from 'pages';
import { Generator, Random, Navigation, Direction, QA } from 'pages';
import { light } from 'themes';
import { RouterWrapper, NotifyWrapper, AnimatedSwitch } from 'components';
import Downloads from 'pages/Downloads';

const App = () => (
    <RouterWrapper>
        <NotifyWrapper>
            <React.Fragment>
                <MuiThemeProvider theme={light}>
                    <Navigation direction={Direction.left}>
                        <AnimatedSwitch>
                            <Route path="/:lang(en|ru)/" exact component={Generator} />
                            <Route path="/:lang(en|ru)/generator" exact component={Generator} />
                            <Route path="/:lang(en|ru)/download" exact component={Downloads} />
                            <Route path="/:lang(en|ru)/random" exact component={Random} />
                            <Route path="/:lang(en|ru)/qa" exact component={QA} />
                            <Redirect from='/' exact to='/en/' />
                            <Route component={NotFound} />
                        </AnimatedSwitch>
                    </Navigation>
                </MuiThemeProvider>
            </React.Fragment>
        </NotifyWrapper>
    </RouterWrapper>
);

export default App;
