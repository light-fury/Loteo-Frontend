import React from "react";
import {useTranslation} from "react-i18next";

const UserAdvantagesSection = () => {
    const {t} = useTranslation();
    const TRANSLATE = "howItWorks.userAdvantagesSection";

    const renderLotteryRow = (name, chance) => (
        <div className="lotteryRow">
            <div className="name">{name}</div>
            <div className="chance">{t(`${TRANSLATE}.chanceExample.one`)} : {chance} {t(`${TRANSLATE}.comparisons.table.million`)}</div>
        </div>
    );

    return (
        <div className="userAdvantagesSection section">
            <h3>{t(`${TRANSLATE}.t1`)}</h3>
            <div className="subTitle">{t(`${TRANSLATE}.t2`)}</div>
            <p>
                {t(`${TRANSLATE}.p1`)}
            </p>
            <div className="subTitle">{t(`${TRANSLATE}.t3`)}</div>
            <p>
                {t(`${TRANSLATE}.p2`)}
            </p>
            <div className="subTitle">{t(`${TRANSLATE}.t4`)}</div>
            <p>
                {t(`${TRANSLATE}.p3`)}
            </p>
            <div className="subTitle">{t(`${TRANSLATE}.t5`)}</div>
            <p>
                {t(`${TRANSLATE}.p4`)}
            </p>
            <div className="subTitle">{t(`${TRANSLATE}.t6`)}</div>
            <p>
                {t(`${TRANSLATE}.p5`)}
            </p>
            <div className="subTitle">{t(`${TRANSLATE}.t7`)}</div>
            <p>
                {t(`${TRANSLATE}.p6`)}
            </p>
            <div className="subTitle">{t(`${TRANSLATE}.t8`)}</div>
            <p>
                {t(`${TRANSLATE}.p7`)}
            </p>
            <div className="subTitle">{t(`${TRANSLATE}.t9`)}</div>
            <p>
                {t(`${TRANSLATE}.p8`)}
            </p>
            <div className="chanceExample">
                <div className="formula"><b>{t(`${TRANSLATE}.chanceExample.one`)}</b> : {t(`${TRANSLATE}.chanceExample.formula`)}</div>
                <div className="details">{t(`${TRANSLATE}.chanceExample.details`)}</div>
            </div>
            <div className="comparisons">
                <div className="title">{t(`${TRANSLATE}.comparisons.title`)}</div>
                <div className="table">
                    <div className="column">
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r1`), 623)}
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r2`), 292)}
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r3`), 259)}
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r4`), 140)}
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r5`), 95)}
                    </div>
                    <div className="column">
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r6`), 45)}
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r7`), 32)}
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r8`), 32)}
                        {renderLotteryRow(t(`${TRANSLATE}.comparisons.table.r9`), 29)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAdvantagesSection;
