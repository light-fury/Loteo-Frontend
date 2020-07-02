import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";

import {useBooleanState} from "hooks";
import {Button} from "ui/components";
import {getItem, setItem} from "common/storage";
import {COOKIE_CONSENT_KEY} from "app/constants";

import "./cookieNotification.scss";

const CookieNotification = () => {
    const {t} = useTranslation();
    const TRANSLATE = "cookieNotification";
    const [visible, show, hide] = useBooleanState();
    const acceptCookies = () => {
        setItem(COOKIE_CONSENT_KEY, "accepted", {
            expires: 365 // 1 year
        });
        hide();
    };

    useEffect(() => {
        if (getItem(COOKIE_CONSENT_KEY) !== "accepted") {
            setTimeout(show, 2000);
        }
    }, []);

    return (
        <div className={`cookieNotification ${visible ? "visible" : ""}`}>
            <div className="text">
                {t(`${TRANSLATE}.cookie`)}
                <a href="documents/loteo-cookie-policy.pdf" target="_blank" rel="noreferrer nooppener">{t(`${TRANSLATE}.href`)}</a>.
            </div>
            <Button text={t(`${TRANSLATE}.btn`)} onClick={acceptCookies}/>
        </div>
    );
};
export default CookieNotification;
