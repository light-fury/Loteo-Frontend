import {useEffect} from "react";

import {ACCESS_TOKEN_KEY} from "auth/constants";
import {setItem} from "common/storage";

const useLocationAccessToken = (location: Location) => {
    useEffect(() => {
        if (!window.location.href.includes("callback")) {
            return;
        }
        const params = new URLSearchParams(location.hash.substring(1));
        const accessToken = params.get("access_token");
        if (accessToken) {
            setItem(ACCESS_TOKEN_KEY, accessToken);
        }
    }, [location.hash]);
};

export default useLocationAccessToken;
