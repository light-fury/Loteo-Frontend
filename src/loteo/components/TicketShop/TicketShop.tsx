import React, {useContext, useEffect, useState} from "react";
import {useTranslation, Trans} from "react-i18next";

import {ConversionRates, PaymentInfo, TransactionState, Wallet} from "loteo/types";
import {getConversionRates, getWallet, getWeeklyLotteryInfo} from "loteo/selectors";
import {Counter, TicketCard} from "loteo/components";
import {MESSAGE_WALLET_HAS_PENDING_TRANSACTION, TICKET_PRICES, WEEKLY_LOTTERY_LOCK_TIME} from "loteo/constants";
import {getBTCString, getETHString, getEURString} from "common/utils";
import {Button, Grid} from "ui/components";
import {useReduxStore, useReduxLoad} from "hooks";
import {MessageContext} from "app/contexts";
import {loadWeeklyLotteryInfo} from "loteo/actions";
import {getPaymentInfo} from "loteo/api";

import "./ticketShop.scss";

type Props = {
    title: string;
    untilDate?: Date | null;
    fromWeeklyLotteryScreen?: boolean | null;
    updateTotalEUR?: Function | null;
    mainView?: HTMLDivElement | undefined;
};

const TicketShop = ({title, untilDate, fromWeeklyLotteryScreen, updateTotalEUR, mainView}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "ticketShop";
    const {showError, showPayment} = useContext(MessageContext);
    const [conversionRates, wallet]: [ConversionRates | null, Wallet | null] = useReduxStore([
        getConversionRates,
        getWallet
    ]);
    const [weeklyLotteryInfo] = useReduxLoad([loadWeeklyLotteryInfo()], [getWeeklyLotteryInfo]);
    const [previousWallet, setPreviousWallet] = useState();
    const [processing, setProcessing] = useState(false);
    const [tickets, setTickets] = useState(0);
    const [loteoPass, setLoteoPass] = useState(0);
    const [loteoMaxx10, setLoteoMaxx10] = useState(0);
    const [loteoMaxx20, setLoteoMaxx20] = useState(0);
    const [loteoMaxx50, setLoteoMaxx50] = useState(0);
    const [loteoMaxx100, setLoteoMaxx100] = useState(0);
    const totalEUR =
        tickets * TICKET_PRICES.ticket +
        loteoPass * TICKET_PRICES.loteoPass +
        loteoMaxx10 * TICKET_PRICES.loteoMaxx10 +
        loteoMaxx20 * TICKET_PRICES.loteoMaxx20 +
        loteoMaxx50 * TICKET_PRICES.loteoMaxx50 +
        loteoMaxx100 * TICKET_PRICES.loteoMaxx100;
    if (updateTotalEUR) {
        updateTotalEUR(totalEUR);
    }
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const hasPendingTransactions = wallet && wallet.transactions.some(tx => tx.state === TransactionState.PENDING);

    useEffect(() => {
        setPaymentInfo(null);
        if (totalEUR === 0) {
            return;
        }

        let cancelled = false;
        const apiCall = getPaymentInfo({
            tickets,
            loteoPass,
            loteoMaxx10,
            loteoMaxx20,
            loteoMaxx50,
            loteoMaxx100
        });
        apiCall.then(paymentInfo => {
            if (!cancelled) {
                setPaymentInfo(paymentInfo);
            }
        });
        return () => {
            cancelled = true;
            apiCall.cancel();
        };
    }, [loteoMaxx10, loteoMaxx100, loteoMaxx20, loteoMaxx50, loteoPass, tickets, totalEUR]);

    const getTotals = () => {
        return [
            getEURString(totalEUR),
            paymentInfo
                ? getETHString(paymentInfo.totalETH)
                : conversionRates
                    ? getETHString(conversionRates.eth * totalEUR)
                    : "-",
            paymentInfo
                ? getBTCString(paymentInfo.totalBTC)
                : conversionRates
                    ? getBTCString(conversionRates.btc * totalEUR)
                    : "-"
        ];
    };
    const totals = getTotals();

    const pay = () => {
        if (hasPendingTransactions) {
            showError(MESSAGE_WALLET_HAS_PENDING_TRANSACTION);
        } else {
            showPayment({tickets, loteoPass, loteoMaxx10, loteoMaxx20, loteoMaxx50, loteoMaxx100, loteu: 0});
            setPreviousWallet(wallet);
            setTimeout(() => {
                setProcessing(true);
            }, 1000);
        }
    };

    const scrollToDiv = () => {
        if (mainView && mainView !== undefined) {
            mainView.scrollIntoView({behavior: "smooth"});
        }
    };

    useEffect(() => {
        if (processing && !hasPendingTransactions) {
            if (wallet && wallet.ethereum !== previousWallet.ethereum) {
                setTickets(0);
                setLoteoPass(0);
                setLoteoMaxx10(0);
                setLoteoMaxx20(0);
                setLoteoMaxx50(0);
                setLoteoMaxx100(0);
                scrollToDiv();
            }
            setProcessing(false);
        }
    }, [hasPendingTransactions]);

    const ticketCards = [
        {
            title: t(`${TRANSLATE}.tickets.0.title`),
            picture: "images/ticket-icon.png",
            text: t(`${TRANSLATE}.tickets.0.text`),
            value: tickets,
            onChange: setTickets
        },
        {
            title: t(`${TRANSLATE}.tickets.1.title`),
            picture: "images/loteopass-icon2.png",
            text: <Trans i18nKey={`${TRANSLATE}.tickets.1.text`} />,
            value: loteoPass,
            onChange: setLoteoPass,
            amountLeft: weeklyLotteryInfo && weeklyLotteryInfo.remainingTickets,
            maxAmount: weeklyLotteryInfo && weeklyLotteryInfo.totalTickets
        },
        {
            title: t(`${TRANSLATE}.tickets.2.title`),
            picture: "images/loteomaxx-icon.png",
            text: <Trans i18nKey={`${TRANSLATE}.tickets.2.text`} />,
            value: loteoMaxx10,
            onChange: setLoteoMaxx10
        },
        {
            title: t(`${TRANSLATE}.tickets.3.title`),
            picture: "images/loteomaxx-icon.png",
            text: <Trans i18nKey={`${TRANSLATE}.tickets.3.text`} />,
            value: loteoMaxx20,
            onChange: setLoteoMaxx20
        },
        {
            title: t(`${TRANSLATE}.tickets.4.title`),
            picture: "images/loteomaxx-icon.png",
            text: <Trans i18nKey={`${TRANSLATE}.tickets.4.text`} />,
            value: loteoMaxx50,
            onChange: setLoteoMaxx50
        },
        {
            title: t(`${TRANSLATE}.tickets.5.title`),
            picture: "images/loteomaxx-icon.png",
            text: <Trans i18nKey={`${TRANSLATE}.tickets.5.text`} />,
            value: loteoMaxx100,
            onChange: setLoteoMaxx100
        }
    ];

    return (
        <div id="ticketShop" className="ticketShop">
            {!fromWeeklyLotteryScreen && <div className="header">
                <h2>{title}</h2>
                {untilDate && (
                    <div className="counterInfo">
                        <div className="label">{t(`${TRANSLATE}.label`)}:</div>
                        <Counter untilDate={untilDate} shortenTimeBy={WEEKLY_LOTTERY_LOCK_TIME} />
                    </div>
                )}
            </div>}
            {!fromWeeklyLotteryScreen && <div className="bonusInfo">
                <strong>{t(`${TRANSLATE}.bonus.title`)}</strong>
                <span>{t(`${TRANSLATE}.bonus.text`)}</span>
            </div>}

            {fromWeeklyLotteryScreen && <div className="header">
                <strong>{title}</strong>
            </div>}

            <Grid wrap className="tickets" noWidth>
                {ticketCards.map((item, idx) => (
                    <Grid key={`ticketShop-item-${idx}`} className="col-xs-12 col-md-6 col-lg-4" noPadding>
                        <TicketCard
                            picture={item.picture}
                            title={item.title}
                            text={item.text}
                            value={item.value}
                            onChange={item.onChange}
                            amountLeft={item.amountLeft}
                            maxAmount={item.maxAmount}
                        />
                    </Grid>
                ))}
            </Grid>
            {(totalEUR > 0 && !fromWeeklyLotteryScreen) &&
                <Grid
                    wrap
                    align="center"
                    justify="center"
                    className={`summaryPanel ${totalEUR > 0 ? "visible" : "hidden"}`}
                >
                    <Grid noWidth>
                        <img src="images/shopping-bag.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} />
                        <div className="label">{t(`${TRANSLATE}.summaryPanel.label`)}</div>
                    </Grid>
                    <Grid justify="end" className="totals" noWidth>
                        <div className="value main">
                            <b>{totals[0]}</b> €
                        </div>
                        <div className="value">
                            <b>{totals[1]}</b> {t(`${TRANSLATE}.eth`)}
                        </div>
                        <div className="value">
                            <b>{totals[2]}</b> {t(`${TRANSLATE}.btc`)}
                        </div>
                    </Grid>
                    {totalEUR > 0 && <Button className="payButton" text={t(`${TRANSLATE}.buyNowBtn`)} onClick={pay} />}
                </Grid>
            }
            {(totalEUR > 0 && fromWeeklyLotteryScreen) &&
                <Grid
                    wrap
                    align="center"
                    justify="center"
                    className={`summaryPanel ${totalEUR > 0 ? fromWeeklyLotteryScreen ? "fromWeeklyLottery" : "visible" : "hidden"}`}
                >
                    <Grid noWidth>
                        <div className="label">{t(`${TRANSLATE}.summaryPanel.total`)}</div>
                    </Grid>
                    <div className="dottedBottom" />
                    <Grid justify="end" className="totals flexGrowZero" noWidth>
                        <div className="value">
                            <b>{totals[2]}</b> {t(`${TRANSLATE}.btc`)}
                        </div>
                        <div className="value">
                            <b>{totals[1]}</b> {t(`${TRANSLATE}.eth`)}
                        </div>
                        <div className="value main">
                            <b>{totals[0]}</b> EUR
                        </div>
                    </Grid>
                    {totalEUR > 0 && <Button disabled={hasPendingTransactions} className="payButton weeklyLotteryPayButton" text={t(`${TRANSLATE}.buyNowBtn`)} onClick={pay} />}
                </Grid>
            }
        </div>
    );
};

export default TicketShop;
