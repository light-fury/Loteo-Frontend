import {useState, useEffect} from "react";

import {ACCESS_TOKEN_KEY} from "auth/constants";

import {getItem, removeItem} from "common/storage";
import {checkSession} from "auth/api";

const getAccessToken = () => getItem(ACCESS_TOKEN_KEY);

const useLogin = () => {
    const [loggedIn, setLoggedIn] = useState(!!getAccessToken());
    const [loading, setLoading] = useState(true);
    const sessionCheck = async () => {
        if (await checkSession()) {
            setLoggedIn(true);
        } else {
            removeItem(ACCESS_TOKEN_KEY);
            setLoggedIn(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        sessionCheck();
    }, []);

    return [loggedIn, loading];
};
export default useLogin;
