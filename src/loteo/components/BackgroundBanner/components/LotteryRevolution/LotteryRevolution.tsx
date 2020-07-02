import React from "react";
import {useTranslation, Trans} from "react-i18next";

import {InfoVideo} from "loteo/components";
import {Grid} from "ui/components";

import "./lotteryRevolution.scss";

type Props = {
    children?: React.ReactNode;
    startVideo?();
};

const LotteryRevolution = ({children, startVideo}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "home";

    return (
        <div className="lotteryRevolution banner">
            <div className="lotteryRevolution__section loteo-banner">
                <Grid className="content" wrap noWidth noPadding>
                    <Grid noWidth noPadding>
                        <div className="titles">
                            <h1>
                                <Trans i18nKey={`${TRANSLATE}.lotteryNeedsARevolution`} />
                            </h1>
                            <h6>{t(`${TRANSLATE}.missionToTheMoon`)}</h6>
                        </div>
                    </Grid>
                    <Grid noWidth noPadding>
                        <div className="content__video__desktop"><InfoVideo showVideo={startVideo}/></div>
                    </Grid>
                </Grid>
            </div>
            <div className="lotteryRevolution__bottom loteo-banner">
                <div className="action">
                    <div className="action__video__mobile"><InfoVideo showVideo={startVideo}/></div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default LotteryRevolution;
