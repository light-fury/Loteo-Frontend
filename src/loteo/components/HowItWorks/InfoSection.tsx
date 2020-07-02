import React from "react";
import {useTranslation} from "react-i18next";

import {Prizes} from "loteo/components";

const InfoSection = () => {
    const {t} = useTranslation();
    const TRANSLATE = "howItWorks.infoSection";

    return (
        <div className="infoSection section">
            <h3>{t(`${TRANSLATE}.t1`)}</h3>
            <p>
                {t(`${TRANSLATE}.p1`)}
            </p>
            <p>
                {t(`${TRANSLATE}.p2`)}
            </p>
            <p>
                {t(`${TRANSLATE}.p3`)}
            </p>
            <Prizes/>
            <p>
                {t(`${TRANSLATE}.p4`)}
            </p>
            <p>
                {t(`${TRANSLATE}.p5`)}
            </p>
        </div>
    );
};

export default InfoSection;
