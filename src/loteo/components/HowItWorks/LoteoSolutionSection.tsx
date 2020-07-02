import React from "react";
import {useTranslation} from "react-i18next";

const LoteoSolutionSection = () => {
    const {t} = useTranslation();
    const TRANSLATE = "howItWorks.loteoSolutionSection";
    return (
        <div className="section">
            <h3>{t(`${TRANSLATE}.t1`)}</h3>
            <p>
                {t(`${TRANSLATE}.p1`)}
            </p>
            <div className="subTitle">
                {t(`${TRANSLATE}.t2`)}
            </div>
            <p>
                {t(`${TRANSLATE}.p2`)}
            </p>
            <div className="subTitle">
                {t(`${TRANSLATE}.t3`)}
            </div>
            <p>
                {t(`${TRANSLATE}.p3`)}
            </p>
            <div className="subTitle">
                {t(`${TRANSLATE}.t4`)}
            </div>
            <p>
                {t(`${TRANSLATE}.p4`)}
            </p>
            <p>
                {t(`${TRANSLATE}.p5`)}
            </p>
            <p>
                {t(`${TRANSLATE}.p6`)}
            </p>
        </div>
    );
};

export default LoteoSolutionSection;
