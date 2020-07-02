import React, {useContext} from "react";

import {AuthContext} from "auth/contexts";
import {useAuthCheck} from "auth/hooks";

const withAuthorization = WrappedComponent => {
    const WithAuthorizationComponent = props => {
        const {loggedIn, loginLoading} = useContext(AuthContext);

        useAuthCheck();

        if (loginLoading || !loggedIn) {
            return null;
        }

        return (
            <WrappedComponent
                loggedIn={loggedIn}
                loginLoading={loginLoading}
                {...props}
            />
        );
    };

    return WithAuthorizationComponent;
};
export default withAuthorization;
