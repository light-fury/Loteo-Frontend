import React from "react";
import {useTranslation} from "react-i18next";

import "./scrollInfo.scss";

type Props = {
    text: string;
};

const ScrollInfo = ({text}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "scrollInfo";

    return (
        <div className="scrollInfo">
            <div className="text">{text}</div>
            <img src="icons/scroll-down.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
        </div>
    );
};
export default ScrollInfo;
