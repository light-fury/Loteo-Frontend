import React from "react";

import {ComingCard} from "loteo/components";

import "./dailyLottery.scss";

const DailyLottery = () => (
    <div className="lotteryInfo__dailyLottery">
        <ComingCard
            type="lottery"
            gameType={2}
            thumbUrl="daily-lottery.png"
            title={"DAILY\nLOTTERY"}
            btnName="COMING SOON"
        />
    </div>
);

export default DailyLottery;
