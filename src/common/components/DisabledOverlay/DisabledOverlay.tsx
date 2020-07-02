import React from "react";

import {Loading} from "common/components";

import "./disabledOverlay.scss";

type Props = {
    active: boolean;
};

const DisabledOverlay = ({active}: Props) => {
    return (
        <div className={"disabledOverlay" + (active ? " active" : "")}>
            {active && <div className="overlay" />}
            {active && <Loading />}
        </div>
    );
};

export default DisabledOverlay;
