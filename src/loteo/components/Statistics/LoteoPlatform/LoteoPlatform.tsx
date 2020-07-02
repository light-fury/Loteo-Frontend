import React from "react";

import {Products, WebVistor, Users} from "./components";

import "./loteoPlatform.scss";

const LoteoPlatform = () => {
    return (
        <div className="loteoPlatform">
            <div className="loteoPlatform__web">
                <WebVistor />
            </div>
            <div className="loteoPlatform__users">
                <Users />
            </div>
            <div className="loteoPlatform__products">
                <Products className="loteoPlatform__products__content"/>
            </div>
        </div>
    );
};

export default LoteoPlatform;
