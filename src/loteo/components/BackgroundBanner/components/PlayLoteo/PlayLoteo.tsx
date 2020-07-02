import React, {useContext} from "react";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {MixButton} from "ui/components";

import "./playLoteo.scss";

type Props = {
    children?: React.ReactNode;
};

const PlayLoteo = ({children}: Props) => {
    const {loggedIn} = useContext(AuthContext);

    const handlePlay = () => {
        if (loggedIn) {
            window.scrollTo({
                top: document.getElementsByClassName("background-banner")[0]["offsetHeight"],
                behavior: "smooth"
            });
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className="playLoteo banner">
            <div className="playLoteo__content loteo-banner">
                <div className="title"><h1>PLAY LOTEO IN 3 STEPS</h1></div>
                <div className="detail">
                    & be part of revolution
                    <div className="detail__statements">
                        <p><span>1.</span> Register</p>
                        <p><span>2.</span> Deposit ethereum and get bonus</p>
                        <p><span>3.</span> Play, win, earn</p>
                    </div>
                </div>
            </div>
            <div className="apollo11Lottery__bottom loteo-banner">
                <div className="action">
                    <MixButton text={loggedIn ? "PLAY" : "REGISTER"} style="red" onClick={handlePlay}/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default PlayLoteo;
