import React from "react";

import {
    LotteryTarget,
    AffiliateProgram,
    AffiliateCharity,
    LoteuStatistics
} from "./components";

import "./finance.scss";

const Finance = () => (
    <div className="finance">
        <LotteryTarget/>
        <AffiliateProgram />
        <AffiliateCharity className="finance__profits"/>
        <div className="finance__loteuStatistics">
            <LoteuStatistics />
        </div>
    </div>
);

export default Finance;
