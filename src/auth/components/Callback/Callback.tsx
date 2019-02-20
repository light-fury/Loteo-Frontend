import React from "react";
import {Redirect} from "react-router";

import {useLocationAccessToken} from "auth/hooks";

type Props = {
    location: Location;
};

const Callback = ({location}: Props) => {
    useLocationAccessToken(location);

    return <Redirect to="/"/>;
};
export default Callback;
