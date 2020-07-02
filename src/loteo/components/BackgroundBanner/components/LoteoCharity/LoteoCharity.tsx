import React, {useContext} from "react";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {NavigationContext} from "app/contexts";
import {MixButton} from "ui/components";

import "./loteoCharity.scss";

type Props = {
    children?: React.ReactNode;
};

const LoteoCharity = ({children}: Props) => {
    const {loggedIn} = useContext(AuthContext);
    const {showCharity} = useContext(NavigationContext);

    const handlePlay = () => {
        if (loggedIn) {
            showCharity();
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className="loteoCharity banner">
            <div className="loteoCharity__content loteo-banner">
                <div className="title"><h1>{"LOTEO\nCHARITY"}</h1></div>
                <div className="detail">
                    Play, Win & Help!
                </div>
            </div>
            <div className="apollo11Lottery__bottom loteo-banner">
                <div className="action">
                    <MixButton text="DONATE" style="gold" onClick={handlePlay}/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default LoteoCharity;
