import React from "react";
import {useTranslation} from "react-i18next";

type Props = {
    amount: number;
    onClose();
}

const CoinbackPopup = ({amount, onClose}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "coinbackPopup";

    return (
        <div className="coinbackPopup">
            <div className="body">
                <img src="icons/coinbackgraphic.svg" alt={t(`${TRANSLATE}.alts.1.alt`)}/>
                <div className="textBox">
                    <div className="title">{t(`${TRANSLATE}.title`)}</div>
                    <div className="text"><span>+ {amount} LOTEU </span>{t(`${TRANSLATE}.text`)}</div>
                </div>
            </div>
            <img className="close" src="icons/close.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} onClick={onClose}/>
        </div>
    );
};

export default CoinbackPopup;
