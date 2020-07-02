import React from "react";
import {useTranslation, Trans} from "react-i18next";

import {Dialog, Grid} from "ui/components";

import "./transactionInProgress.scss";

type Props = {
    btcPayment?: boolean;
    onClose?();
};

const TransactionInProgress = ({btcPayment, onClose}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "transactionInProgress";

    return (
        <Dialog className="transactionInProgress">
            <Grid direction="column" align="center" justify="center" className="transactionInProgress__inner">
                <img src="images/progress-circle.png" alt={t(`${TRANSLATE}.alts.0.text`)} />
                <div className="transactionInProgress__inner__title">{t(`${TRANSLATE}.title`)}</div>
                <div className="transactionInProgress__inner__text">
                    <Trans i18nKey={btcPayment === true ? `${TRANSLATE}.textBtc` : `${TRANSLATE}.text`} />
                </div>
                {btcPayment && onClose && (
                    <img className="closeButton" src="icons/close.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} onClick={onClose}/>
                )}
            </Grid>
        </Dialog>
    );
};

export default TransactionInProgress;
