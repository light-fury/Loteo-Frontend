import {useState, useEffect} from "react";

import {ACCESS_TOKEN_KEY} from "auth/constants";

import {getItem} from "common/storage";

const getAccessToken = () => getItem(ACCESS_TOKEN_KEY);

export const useLogin = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => setLoggedIn(!!getAccessToken()));

    return loggedIn;
};
