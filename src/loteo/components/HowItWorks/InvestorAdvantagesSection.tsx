import React from "react";
import {useTranslation} from "react-i18next";

const InvestorAdvantagesSection = () => {
    const {t} = useTranslation();
    const TRANSLATE = "howItWorks.investorAdvantagesSection";

    return (
        <div className="section">
            <h3>{t(`${TRANSLATE}.t1`)}</h3>
            <p>
                {t(`${TRANSLATE}.p1`)}
            </p>
            <ul>
                <li>
                    <div>{t(`${TRANSLATE}.l1`)}</div>
                </li>
                <li>
                    <div>{t(`${TRANSLATE}.l2`)}</div>
                </li>
                <li>
                    <div>{t(`${TRANSLATE}.l3`)}</div>
                </li>
                <li>
                    <div>{t(`${TRANSLATE}.l4`)}</div>
                </li>
            </ul>
        </div>
    );
};

export default InvestorAdvantagesSection;
