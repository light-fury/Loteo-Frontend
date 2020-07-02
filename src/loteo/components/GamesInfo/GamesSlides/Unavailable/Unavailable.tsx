import React from "react";
import {useTranslation} from "react-i18next";

import "./unavailable.scss";

const Unavailable = () => {
    const {t} = useTranslation();
    const TRANSLATE = "unavailable";

    return (
        <div className="unavailableGame">
            <strong>{t(`${TRANSLATE}.comingSoon`)}</strong>
            <span>{t(`${TRANSLATE}.roadmap`)}</span>
        </div>
    );
};

export default Unavailable;
