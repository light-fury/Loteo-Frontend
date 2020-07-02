import React from "react";
import {createContext} from "react";

import {useLogin, useLocationAccessToken} from "auth/hooks";

interface AuthType {
    loggedIn: boolean;
    loginLoading: boolean;
}

const AuthContext = createContext<AuthType>({
    loggedIn: false,
    loginLoading: true
});

export default AuthContext;

type Props = {
    children: React.ReactNode;
};

export const AuthProvider = ({children}: Props) => {
    useLocationAccessToken(window.location);
    const [loggedIn, loginLoading] = useLogin();
    const value = {
        loggedIn,
        loginLoading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
