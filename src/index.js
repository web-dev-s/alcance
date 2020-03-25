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
const app =  (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
 
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
