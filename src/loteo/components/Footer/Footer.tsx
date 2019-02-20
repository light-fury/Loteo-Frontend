import React from "react";

import {Networks, SubscribeForm} from "loteo/components";
import CopyrightTerms from "./CopyrightTerms";

import "./footer.scss";

type Props = {
    showCopyrightTerms?: boolean;
    showNetworks?: boolean;
    showSubscribe?: boolean;
};

const Footer = ({showCopyrightTerms = true, showNetworks = true, showSubscribe = false}: Props) => (
    <div className="footer">
        {showCopyrightTerms && <CopyrightTerms/>}
        {showNetworks && <Networks/>}
        {showSubscribe && <SubscribeForm/>}
    </div>
);

export default Footer;
