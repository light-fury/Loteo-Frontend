import React from "react";
import {useTranslation} from "react-i18next";

import "./chance.scss";

const Chance = () => {
    const {t} = useTranslation();
    const TRANSLATE = "gameDetails.chance";
    const TRANSLATE_FROM = "howItWorks.userAdvantagesSection";

    const renderLotteryRow = (name, chance) => (
        <div className="lotteryRow">
            <div className="name">{name}</div>
            <div className="chance">1 : {chance} {t(`${TRANSLATE_FROM}.comparisons.table.million`)}</div>
        </div>
    );

    return (
        <div className="gamesInfo__weeklyLottery__chance section">
            <div className="title">{t(`${TRANSLATE}.t1`)}</div>
            <p>
                {t(`${TRANSLATE}.p1`)}
            </p>
            <div className="chanceInfo">
                <b>1</b> : {t(`${TRANSLATE_FROM}.chanceExample.formula`)}
            </div>
            <div className="explain">{t(`${TRANSLATE_FROM}.chanceExample.details`)}</div>
            <div className="comparisons">
                <div className="title">{t(`${TRANSLATE_FROM}.comparisons.title`)}</div>
                <div className="table">
                    <div className="column">
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r1`), 623)}
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r2`), 292)}
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r3`), 259)}
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r4`), 140)}
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r5`), 95)}
                    </div>
                    <div className="column">
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r6`), 45)}
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r7`), 32)}
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r8`), 32)}
                        {renderLotteryRow(t(`${TRANSLATE_FROM}.comparisons.table.r9`), 29)}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chance;
