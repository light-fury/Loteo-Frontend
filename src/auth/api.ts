import auth0 from "auth0-js";

import {ACCESS_TOKEN_KEY} from "auth/constants";
import {getItem, removeItem} from "common/storage";
import {callApi} from "common/api";
import {User} from "auth/types";
import {getBaseURL} from "common/utils";
import {REFERRAL_CODE_KEY} from "app/constants";

const auth = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN as string,
    audience: process.env.AUTH0_AUDIENCE,
    clientID: process.env.AUTH0_CLIENT_ID as string,
    redirectUri: process.env.AUTH0_REDIRECT_URI,
    responseType: "token id_token",
    scope: "openid profile read:authenticators"
});

export const login = (redirectPath?: string, forcePrompt: boolean = false) => {
    const options = {
        prompt: forcePrompt ? "login" : "none",
        referralCode: getItem(REFERRAL_CODE_KEY) || undefined
    } as any;

    if (redirectPath) {
        options.redirectUri = `${process.env.AUTH0_REDIRECT_URI}?redirect=${redirectPath}`;
    }

    return auth.authorize(options);
};

export const logout = () => {
    auth.logout({
        returnTo: `${getBaseURL()}/`
    });
};

export const checkSession = async () => {
    const accessToken = getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
        return false;
    }

    return new Promise(resolve => {
        auth.client.userInfo(accessToken, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

export const getUser = () => {
    return callApi("/user")
        .then(user => {
            const referralCode = getItem(REFERRAL_CODE_KEY);
            if (referralCode) {
                removeItem(REFERRAL_CODE_KEY);
            }
            return user;
        });
};

export const saveUser = (user: User) => callApi("/user", "POST", user);

export const getCountryName = (code: string) =>
    fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(response => response.json());
