import React from "react";
import {useTranslation} from "react-i18next";

import {MixButton} from "ui/components";

import "./page404.scss";

type Props = {
    history: {goBack: Function};
};

const Page404 = ({history}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "page404";

    const handlePlay = () => {
        history.goBack();
        history.goBack();
    };

    return (
        <div className="page404Component">
            <div className="overlay">
                <div className="topLabel">{t(`${TRANSLATE}.title`)}</div>
                <div className="cardButton" onClick={handlePlay}>
                    <MixButton text="GO BACK" style="red" />
                </div>
            </div>
        </div>
    );
};
export default Page404;
