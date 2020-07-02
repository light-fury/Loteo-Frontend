import React from "react";
import {useTranslation} from "react-i18next";

import {LoteoPass} from "loteo/types";
import {CountInfo} from "loteo/components";
import {getRemainingWeeksString} from "common/utils";

type Props = {
    loteoPasses: LoteoPass[];
    onClose();
}

const LoteoPassPopup = ({loteoPasses, onClose}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "loteoPassPopup";

    const toLoteoPass = (loteoPass, index) => (
        <div key={index} className="loteoPass">
            <div className="titleValidity">
                <div className="title">{t(`${TRANSLATE}.title1`)}</div>
                <div className="validity"><b>{t(`${TRANSLATE}.validity`)} {loteoPass.validUntil.toLocaleDateString("sk")}</b> ({getRemainingWeeksString(loteoPass.validUntil)})</div>
            </div>
            <CountInfo
                value={loteoPass.remaining}
                valueText={<span><b>{loteoPass.remaining}</b> / {loteoPass.total} {t(`${TRANSLATE}.valueText`)}</span>}
                total={loteoPass.total}
            />
        </div>
    );

    return (
        <div className="loteoPassPopup">
            <div className="titleHeader">
                <div className="title">{t(`${TRANSLATE}.title2`)}</div>
                <img src="icons/close.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} onClick={onClose}/>
            </div>
            <div className="loteoPasses">
                {loteoPasses.map(toLoteoPass)}
            </div>
        </div>
    );
};

export default LoteoPassPopup;
