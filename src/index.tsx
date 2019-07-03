import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import "localization/i18n";
import 'css/index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

serviceWorker.register();