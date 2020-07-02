import React from "react";

import {ComingCard} from "loteo/components";

import "./dice.scss";

const Dice = () => (
    <div className="loteoGames__dice">
        <ComingCard
            type="loteo"
            gameType={7}
            thumbUrl="dice.jpg"
            title={"Dice"}
            btnName="COMING SOON"
        />
    </div>
);

export default Dice;
