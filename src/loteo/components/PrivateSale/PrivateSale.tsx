import React, {useContext} from "react";
import {useTranslation} from "react-i18next";

import {Counter} from "loteo/components";
import {Button} from "ui/components";
import {NavigationContext} from "app/contexts";

import "./privateSale.scss";

const PRIVATE_SALE_END_DATE = new Date(2019, 4, 1, 0, 0, 0);

const PrivateSale = () => {
    const {t} = useTranslation();
    const TRANSLATE = "privateSale";
    const {showContactUs} = useContext(NavigationContext);

    return (
        <div className="privateSale">
            <div className="titleCounter">
                <div className="title">{t(`${TRANSLATE}.privateSaleEndsIn`)}:</div>
                <Counter untilDate={PRIVATE_SALE_END_DATE}/>
            </div>
            <Button className="contactUsButton" text={t("global.contactUs").toUpperCase()} onClick={showContactUs}/>
        </div>
    );
};
export default PrivateSale;
