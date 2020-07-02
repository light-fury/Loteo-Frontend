import React, {useContext, useEffect, useState, useRef} from "react";
import {useTranslation, Trans} from "react-i18next";
import SVG from "react-inlinesvg";
import AutosizeInput from "react-input-autosize";

import {useDebounce, useReduxLoad, useInputState, useBooleanState, useReduxStore, useReduxActions} from "hooks";
import {Counter, QuitButton, TicketShop} from "loteo/components";
import {getBTCString, getETHString, getEURString, getLoteuString} from "common/utils";
import {MoreInfo, TransactionInProgress} from "common/components";
import {Button, ButtonStyle, Grid, MixButton} from "ui/components";
import {loadWeeklyLotteryInfo} from "loteo/actions";
import {getWeeklyLotteryInfo, getConversionRates} from "loteo/selectors";
import {MessageContext, NavigationContext} from "app/contexts";
import {enterWeeklyLottery, getLotteryChance} from "loteo/api";
import {TransactionState, Wallet, ConversionRates} from "loteo/types";
import {MESSAGE_WALLET_HAS_PENDING_TRANSACTION, WEEKLY_LOTTERY_LOCK_TIME, MESSAGE_PLAY_LOTTERY_FAILED} from "loteo/constants";
import {noop} from "common/utils/functions";

import "./ticketSelector.scss";

type ProcessInfo = {
    chance: number;
};

type Props = {
    wallet: Wallet | null;
    refreshWallet();
    location: Location;
};

