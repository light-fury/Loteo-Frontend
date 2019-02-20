/* eslint-disable no-console */
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }

    interface NodeModule {
        hot: any;
    }
}

import "./styles/global.scss";

import "@babel/polyfill";
import "url-search-params-polyfill";

import React from "react";
import {render} from "react-dom";
import {Route} from "react-router-dom";
import {createStore, compose, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";

import reducers from "./rootReducer";
import createHistory from "history/createHashHistory";

import {App} from "app/components";
import {Loading} from "common/components";

const history = createHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history)
    }),
    composeEnhancer(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        )
    )
);

const root = document.getElementById("root");

if (root) {
    render(
        <Provider store={store}>
            <React.Suspense
                fallback={
                    <div className="extend">
                        <Loading/>
                    </div>
                }
            >
                <ConnectedRouter history={history}>
                    <Route path="/" component={App}/>
                </ConnectedRouter>,
            </React.Suspense>
        </Provider>,
        root
    );
}

if (module.hot) {
    module.hot.accept("./rootReducer", () => {
        const nextReducer = combineReducers({
            ...require("./rootReducer").default,
            router: connectRouter(history)
        });
        // @ts-ignore
        store.replaceReducer(nextReducer);
    });

    module.hot.dispose(data => {
        data.store = store;
    });
}

if (navigator.serviceWorker) {
    window.addEventListener("load", () => {
        // $FlowFixMe
        navigator.serviceWorker.register("/service-worker.js")
            .then(registration => console.log("SW registered: ", registration))
            .catch(error => console.log("SW registration failed: ", error));
    });
}
