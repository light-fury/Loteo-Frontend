/* eslint-disable no-console */
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
        gapi: any;
        gtag?: Function;
        enableCoinPayments: boolean;
        disabledDrawVideo: boolean;
        auth0AnalyticsOptions: object;
        Rollbar: any;
    }

    interface NodeModule {
        hot: any;
    }
}
import "./styles/global.scss";

import "@babel/polyfill";
import "whatwg-fetch";
import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import "url-search-params-polyfill";

import React from "react";
import {render} from "react-dom";
import {Route} from "react-router-dom";
import {createStore, compose, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";

import "./app/i18n/i18n";
import "./logger";
import reducers from "./rootReducer";

import {App} from "app/components";
import {Loading} from "common/components";

const history = createBrowserHistory();

history.listen(location => {
    if (window.gtag) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        window.gtag("config", "UA-134595064-1", {page_path: location.pathname});
    }
});

try {
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src = "https://cdn.auth0.com/js/lock/11.14/lock.min.js";
    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "https://cdn.auth0.com/js/lock/11.14/lock.min.js";
    // const script3 = document.createElement("script");
    // script3.type = "text/javascript";
    // script3.src = "https://apis.google.com/js/client.js";
    // const script4 = document.createElement("script");
    // script4.type = "text/javascript";
    // script4.src = "https://apis.google.com/js/api.js";
    // const script5 = document.createElement("script");
    // script5.type = "text/javascript";
    // script5.src = "https://www.googleapis.com/auth/analytics.readonly";

    // script4.onload = () => {
    //     window.gapi.load('client', () => {
    //         window.gapi.client.setApiKey("AIzaSyCL05P1hVT-O3mozT4C3yBJ1sNx9dQjR_o");
    //     });
    //     window.gapi.auth2.getAuthInstance()
    //     .signIn({scope: "https://www.googleapis.com/analytics"})
    //     .then(function() { console.log("Sign-in successful"); },
    //           function(err) { console.error("Error signing in", err); });
    // };
    document.body.appendChild(script1);
    document.body.appendChild(script2);
    // document.body.appendChild(script3);
    // document.body.appendChild(script4);
    // document.body.appendChild(script5);

    window.auth0AnalyticsOptions = {
        "google-analytics": {
            id: "UA-134595064-1",
            preloaded: true
        }
    };
    window.disabledDrawVideo = window.localStorage && !!window.localStorage.getItem("disabledDrawVideo");
} catch (err) {
    console.log(err);
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history)
    }),
    composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
);

const root = document.getElementById("root");

if (root) {
    render(
        <Provider store={store}>
            <React.Suspense
                fallback={
                    <div className="extend">
                        <Loading />
                    </div>
                }
            >
                <ConnectedRouter history={history}>
                    <Route path="/" component={App} />
                </ConnectedRouter>
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

/*if (navigator.serviceWorker) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then(registration => console.log("SW registered: ", registration))
            .catch(error => console.log("SW registration failed: ", error));
    });
}*/
