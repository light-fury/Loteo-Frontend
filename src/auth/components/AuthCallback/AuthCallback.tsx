import React from "react";
import {Redirect} from "react-router";

type Props = {
    location: Location;
};

const AuthCallback = ({location}: Props) => {
    const redirectPath =
        (location.search && new URLSearchParams(location.search.substring(1)).get("redirect")) || "/dashboard";

    return <Redirect to={redirectPath} />;
};

export default AuthCallback;
