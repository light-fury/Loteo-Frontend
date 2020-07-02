import React, {useContext} from "react";
import {useTranslation, Trans} from "react-i18next";
import {Button} from "ui/components";
import {NavigationContext} from "app/contexts";

import "./affiliate.scss";

const Affiliate = () => {
    const {t} = useTranslation();
    const TRANSLATE = "affiliate";
    const {showShare} = useContext(NavigationContext);

    return (
        <div className="darkBackground affiliate">
            <h1>{t(`${TRANSLATE}.title`)}</h1>
            <h6>
                <Trans i18nKey={`${TRANSLATE}.subTitle`} />
            </h6>
            <Button text={t("global.learnMore")} onClick={showShare}/>
        </div>
    );
};
export default Affiliate;
