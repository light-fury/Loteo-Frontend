import React from "react";

import {ComingCard} from "loteo/components";

import "./jacks.scss";

const Jacks = () => (
    <div className="loteoGames__jacks">
        <ComingCard
            type="loteo"
            gameType={6}
            thumbUrl="jacks.jpg"
            title={"Jacks\nOr Better"}
            btnName="COMING SOON"
        />
    </div>
);

export default Jacks;