const TicketSelector = ({wallet, refreshWallet, location}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "ticketSelector";
    const [
        refreshWeeklyLotteryInfo
    ] = useReduxActions([loadWeeklyLotteryInfo]);
    const [conversionRates]: [ConversionRates | null] = useReduxStore([getConversionRates]);
    const [weeklyLotteryInfo] = useReduxLoad([loadWeeklyLotteryInfo()], [getWeeklyLotteryInfo]);
    const {showDashboard, showGameDetails} = useContext(NavigationContext);
    const {showError, showPayment, showSuccess} = useContext(MessageContext);
    const scrollView = useRef<HTMLDivElement>(null);
    const mainView = useRef<HTMLDivElement>(null);

    const [chance, setChance] = useState((weeklyLotteryInfo && weeklyLotteryInfo.chanceToWin) || 0);
    const [tickets, setTickets] = useState(0);
    const [previousWallet, setPreviousWallet] = useState();
    const [showTicketShop, setShowTicketShop, hideTicketShop] = useBooleanState(!!wallet && wallet.weeklyLotteryTickets > 0);
    const [availableTickets, setAvailableTickets] = useState(0);
    const [totalEUR, setTotalEUR] = useState(0);
    const [loteuInput, setLoteuInput, setLoteuInputDirectly] = useInputState("");
    const [loteu, setLoteu] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [paymentInProgress, setPaymentInProgress] = useState(false);
    const [processInfo, setProcessInfo] = useState<ProcessInfo | null>(null);
    const hasPendingTransactions = wallet && wallet.transactions.some(tx => tx.state === TransactionState.PENDING);

    const normalInteger = (str) => {
        return str.match(/\d/g);
    };

    useEffect(() => {
        if (showTicketShop && availableTickets > 0) {
            scrollToBottom();
        }
    }, [showTicketShop]);

    useEffect(() => {
        if (location && location["state"] && location["state"]["showPayment"] === true) {
            showPayment(location["state"]["tickets"]);
        }
    }, [location]);

    useEffect(() => {
        if (chance === 0 && weeklyLotteryInfo) {
            setChance(weeklyLotteryInfo.chanceToWin);
        }
    }, [chance, weeklyLotteryInfo]);

    useEffect(() => {
        let tempNumber = normalInteger(loteuInput);
        if (!tempNumber || tempNumber.length === 0) {
            setLoteu(0);
            setLoteuInputDirectly("");
        } else {
            tempNumber = tempNumber.join("");
            setLoteu(Number(tempNumber));
            setLoteuInputDirectly(Number(tempNumber).toFixed(0));
        }
    }, [loteuInput]);

    useEffect(() => {
        if (wallet) {
            setAvailableTickets(wallet.weeklyLotteryTickets);
            if (wallet.weeklyLotteryTickets <= 0) {
                setShowTicketShop();
            }
        }
    }, [wallet]);

    useEffect(() => {
        if (loteu > tickets * 100 || (wallet && loteu > wallet.loteu)) {
            if (wallet) {
                setLoteu(Math.min(wallet.loteu, tickets * 100));
            } else {
                setLoteu(tickets * 100);
            }
        }
        if (loteu.toFixed().indexOf(loteuInput) < 0 || (loteuInput === "" && loteu !== 0)) {
            setLoteuInputDirectly(loteu.toFixed());
        }
    }, [tickets, loteu]);

    useEffect(() => {
        if (totalEUR > 0) {
            scrollToBottom();
        }
    }, [totalEUR]);

    const handleBuyMoreTicket = () => {
        if (availableTickets > 0) {
            if (hasPendingTransactions) {
                showError(MESSAGE_WALLET_HAS_PENDING_TRANSACTION);
                return;
            }
            showPayment({tickets: 1, loteu: 0});
        } else {
            scrollToBottom();
        }
    };

    const handleBuyMoreLoteu = () => {
        if (hasPendingTransactions) {
            showError(MESSAGE_WALLET_HAS_PENDING_TRANSACTION);
            return;
        }
        showPayment({loteu: conversionRates ? Number((conversionRates.loteuBuy * 10).toFixed(0)) : 4000});
    };

    const scrollToBottom = () => {
        const component = scrollView.current;
        if (component) {
            component.scrollIntoView({behavior: "smooth"});
        }
    };

    const refreshChance = async () => {
        if (tickets === 0) {
            setChance((weeklyLotteryInfo && weeklyLotteryInfo.chanceToWin) || 0);
        } else {
            try {
                const response = await getLotteryChance(tickets, loteu);
                setChance(response.chance);
            } catch (e) {
                console.error(e);
            }
        }
    };

    useDebounce(500, refreshChance, [loteu, tickets]);

    useEffect(() => {
        if (hasPendingTransactions === false) {
            refreshWeeklyLotteryInfo();
        }

        if (paymentInProgress && !hasPendingTransactions) {
            if (wallet && wallet.weeklyLotteryTicketsInGame !== previousWallet.weeklyLotteryTicketsInGame) {
                showSuccess({
                    title: t(`${TRANSLATE}.successDialog.title`),
                    text: t(`${TRANSLATE}.successDialog.text`),
                    ok: showDashboard,
                    okText: t(`${TRANSLATE}.successDialog.close`),
                    cancel: noop,
                    cancelText: t(`${TRANSLATE}.successDialog.increaseChance`),
                    className: "successTicketDialog"
                });
            } else {
                showError(MESSAGE_PLAY_LOTTERY_FAILED);
            }
            setProcessing(false);
            setPaymentInProgress(false);
        }
    }, [hasPendingTransactions]);

    const process = async () => {
        if (!tickets && !loteu) {
            return;
        }

        if (hasPendingTransactions) {
            showError(MESSAGE_WALLET_HAS_PENDING_TRANSACTION);
            return;
        }
        if (weeklyLotteryInfo && weeklyLotteryInfo.startsAt.getTime() - Date.now() <= WEEKLY_LOTTERY_LOCK_TIME) {
            showError({
                title: t(`${TRANSLATE}.errorDialog.title`),
                text: t(`${TRANSLATE}.errorDialog.text`),
                ok: noop,
                okText: t(`${TRANSLATE}.errorDialog.okText`),
                cancel: null
            });
            return;
        }
        setProcessing(true);
        try {
            const {chance} = await enterWeeklyLottery(tickets, loteu);
            setProcessInfo({chance});
            refreshWallet();
            setPreviousWallet(wallet);
            setPaymentInProgress(true);
            setTimeout(() => {
                if (!hasPendingTransactions) {
                    refreshWallet();
                }
            }, 2000);
            setTimeout(() => {
                if (!hasPendingTransactions) {
                    refreshWallet();
                }
            }, 4000);
        } catch (e) {
            setProcessing(false);
            //TODO: handle error properly
            console.error(`error: ${e}`);
        }
    };

    const playAgain = () => {
        if (hasPendingTransactions) {
            showError(MESSAGE_WALLET_HAS_PENDING_TRANSACTION);
        } else {
            setProcessInfo(null);
            setTickets(0);
        }
    };

    return (
        <div
            ref={mainView}
            className={`weeklyLottery__ticketSelector ${totalEUR > 0 ? "showStickySummary" : ""}`}
        >
            <Grid align="center" justify="space-between" className="weeklyLottery__ticketSelector__title">
                <Grid className="weeklyLottery__ticketSelector__title__text">
                    <h1>{t(`${TRANSLATE}.header.title`)}</h1>
                    <MoreInfo text={t(`${TRANSLATE}.header.learnMore`)} onClick={showGameDetails} />
                </Grid>
                <QuitButton bold onClick={showDashboard} text={t(`${TRANSLATE}.header.text`)} />
            </Grid>
            <Grid justify="space-between" className="weeklyLottery__ticketSelector__prizesCounter">
                <Grid className="weeklyLottery__ticketSelector__prizesCounter__prizes">
                    <Grid align="baseline" className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize">
                        <div className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize__value big">
                            {weeklyLotteryInfo ? getEURString(weeklyLotteryInfo.prizeEUR) : "-"}
                        </div>
                        <div className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize__currency big">
                            {t(`${TRANSLATE}.eur`)}
                        </div>
                    </Grid>
                    <Grid noWidth align="center">
                        <div className="weeklyLottery__ticketSelector__prizesCounter__prizes__separator" />
                        <Grid align="baseline" className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize">
                            <div className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize__value">
                                {weeklyLotteryInfo ? getBTCString(weeklyLotteryInfo.prizeBTC) : "-"}
                            </div>
                            <div className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize__currency">
                                {t(`${TRANSLATE}.btc`)}
                            </div>
                        </Grid>
                        <Grid align="baseline" className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize">
                            <div className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize__value">
                                {weeklyLotteryInfo ? getETHString(weeklyLotteryInfo.prizeETH) : "-"}
                            </div>
                            <div className="weeklyLottery__ticketSelector__prizesCounter__prizes__prize__currency">
                                {t(`${TRANSLATE}.eth`)}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                {weeklyLotteryInfo && (
                    <Grid className="weeklyLottery__ticketSelector__prizesCounter__startCounter">
                        <div className="weeklyLottery__ticketSelector__prizesCounter__startCounter__label">
                            {t(`${TRANSLATE}.prizesCounter.label`)}:
                        </div>
                        <Counter untilDate={weeklyLotteryInfo.startsAt} />
                    </Grid>
                )}
            </Grid>
            <hr className="hr"/>
            <div>
                <Grid className="weeklyLottery__ticketSelector__main">
                    {/* Left side */}
                    <Grid
                        direction="column"
                        className="weeklyLottery__ticketSelector__main__availableLoteu"
                        noWidth
                    >
                        <Grid
                            align="start"
                            className="weeklyLottery__ticketSelector__main__availableLoteu__title"
                            noWidth
                        >
                            <Grid className="weeklyLottery__ticketSelector__main__availableLoteu__title__icon">
                                <SVG src="images/tickets.svg" className="weeklyLottery__ticketSelector__main__availableLoteu__title__icon__container">
                                    <img src="images/tickets.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                                </SVG>
                            </Grid>
                            <Grid direction="column" className="rightSide">
                                <span>{t(`${TRANSLATE}.loteuSection.availableTicket`)}</span>
                                <strong>
                                    {`${availableTickets.toLocaleString(undefined, {minimumIntegerDigits: 1})}`}
                                    <Trans
                                        i18nKey={`${TRANSLATE}.loteuSection.ticketLabel`}
                                        values={{tickets: availableTickets > 0 ? "s" : ""}}
                                    />
                                </strong>
                            </Grid>
                        </Grid>
                        <Button
                            className={availableTickets ? "borderedButton" : ""}
                            text={t(`${TRANSLATE}.loteuSection.buyMoreTicket`)}
                            style={ButtonStyle.GoldBright}
                            disabled={hasPendingTransactions}
                            onClick={handleBuyMoreTicket}
                        />
                        <div className="weeklyLottery__ticketSelector__main__availableLoteu__conversion">
                            10 € / Ticket
                        </div>
                    </Grid>
                    {/* Right side */}
                    <Grid
                        wrap
                        align="center"
                        direction="row"
                        className="weeklyLottery__ticketSelector__main__controls"
                    >
                        <Grid
                            direction="column"
                            className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel pr0"
                        >
                            <div className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel__title__disabled">
                                {t(`${TRANSLATE}.loteuSection.chooseTicket`)}
                            </div>
                            <Grid className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel__chanceInfo">
                                <div className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel__chanceInfo__text">
                                    {t(`${TRANSLATE}.loteuSection.yourChanceIs`)}
                                </div>
                                <div className="chance">{chance === 0 ? "0:0" : `1:${chance}`}</div>
                            </Grid>
                        </Grid>
                        {availableTickets > 0 ?
                            <Grid
                                className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel__rightContainer borderlessContainer"
                            >
                                <Grid
                                    onClick={() => setTickets(tickets > 0 ? tickets - 1 : 0)}
                                    className={`roundedButton${tickets > 0 ? "" : " disabled"}`}
                                >
                                    <img src="icons/white-minus.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                                </Grid>

                                <div className="count">
                                    <strong>{tickets}</strong>
                                    <Trans
                                        i18nKey={`${TRANSLATE}.loteuSection.ticketLabel`}
                                        values={{tickets: tickets > 0 ? "s" : ""}}
                                    />
                                </div>
                                <Grid
                                    onClick={() => setTickets(tickets < availableTickets ? tickets + 1 : availableTickets)}
                                    className={`roundedButton${tickets >= availableTickets ? " disabled" : ""}`}
                                >
                                    <img src="icons/white-plus.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                                </Grid>
                            </Grid>
                            :
                            <Grid
                                onClick={scrollToBottom}
                                className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel__rightContainer"
                            >
                                <div className="text">
                                    {t(`${TRANSLATE}.loteuSection.needBuyTickets`)}
                                </div>
                                <Grid className="scrollDownContainer">
                                    <div className="text">{t(`${TRANSLATE}.loteuSection.scrollInfo`)}</div>
                                    <img src="icons/scroll-down-white.svg" alt={t(`${TRANSLATE}.alts.7.alt`)} />
                                </Grid>
                            </Grid>
                        }

                    </Grid>
                </Grid>
                <Grid className="weeklyLottery__ticketSelector__main">
                    {/* Left side */}
                    <Grid
                        direction="column"
                        className="weeklyLottery__ticketSelector__main__availableLoteu"
                        noWidth
                    >
                        <Grid
                            align="start"
                            className="weeklyLottery__ticketSelector__main__availableLoteu__title"
                            noWidth
                        >
                            <img
                                src="images/apolloDailyLottery/doubleChance.svg"
                                alt={t(`${TRANSLATE}.alts.0.alt`)}
                            />
                            <Grid direction="column" className="rightSide">
                                <span>{t(`${TRANSLATE}.loteuSection.availableLoteu`)}</span>
                                <strong>{wallet ? getLoteuString(wallet.loteu) : "-"}</strong>
                            </Grid>
                        </Grid>
                        <Button
                            text={t(`${TRANSLATE}.loteuSection.buyMoreLoteu`)}
                            className={wallet && wallet.loteu > 0 ? "borderedButton" : ""}
                            style={ButtonStyle.GoldBright}
                            disabled={hasPendingTransactions}
                            onClick={handleBuyMoreLoteu}
                        />
                        <div className="weeklyLottery__ticketSelector__main__availableLoteu__conversion">
                            <Trans
                                i18nKey={`${TRANSLATE}.loteuSection.loteuRate`}
                                values={{rate: conversionRates ? (conversionRates.loteuBuy * 10).toFixed(0) : 4000}}
                            />
                        </div>
                    </Grid>
                    {/* Right side */}
                    <Grid
                        wrap
                        align="center"
                        direction="row"
                        className="weeklyLottery__ticketSelector__main__controls"
                    >
                        <Grid
                            direction="column"
                            className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel"
                        >
                            <div className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel__title__disabled">
                                {t(`${TRANSLATE}.loteuSection.loteuToDoubleChance`)}
                            </div>
                            <div className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel__text">
                                {t(`${TRANSLATE}.loteuSection.text`)}
                            </div>
                        </Grid>
                        {(!wallet || wallet.loteu == 0 || availableTickets <= 0) ?
                            <Grid
                                direction="column"
                                className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel ml40"
                            >
                            </Grid>
                            :
                            <Grid
                                className="weeklyLottery__ticketSelector__main__controls__playArea__loteuSection__contentPanel__rightContainer borderlessContainer"
                            >
                                <Grid
                                    onClick={() => setLoteu(loteu > 0 ? loteu - 100 : 0)}
                                    className={`roundedLoteoButton${loteu > 0 ? "" : " disabled"}`}
                                >
                                    <img src="icons/white-minus.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                                </Grid>
                                <Grid className="loteoVerticalContainer">
                                    Use Loteu
                                    <Grid className="loteoTextInputContainer">
                                        <AutosizeInput
                                            name="loteu-field-name"
                                            inputClassName="loteoTextInput"
                                            minWidth={50}
                                            value={loteu.toFixed()}
                                            onChange={setLoteuInput}
                                            placeholder="000"
                                            placeholderIsMinWidth
                                        />
                                    </Grid>
                                    {wallet.loteu > 0 && loteu === 0 && <Grid className="loteoReminder">
                                        <Grid className="loteoReminderTextContainer">
                                            <Trans i18nKey={`${TRANSLATE}.loteuSection.loteuReminder`} />
                                        </Grid>
                                        <div className="loteoReminderBg">
                                            <img src="images/loteo-reminder-bg.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                                        </div>
                                    </Grid>}
                                </Grid>
                                <Grid
                                    onClick={() => setLoteu(loteu < Math.min(wallet.loteu, tickets * 100) ? loteu + 100 : Math.min(wallet.loteu, tickets * 100))}
                                    className={`roundedLoteoButton${loteu >= wallet.loteu ? " disabled" : ""}`}
                                >
                                    <img src="icons/white-plus.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
                <hr />
                {availableTickets > 0 && <Grid className={`weeklyLottery__ticketSelector__bottomPanel${showTicketShop ? " bottomMarginShow" : ""}`}>
                    {
                        showTicketShop ?
                            <Button
                                className="showRulesButton"
                                style={ButtonStyle.TransparentWhite}
                                text={t(`${TRANSLATE}.bottomPanel.btn3`)}
                                onClick={() => {
                                    hideTicketShop();
                                    setTotalEUR(0);
                                }}
                                rightIconURL="icons/arrow-up.svg"
                            />
                            :
                            <Button
                                className="showRulesButton"
                                style={ButtonStyle.TransparentWhite}
                                text={t(`${TRANSLATE}.bottomPanel.btn0`)}
                                onClick={setShowTicketShop}
                                iconURL="icons/show-tickets.svg"
                                rightIconURL="icons/arrow-down.svg"
                            />
                    }
                    <Grid align="center" justify="end" className="buttons">
                        <div className={`processButtonWrapper ${!processing && !processInfo && wallet && wallet.weeklyLotteryTicketsInGame > 0 ? "green" : ""}`}>
                            {!processing && !processInfo && wallet && wallet.weeklyLotteryTicketsInGame > 0 ?
                                <MixButton text="INCREASE MY CHANCE" style="gold" onClick={process} />
                                :
                                <Button
                                    className="processButton"
                                    style={ButtonStyle.GoldBright}
                                    text={
                                        processing
                                            ? t(`${TRANSLATE}.bottomPanel.btn2.process`)
                                            : processInfo
                                                ? t(`${TRANSLATE}.bottomPanel.btn2.play`)
                                                : t(`${TRANSLATE}.bottomPanel.btn2.enter`)
                                    }
                                    onClick={processInfo ? playAgain : process}
                                    disabled={processing || tickets <= 0 || hasPendingTransactions}
                                />
                            }
                        </div>
                    </Grid>
                </Grid>}
                {showTicketShop &&
                    <TicketShop
                        title={t(`${TRANSLATE}.ticketShop.title`)}
                        untilDate={weeklyLotteryInfo && weeklyLotteryInfo.startsAt}
                        fromWeeklyLotteryScreen
                        updateTotalEUR={setTotalEUR}
                        mainView={mainView.current || undefined}
                    />
                }
            </div>
            <div className="bottomDiv" ref={scrollView} />
            {processing && <TransactionInProgress />}
        </div>
    );
};
export default TicketSelector;
