import React, {useContext} from "react";

import {AuthContext} from "auth/contexts";
import {Loading} from "common/components";
import {useBodyNoScroll} from "hooks";

import "./authOverlay.scss";

const AuthOverlay = () => {
    const {loginLoading} = useContext(AuthContext);

    useBodyNoScroll(loginLoading);

    if (!loginLoading) {
        return null;
    }

    return <Loading />;
};

export default AuthOverlay;
