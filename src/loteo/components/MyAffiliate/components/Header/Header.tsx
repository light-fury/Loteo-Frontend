import React from "react";

import {Grid} from "ui/components";

import {UnlockButton} from "..";

import "./header.scss";

type Props = {
    text: string;
    locked?: boolean;
    onClick?();
};

const Header = ({text, locked = false, onClick}: Props) => (
    <Grid align="center" justify="space-between" className="myAffiliateHeader">
        <h3>{text}</h3>
        {locked && <UnlockButton onClick={onClick} />}
    </Grid>
);

export default Header;
