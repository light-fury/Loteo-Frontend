import React from "react";
import {useTranslation, Trans} from "react-i18next";

import {useReduxStore, useBooleanState} from "hooks";
import {Button} from "ui/components";
import {User} from "auth/types";
import {getUser} from "auth/selectors";

import "./boardingDialog.scss";

type Props = {
    showETHDepositDialog();
};

const BoardingDialog = ({showETHDepositDialog}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "dashboard";

    const [user]: [User | null] = useReduxStore([getUser]);
    const [availableDialog, setAvailableDialog, closeAvailableDialog] = useBooleanState(false);

    const handlePlay = () => {
        showETHDepositDialog();

        if (user && (localStorage.boarding !== user.id)) {
            if (availableDialog) {
                localStorage.setItem("nextBoarding", user.id);
            }
            localStorage.setItem("currentBoarding", user.id);
        }
    };

    const closeDialog = () => {
        if (user && (localStorage.boarding !== user.id)) {
            if (availableDialog) {
                localStorage.setItem("nextBoarding", user.id);
            }
            localStorage.setItem("currentBoarding", user.id);
        }
    };

    const noLongerAvailable = () => {
        if (user) {
            if (availableDialog) {
                closeAvailableDialog();
            } else {
                setAvailableDialog();
            }
        }
    };

    return (
        <div className="boardingDialog">
            <div className="boardingDialog__overlay" />
            <div className="boardingDialog__section">
                <div className="boardingDialog__section__close" onClick={() => closeDialog()}><i className="fa fa-times"></i></div>
                <div className="boardingDialog__section__bg" />
                <div className="boardingDialog__section__content">
                    <div className="boardingDialog__section__content--title">{t(`${TRANSLATE}.boarding.title`)}</div>
                    <div className="boardingDialog__section__content--text">
                        <Trans i18nKey={`${TRANSLATE}.boarding.text`} />
                    </div>
                    <div className="boardingDialog__section__content--button">
                        <div className="deposit"><Button text="Deposit" onClick={() => handlePlay()}/></div>
                        <div className="longerAvailable">
                            <div className="longerAvailable__close-icon" onClick={noLongerAvailable}>
                                {availableDialog && (
                                    <i className="fas fa-times"></i>
                                )}
                            </div>
                            <div className="longerAvailable__text">
                                {t(`${TRANSLATE}.boarding.closeText`)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardingDialog;
