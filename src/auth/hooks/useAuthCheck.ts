import {useEffect, useContext} from "react";

import {NavigationContext} from "app/contexts";
import {AuthContext} from "auth/contexts";

const useAuthCheck = () => {
    const {loggedIn, loginLoading} = useContext(AuthContext);
    const {showHome} = useContext(NavigationContext);

    useEffect(() => {
        if (!loginLoading && !loggedIn) {
            showHome();
        }
    }, [loggedIn, loginLoading]);
};
export default useAuthCheck;
