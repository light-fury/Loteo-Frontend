import React, {useContext, useState, useEffect} from "react";
import {useTranslation, Trans} from "react-i18next";

import {withAuthorization} from "auth/hoc";
import {NavigationContext, MessageContext} from "app/contexts";
import {BackgroundStatic, Header, QuitButton, Counter} from "loteo/components";
import {MESSAGE_WALLET_HAS_PENDING_TRANSACTION, APOLLO11_LOTTERY_LOCK_TIME, MESSAGE_PLAY_LOTTERY_FAILED} from "loteo/constants";
import {Grid, Button, ButtonStyle, MixButton} from "ui/components";
import {loadWallet, loadApolloDailyLotteryInfo} from "loteo/actions";
import {TransactionInProgress} from "common/components";
import {getWallet, getApolloDailyLotteryInfo, getConversionRates} from "loteo/selectors";
import {Wallet, ApolloDailyLotteryInfo, TransactionState, ConversionRates} from "loteo/types";
import {useReduxLoad, useReduxActions, useReduxStore} from "hooks";
import {getLoteuString} from "common/utils";
import {enterApolloDailyLottery} from "loteo/api";
import {noop} from "common/utils";

import "./apolloDailyLottery.scss";

const REQUIRED_GAS = 0.051;

const ApolloDailyLottery = () => {
    const {t} = useTranslation();
    const TRANSLATE = "apolloDailyLottery";

    const [wallet, info]: [Wallet | null, ApolloDailyLotteryInfo | null] = useReduxLoad(
        [loadWallet(), loadApolloDailyLotteryInfo()],
        [getWallet, getApolloDailyLotteryInfo]
    );
    // const {showDashboard, showGameDetails} = useContext(NavigationContext);
    const [refreshWallet, refreshApolloDailyLotteryInfo] = useReduxActions([loadWallet, loadApolloDailyLotteryInfo]);
    const [conversionRates]: [ConversionRates | null] = useReduxStore([getConversionRates]);
    const {showDashboard} = useContext(NavigationContext);
    const {showError, showPayment, showSuccess} = useContext(MessageContext);
    const [loteuAmount, setLoteuAmount] = useState<number>(100);
    const [paymentInProgress, setPaymentInProgress] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [previousWallet, setPreviousWallet] = useState();

    const hasPendingTransactions = wallet && wallet.transactions.some(tx => tx.state === TransactionState.PENDING);

    const handleBuyMoreLoteu = () => {
        if (hasPendingTransactions) {
            showError(MESSAGE_WALLET_HAS_PENDING_TRANSACTION);
            return;
        }
        showPayment({loteu: conversionRates ? Number((conversionRates.loteuBuy * 10).toFixed(0)) : 4000});
    };

    const decreaseLoteu = () => setLoteuAmount(Math.max(100, loteuAmount - 100));

    const increaseLoteu = () =>
        wallet && wallet.loteu >= 100 && setLoteuAmount(Math.min(wallet.loteu, loteuAmount + 100));

    useEffect(() => {
        if (hasPendingTransactions === false) {
            refreshApolloDailyLotteryInfo();
        }

        if (paymentInProgress && !hasPendingTransactions) {
            if (wallet && wallet.apollo11LotteryTicketsInGame !== previousWallet.apollo11LotteryTicketsInGame) {
                showSuccess({
                    title: t(`${TRANSLATE}.playNow.3.title`),
                    text: t(`${TRANSLATE}.playNow.3.text`),
                    ok: showDashboard,
                    okText: t(`${TRANSLATE}.playNow.3.close`),
                    cancel: noop,
                    cancelText: t(`${TRANSLATE}.playNow.3.increaseChance`),
                    className: "successTicketDialog"
                });
            } else {
                showError(MESSAGE_PLAY_LOTTERY_FAILED);
            }
            setProcessing(false);
            setPaymentInProgress(false);
        }
    }, [hasPendingTransactions]);

    const handleEnterLottery = async () => {
        if (wallet) {
            if (info != null && info.startsAt.getTime() - Date.now() <= APOLLO11_LOTTERY_LOCK_TIME) {
                showError({
                    title: t(`${TRANSLATE}.playNow.2.title`),
                    text: t(`${TRANSLATE}.playNow.2.text`),
                    ok: noop,
                    okText: t(`${TRANSLATE}.playNow.2.okText`),
                    cancel: null
                });
            } else if (wallet.ethereum < REQUIRED_GAS) {
                showError({
                    title: t("global.errors.notEnoughETH.title"),
                    text: (
                        <div className="weeklyLottery__notEnoughETH">
                            <Trans
                                i18nKey={"global.errors.notEnoughETH.text.part1"}
                                values={{fee: REQUIRED_GAS}}
                            />
                            <span>
                                <Trans
                                    i18nKey={"global.errors.notEnoughETH.text.part2"}
                                    values={{fee: REQUIRED_GAS}}
                                />
                            </span>
                        </div>
                    ),
                    ok: noop,
                    okText: t("global.errors.notEnoughETH.okText"),
                    cancel: null
                });
            } else if (loteuAmount >= 100 && loteuAmount <= wallet.loteu) {
                setProcessing(true);
                try {
                    await enterApolloDailyLottery(loteuAmount);
                    refreshWallet();
                    setPreviousWallet(wallet);
                    setTimeout(() => {
                        setPaymentInProgress(true);
                    }, 1000);
                    setTimeout(() => {
                        if (!hasPendingTransactions) {
                            refreshWallet();
                        }
                    }, 2000);
                } catch (error) {
                    setProcessing(false);
                    console.error(`error: ${error}`);
                }
            }
        }
    };

    return (
        <BackgroundStatic className="apolloDailyLottery">
            <Header wallet={wallet} hideBottomSeparator />
            {/* Wrapper */}
            <div className="apolloDailyLottery__inner">
                {/* Container */}
                <Grid wrap className="apolloDailyLottery__inner__ticketSelector">
                    {/* First line */}
                    <Grid justify="space-between" className="apolloDailyLottery__inner__ticketSelector__title">
                        <Grid className="apolloDailyLottery__inner__ticketSelector__title__text">
                            <h1>{t(`${TRANSLATE}.title`)}</h1>
                            {/* <MoreInfo
                                text={t(`${TRANSLATE}.learnMore`)}
                                onClick={() => showGameDetails("daily-lottery")}
                            /> */}
                        </Grid>
                        <QuitButton bold onClick={showDashboard} text={t(`${TRANSLATE}.quit`)} />
                    </Grid>
                    {/* Second line */}
                    <Grid className="apolloDailyLottery__inner__ticketSelector__prizes">
                        {/* Left side */}
                        <Grid
                            align="baseline"
                            className="apolloDailyLottery__inner__ticketSelector__prizes__item"
                            noWidth
                        >
                            <strong>{info && info.prizeLoteu ? getLoteuString(info.prizeLoteu) : "0"}</strong>
                            <span>{t("global.loteu")}</span>
                        </Grid>
                        {/* Right side */}
                        {info && info.startsAt && (
                            <Grid
                                justify="end"
                                className="apolloDailyLottery__inner__ticketSelector__prizes__counter"
                                noWidth
                            >
                                <span>{t(`${TRANSLATE}.nextDrawIn`)}</span>
                                <Counter daily untilDate={info.startsAt} />
                            </Grid>
                        )}
                    </Grid>
                    {/* Divider */}
                    <hr />
                    {/* Main section */}
                    <Grid className="apolloDailyLottery__inner__ticketSelector__main">
                        {/* Left side */}
                        <Grid
                            direction="column"
                            className="apolloDailyLottery__inner__ticketSelector__main__availableLoteu"
                            noWidth
                        >
                            <Grid
                                align="start"
                                className="apolloDailyLottery__inner__ticketSelector__main__availableLoteu__title"
                                noWidth
                            >
                                <img
                                    src="images/apolloDailyLottery/doubleChance.svg"
                                    alt={t(`${TRANSLATE}.alts.0.text`)}
                                />
                                <Grid direction="column">
                                    <span>{t(`${TRANSLATE}.availableLoteu`)}</span>
                                    <strong>{wallet ? getLoteuString(wallet.loteu) : "-"}</strong>
                                </Grid>
                            </Grid>
                            <Button
                                text={t(`${TRANSLATE}.buyMoreLoteu`)}
                                className={wallet && wallet.loteu > 0 ? "borderedButton" : ""}
                                style={ButtonStyle.GoldBright}
                                disabled={hasPendingTransactions}
                                onClick={handleBuyMoreLoteu}
                            />
                            {/* <div className="apolloDailyLottery__inner__ticketSelector__main__availableLoteu__conversion">
                                100 LOTEU = 1.25 EUR
                            </div> */}
                        </Grid>
                        {/* Right side */}
                        <Grid
                            wrap
                            align="center"
                            justify="space-between"
                            className="apolloDailyLottery__inner__ticketSelector__main__controls"
                        >
                            <div>
                                <Trans i18nKey={`${TRANSLATE}.controlsTitle`} />
                                <div className="apolloDailyLottery__inner__ticketSelector__main__controls__chance">
                                    {t(`${TRANSLATE}.yourChanceIs`)}
                                    <span>{info && info.chanceToWin ? `1:${info.chanceToWin}` : "x:x"}</span>
                                </div>
                            </div>
                            <Grid
                                align="center"
                                className="apolloDailyLottery__inner__ticketSelector__main__controls__buttons"
                                noWidth
                            >
                                <button
                                    onClick={decreaseLoteu}
                                    disabled={!wallet || hasPendingTransactions || loteuAmount - 100 < 100}
                                >
                                    <img src="images/apolloDailyLottery/minus.svg" alt="-" />
                                </button>
                                <div>{loteuAmount}</div>
                                <button
                                    onClick={increaseLoteu}
                                    disabled={!wallet || hasPendingTransactions || loteuAmount + 100 > wallet.loteu || loteuAmount >= 10000}
                                >
                                    <img src="images/apolloDailyLottery/plus.svg" alt="+" />
                                </button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr />
                    {/* Enter Lottery button */}
                    <Grid justify="end" className={`apolloDailyLottery__inner__ticketSelector__enter ${wallet && wallet.apollo11LotteryTicketsInGame > 0 ? "green" : ""}`}>
                        {!processing && wallet && wallet.apollo11LotteryTicketsInGame > 0 ?
                            <MixButton text="INCREASE MY CHANCE" style="gold" onClick={handleEnterLottery} />
                            :
                            <Button
                                text={
                                    processing
                                        ? t(`${TRANSLATE}.process`)
                                        : t(`${TRANSLATE}.enter`)
                                }
                                style={ButtonStyle.Yellow}
                                disabled={
                                    !wallet || hasPendingTransactions || loteuAmount < 100 || loteuAmount > wallet.loteu || loteuAmount > 10000 || processing
                                }
                                onClick={handleEnterLottery}
                            />
                        }
                    </Grid>
                </Grid>
            </div>
            {processing && <TransactionInProgress />}
        </BackgroundStatic>
    );
};

export default withAuthorization(ApolloDailyLottery);
