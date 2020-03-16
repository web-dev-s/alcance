import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, /* compose,  */combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import authReducer from './store/reducers/auth';
import alcanceReducer from './store/reducers/alcance';
//IE compatibility converters:
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

const rootReducer = combineReducers({
    al: alcanceReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));
const app = /* require("https-localhost") */(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

// const app = ...
 
/* const httpsLocalhost = require("https-localhost")()
const port = 3005;
const certs = httpsLocalhost.getCerts()
const server = https.createServer(certs, app).listen(port); */
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
