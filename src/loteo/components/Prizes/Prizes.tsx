import React from "react";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

import {LANGUAGES} from "app/i18n/i18n";

import "./prizes.scss";

const Prizes = () => {
    const {t} = useTranslation();
    const TRANSLATE = "prizes";
    const lang = i18next.language.toLowerCase();
    const resolvedLang = LANGUAGES.includes(lang) ? lang : "default";

    return (
        <div className="prizesComponent">
            <div className="bigScreen">
                <img
                    src={`images/home/prizesplit/prize-split_${resolvedLang}.png`}
                    alt={t(`${TRANSLATE}.alts.0.alt`)}
                />
            </div>
            <div className="smallScreen">
                <img
                    src={`images/home/prizesplit/prize-split-small_${resolvedLang}.png`}
                    alt={t(`${TRANSLATE}.alts.0.alt`)}
                />
                <div className="prize">
                    <div className="percentage">{t(`${TRANSLATE}.percentage.0.value`)}</div>
                    <div className="prizeInfo">
                        <div className="target">{t(`${TRANSLATE}.target.0.name`)}</div>
                    </div>
                </div>
                <div className="prize">
                    <div className="percentage">{t(`${TRANSLATE}.percentage.1.value`)}</div>
                    <div className="prizeInfo">
                        <div className="target">{t(`${TRANSLATE}.target.1.name`)}</div>
                        <div className="details">{t(`${TRANSLATE}.target.1.detail`)}</div>
                    </div>
                </div>
                <div className="prize">
                    <div className="percentage">{t(`${TRANSLATE}.percentage.2.value`)}</div>
                    <div className="prizeInfo">
                        <div className="target">{t(`${TRANSLATE}.target.2.name`)}</div>
                    </div>
                </div>
                <div className="prize">
                    <div className="percentage">{t(`${TRANSLATE}.percentage.3.value`)}</div>
                    <div className="prizeInfo">
                        <div className="target">{t(`${TRANSLATE}.target.3.name`)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Prizes;
