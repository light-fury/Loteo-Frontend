import React, {useEffect} from "react";
import {useTranslation, Trans} from "react-i18next";

import {Button, ButtonStyle, Dialog} from "ui/components";
import {QuitButton} from "loteo/components";
import {useBooleanState, useLocalStorage} from "hooks";

import "./apollo11Dialog.scss";

const SHOW_TIMEOUT = 3000;

type Props = {
    user?: string;
    isShownOn: string;
    onConfirm();
};

const Apollo11Dialog = ({user, isShownOn, onConfirm}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "apollo11Dialog";

    const [apollo11DialogVisible, showApollo11Dialog, hideApollo11Dialog] = useBooleanState();
    const [LSApollo11DialogShown, LSSetApollo11DialogShown] = useLocalStorage("apollo11DialogShown", true);

    const showDialog = (where: string, who: string) => {
        const whereExists = !!LSApollo11DialogShown && !!LSApollo11DialogShown[where];

        setTimeout(showApollo11Dialog, SHOW_TIMEOUT);

        if (LSApollo11DialogShown) {
            if (whereExists) {
                LSSetApollo11DialogShown({...LSApollo11DialogShown, [where]: [...LSApollo11DialogShown[where], who]});
            } else {
                LSSetApollo11DialogShown({...LSApollo11DialogShown, [where]: [who]});
            }
        } else {
            LSSetApollo11DialogShown({[where]: [who]});
        }
    };

    useEffect(() => {
        const pageVisitedBefore = LSApollo11DialogShown && LSApollo11DialogShown[isShownOn];

        if (user) {
            if (!pageVisitedBefore || (!pageVisitedBefore.includes("shown") && !pageVisitedBefore.includes(user))) {
                showDialog(isShownOn, user);
            }
        } else {
            if (!pageVisitedBefore || !pageVisitedBefore.length || !pageVisitedBefore.includes("shown")) {
                showDialog(isShownOn, "shown");
            }
        }
    }, []);

    const handleConfirm = () => {
        onConfirm();
        hideApollo11Dialog();
    };

    return apollo11DialogVisible ? (
        <Dialog className="apollo11Dialog">
            <QuitButton bold onClick={hideApollo11Dialog} />
            <div className="apollo11Dialog__title">
                <Trans i18nKey={`${TRANSLATE}.title`} />
            </div>
            <div className="apollo11Dialog__subtitle">
                <Trans i18nKey={`${TRANSLATE}.subtitle`} />
            </div>
            <div className="apollo11Dialog__buttonWrapper">
                <Button style={ButtonStyle.GoldCondensed} text={t(`${TRANSLATE}.cta`)} onClick={handleConfirm} />
            </div>
            <div className="apollo11Dialog__text">
                <Trans i18nKey={`${TRANSLATE}.text`} />
            </div>
        </Dialog>
    ) : null;
};

export default Apollo11Dialog;
