import React, {useContext} from "react";
import {useTranslation} from "react-i18next";

import {GameCard} from "loteo/components";
import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {NavigationContext} from "app/contexts";
import {getLoteuString} from "common/utils";
import {ApolloDailyLotteryInfo} from "loteo/types";

import "./apollo11Lottery.scss";

type Props = {
    data: ApolloDailyLotteryInfo | null;
};

const Apollo11Lottery = ({data}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "apollo11Lottery";
    const {loggedIn} = useContext(AuthContext);
    const {showApolloDailyLottery} = useContext(NavigationContext);

    const handlePlay = () => {
        if (loggedIn) {
            showApolloDailyLottery();
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className="lotteryInfo__apollo11Lottery">
            <GameCard
                type="lottery"
                gameType={0}
                thumbUrl="apollo.png"
                title={t(`${TRANSLATE}.title`)}
                lastWinner={data && data.lastWinner ? data.lastWinner : null}
                userInfo={data ? data.userInfo : null}
                lastWinnerPrice={data ? data.lastPrizeLoteu : null}
                value={data ? getLoteuString(data.prizeLoteu) : ""}
                unit="LOTEU"
                winnerCurrency="LOTEU"
                entry="100 LOTEU"
                startTime={data && data.startsAt ? data.startsAt : null}
                btnName={data && data.inGame ? "INCREASE MY CHANCE" : "PLAY NOW"}
                btnType="gold"
                playNow={handlePlay}
            />
        </div>
    );
};

export default Apollo11Lottery;
