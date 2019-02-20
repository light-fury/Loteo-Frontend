import React from "react";

import {Loading} from "common/components";

import "./disabledOverlay.scss";

type Props = {
    active: boolean;
    message?: string | null;
}

const DisabledOverlay = ({active, message}: Props) => {
    return (
        <div className={"disabledOverlay" + (active ? " active" : "")}>
            {active && <div className="overlay"/>}
            {active && <Loading message={message}/>}
        </div>
    );
};

export default DisabledOverlay;
