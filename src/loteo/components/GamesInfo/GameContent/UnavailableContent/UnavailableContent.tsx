import React from "react";

import {MixButton} from "ui/components";

import "./unavailableContent.scss";

const UnavailableContent = () => (
    <div className="unavailableContent">
        <div className="unavailableContent__button">
            <MixButton text="COMING SOON" style="red"/>
        </div>
        <div className="unavailableContent__window"/>
    </div>
);

export default UnavailableContent;
