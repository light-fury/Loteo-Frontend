import {ACCESS_TOKEN_KEY} from "auth/constants";
import auth0 from "auth0-js";
import {removeItem} from "common/storage";

const auth = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.AUTH0_REDIRECT_URI,
    responseType: "token id_token",
    scope: "openid"
});

export const login = () => auth.authorize();

export const logout = () => {
    auth.logout({
        returnTo: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}`
    });
    removeItem(ACCESS_TOKEN_KEY);
};

export const checkLogin = () => auth.checkSession();
