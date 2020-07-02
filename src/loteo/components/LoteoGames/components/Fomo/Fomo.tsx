import React from "react";

import {ComingCard} from "loteo/components";

import "./fomo.scss";

const Fomo = () => (
    <div className="loteoGames__fomo">
        <ComingCard
            type="loteo"
            gameType={5}
            thumbUrl="fomo.jpg"
            title="Fomo"
            btnName="COMING SOON"
        />
    </div>
);

export default Fomo;
