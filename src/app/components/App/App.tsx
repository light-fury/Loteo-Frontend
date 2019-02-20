import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {Home} from "loteo/components";
import {Callback} from "auth/components";
import {NavigationProvider} from "app/contexts/NavigationContext";

import "./app.scss";

const App = () => (
    <div className="app">
        <NavigationProvider>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/callback" component={Callback}/>
                <Redirect exact from="/" to="home"/>
            </Switch>
        </NavigationProvider>
    </div>
);

export default App;
