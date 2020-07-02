import React from "react";

import {GameCard} from "loteo/components";

import "./moonOfForutne.scss";

type Props = {
    play?();
};

const MoonOfForutne = ({play}: Props) => (
    <div className="loteoGames__moon">
        <GameCard
            type="loteo"
            gameType={4}
            thumbUrl="moon.jpg"
            lastWinner={null}
            userInfo={null}
            title={"Moon Of\nFortune"}
            startTime={null}
            unit=""
            entry="LOTEU tokens"
            value=""
            btnName="PLAY NOW"
            btnType="gold"
            playNow={play}
        />
    </div>
);

export default MoonOfForutne;
