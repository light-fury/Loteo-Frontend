import React from "react";
import {useTranslation, Trans} from "react-i18next";

import {Button, ButtonStyle, Dialog} from "ui/components";
import {QuitButton} from "loteo/components";

import "./bonusDialog.scss";

type Props = {
    onClose();
    onConfirm();
};

const BonusDialog = ({onClose, onConfirm}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "bonusDialog";

    return (
        <Dialog className="bonusDialog">
            <QuitButton onClick={onClose} />
            <div className="title yellow">
                <Trans i18nKey={`${TRANSLATE}.title1`} />
            </div>
            <div className="title white">
                <Trans i18nKey={`${TRANSLATE}.title2`} />
            </div>
            <div className="title white">
                <Trans i18nKey={`${TRANSLATE}.title3`} />
            </div>
            <div className="buttonWrapper">
                <Button style={ButtonStyle.GoldCondensed} text={t(`${TRANSLATE}.btn1`)} onClick={onConfirm} />
            </div>
        </Dialog>
    );
};

export default BonusDialog;
