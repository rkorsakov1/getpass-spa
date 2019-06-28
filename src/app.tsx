import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { NotFound } from 'pages';
import { Generator, Random, Navigation, Direction, QA } from 'pages';
import { light } from 'themes';
import { RouterWrapper } from 'components/RouterWrapper';
import { NotifyWrapper } from 'components/NotifyWrapper';
import Downloads from 'pages/Downloads';


/*
            <Header />
            <Navigation />
*/


const App = () => (
    <RouterWrapper>
        <NotifyWrapper>
            <React.Fragment>
                <MuiThemeProvider theme={light}>
                    <Navigation direction={Direction.left}>
                        <Switch>
                            <Route path="/" exact component={Generator} />
                            <Route path="/generator" exact component={Generator} />
                            <Route path="/download" exact component={Downloads} />
                            <Route path="/random" exact component={Random} />
                            <Route path="/qa" exact component={QA} />
                            <Route component={NotFound} />
                        </Switch>
                    </Navigation>
                </MuiThemeProvider>
            </React.Fragment>
        </NotifyWrapper>
    </RouterWrapper>
);

export default App;
