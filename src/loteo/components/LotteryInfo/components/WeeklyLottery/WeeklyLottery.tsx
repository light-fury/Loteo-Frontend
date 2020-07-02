import React, {useContext} from "react";
import {useTranslation, Trans} from "react-i18next";

import {TransactionState, Wallet, WeeklyLotteryInfo} from "loteo/types";

import {GameCard} from "loteo/components";
import {getEURString, noop} from "common/utils";
import {MessageContext, NavigationContext} from "app/contexts";
import {WEEKLY_LOTTERY_LOCK_TIME, MESSAGE_WALLET_HAS_PENDING_TRANSACTION} from "loteo/constants";

import "./weeklyLottery.scss";

type Props = {
    info: WeeklyLotteryInfo | null;
    loading: boolean;
    wallet?: Wallet | null;
    play?();
    buyTickets();
};

const WeeklyLottery = ({info, wallet, play}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "weeklyLottery";

    const {showError} = useContext(MessageContext);
    const {showWeeklyLottery} = useContext(NavigationContext);
    const hasPendingTransactions = wallet && wallet.transactions.some(tx => tx.state === TransactionState.PENDING);

    const handlePlay = () => {
        if (play) {
            play();
        } else if (wallet) {
            if (hasPendingTransactions) {
                showError(MESSAGE_WALLET_HAS_PENDING_TRANSACTION);
            } else if (wallet.weeklyLotteryTickets <= 0) {
                showWeeklyLottery();
            } else if (wallet.ethereum < 0.017) {
                showError({
                    title: t(`${TRANSLATE}.playNow.1.title`),
                    text: (
                        <div className="weeklyLottery__notEnoughETH">
                            <Trans i18nKey={`${TRANSLATE}.playNow.1.text.part1`} />
                            <span>
                                <Trans i18nKey={`${TRANSLATE}.playNow.1.text.part2`} />
                            </span>
                        </div>
                    ),
                    ok: noop,
                    okText: t(`${TRANSLATE}.playNow.1.okText`),
                    cancel: null
                });
            } else if (info && info.startsAt.getTime() - Date.now() <= WEEKLY_LOTTERY_LOCK_TIME) {
                showError({
                    title: t(`${TRANSLATE}.playNow.2.title`),
                    text: t(`${TRANSLATE}.playNow.2.text`),
                    ok: noop,
                    okText: t(`${TRANSLATE}.playNow.2.okText`),
                    cancel: null
                });
            } else {
                showWeeklyLottery();
            }
        }
    };

    return (
        <div className="lotteryInfo__weeklyLottery">
            <GameCard
                type="lottery"
                gameType={1}
                thumbUrl="weekly.png"
                title={"WEEKLY\nLOTEERY"}
                lastWinner={info && info.lastWinner ? info.lastWinner : null}
                userInfo={info && info.userInfo ? info.userInfo : null}
                lastWinnerPrice={info ? info.lastPrizeETH : null}
                value={info ? getEURString(info.prizeEUR, true) : "-"}
                unit={t(`${TRANSLATE}.eur`)}
                winnerCurrency="ETH"
                entry="10 EUR in ETH, BTC/Ticket"
                bonus="100 LOTEU"
                startTime={info ? info.startsAt : null}
                btnName={wallet && wallet.weeklyLotteryTicketsInGame > 0 ? "INCREASE MY CHANCE" : "PLAY NOW"}
                btnType="gold"
                playNow={handlePlay}
            />
        </div>
    );
};

export default WeeklyLottery;
