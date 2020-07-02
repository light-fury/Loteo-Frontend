import React from "react";

import ApolloLotteryContent from "./ApolloLotteryContent";
import WeeklyLotteryContent from "./WeeklyLotteryContent";
import MoFContent from "./MoFContent";
import UnavailableContent from "./UnavailableContent";
import {TabList} from "loteo/types";

type Props = {
    activeGame: number;
};

const GameContent = ({activeGame}: Props) => (
    <div>
        {TabList.Apollo === activeGame && (<ApolloLotteryContent />)}
        {TabList.Weekly === activeGame && (<WeeklyLotteryContent />)}
        {TabList.Daily === activeGame && (<UnavailableContent />)}
        {TabList.Rekt === activeGame && (<UnavailableContent />)}
        {TabList.MoF === activeGame && (<MoFContent />)}
        {TabList.Fomo === activeGame && (<UnavailableContent />)}
        {TabList.Jacks === activeGame && (<UnavailableContent />)}
        {TabList.Dice === activeGame && (<UnavailableContent />)}
    </div>
);

export default GameContent;
