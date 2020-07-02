import React from "react";

import {ComingCard} from "loteo/components";

import "./rektRooms.scss";

const RektRooms = () => (
    <div className="lotteryInfo__rektRooms">
        <ComingCard
            type="lottery"
            gameType={3}
            thumbUrl="rekt-rooms.png"
            title={"REKT\nROOMS"}
            btnName="COMING SOON"
        />
    </div>
);

export default RektRooms;
