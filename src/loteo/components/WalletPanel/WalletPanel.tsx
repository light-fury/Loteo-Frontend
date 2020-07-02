import React, {useEffect, useState, useContext} from "react";
import {useTranslation, Trans} from "react-i18next";

import {getETHString, getEURString, getLotesString, getLoteuString, getBTCString} from "common/utils";
import {useBooleanState, useReduxStore} from "hooks";
import SVG from "react-inlinesvg";

import {BonusBox} from "loteo/components";
import {Button, ButtonStyle, Dialog, Grid} from "ui/components";
import {MessagePanel, WithdrawDialog, DepositDialog} from "common/components";
import {noop} from "common/utils";
import {ConversionRates, TransactionState, Wallet} from "loteo/types";
import {getConversionRates} from "loteo/selectors";
import {withdrawEthereum, withdrawLoteu, withdrawBitcoin, readCoinbackNotification} from "loteo/api";
import {MessageContext, NavigationContext} from "app/contexts";

import {CurrencyCardFull, CurrencyCardSmall, LoteoPassPopup, CoinbackPopup} from "./components";

import "./walletPanel.scss";

const REFRESH_INTERVAL = 10 * 1000;
const MAX_GAS_ETH = 0.000463; // 0.000463 is maximum gas fee for eth tx.
const MAX_BTC_FEE = 0.000137;

export enum Theme {
    Transparent = "themeTransparent",
    BlackWhite = "themeBlackWhite"
}

type Props = {
    theme?: Theme;
    wallet: Wallet | null;
    refreshWallet?();
    opened: string | null;
    open(any);
    close(any);
    nextMoonVisitorInfoVisible?: boolean;
    hideNextMoonVisitorInfo?();
    buy?();
    location?: Location;
};

const WalletPanel = ({
    theme = Theme.Transparent,
    wallet,
    refreshWallet,
    opened,
    open,
    close,
    nextMoonVisitorInfoVisible,
    hideNextMoonVisitorInfo,
    buy,
    location
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "walletPanel";
    const {showError} = useContext(MessageContext);
    const {showWeeklyLottery} = useContext(NavigationContext);
    const [conversionRates]: [ConversionRates | null] = useReduxStore([getConversionRates]);
    const [ethDepositDialogVisible, showETHDepositDialog, hideETHDepositDialog] = useBooleanState();
    const [ethWithdrawalDialogVisible, showETHWithdrawalDialog, hideETHWithdrawalDialog] = useBooleanState();
    const [showReminder, setShowReminder] = useState(1);
    const [btcDepositDialogVisible, showBTCDepositDialog, hideBTCDepositDialog] = useBooleanState();
    const [btcWithdrawalDialogVisible, showBTCWithdrawalDialog, hideBTCWithdrawalDialog] = useBooleanState();
    const [loteuDepositDialogVisible, showLoteuDepositDialog, hideLoteuDepositDialog] = useBooleanState();
    const [loteuWithdrawalDialogVisible, showLoteuWithdrawalDialog, hideLoteuWithdrawalDialog] = useBooleanState();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string>("");
    const [transactionSuccessMessage, setTransactionSuccessMessage] = useState<React.ReactNode>(null);
    const [loteoPassPopupOpened, openLoteoPassPopup, closeLoteoPassPopup] = useBooleanState();
    const [coinbackPopupClosed, closeCoinbackPopup] = useBooleanState();
    const [withdrawPendingTxId, setWithdrawPendingTxId] = useState<string>("");
    const [withdrawInfoString, setWithdrawInfoString] = useState<string>("");
    const [withdrawErrorTrans, setWithdrawErrorTrans] = useState<string>("");
    const [isReduceBanner, setBannersHeight] = useBooleanState(false);
    const totalLoteoPasses =
        (wallet &&
            wallet.loteoPasses &&
            wallet.loteoPasses.reduce((total, loteoPass) => total + loteoPass.remaining, 0)) ||
        0;
    const pendingTransactions =
        (wallet && wallet.transactions.filter(tx => tx.state === TransactionState.PENDING)) || [];
    const hasPendingTransactions = pendingTransactions.length > 0;

    const withdrawTransaction =
        (withdrawPendingTxId !== "" && wallet && wallet.transactions.find(tx => tx.hash === withdrawPendingTxId)) || null;

    const openWalletPannel = type => {
        open(type);
        shouldExpandBannerWithWallet();
    };

    const closeWalletPannel = type => {
        close(type);
        shouldReduceBannerWithWallet();
    };

    const shouldExpandBannerWithWallet = () => {
        let bannerBG = document.getElementsByClassName("background");
        const bannerBGHeight = bannerBG[0]["offsetHeight"];

        if (bannerBGHeight > 591) {
            return;
        }

        setBannersHeight();
        bannerBG[0]["style"]["height"] = "690px";
        Object.values(document.getElementsByClassName("banner")).map((bannerElement) => {
            bannerElement["style"]["height"] = "690px";
            bannerElement["style"]["transition"] = "height .5s";
        });
    };

    const shouldReduceBannerWithWallet = () => {
        let bannerBG = document.getElementsByClassName("background");

        if (!isReduceBanner) {
            return;
        }

        bannerBG[0]["style"]["height"] = "591px";
        Object.values(document.getElementsByClassName("banner")).map((bannerElement) => {
            bannerElement["style"]["height"] = "591px";
            bannerElement["style"]["transition"] = "height .5s";
        });
    };

    useEffect(() => {
        setError("");
        setTransactionSuccessMessage(null);
    }, [ethWithdrawalDialogVisible, loteuWithdrawalDialogVisible]);

    useEffect(() => {
        if (hasPendingTransactions && refreshWallet) {
            const intervalID = setInterval(refreshWallet, REFRESH_INTERVAL);
            return () => clearInterval(intervalID);
        }
    }, [hasPendingTransactions]);

    useEffect(() => {
        if (withdrawPendingTxId !== "") {
            if (withdrawTransaction && withdrawTransaction.state === TransactionState.FAILED) {
                showError({
                    title: t(`${withdrawErrorTrans}.text.title`),
                    text: (
                        <div className="weeklyLottery__notEnoughETH">
                            <Trans i18nKey={`${withdrawErrorTrans}.text.part1`} />
                            <span>
                                <Trans i18nKey={`${withdrawErrorTrans}.text.part2`} />
                            </span>
                        </div>
                    ),
                    ok: noop,
                    okText: t(`${withdrawErrorTrans}.text.okText`),
                    cancel: null
                });
                setWithdrawPendingTxId("");
            } else if (!withdrawTransaction || withdrawTransaction.state === TransactionState.COMPLETED) {
                setTransactionSuccessMessage(
                    <>
                        <b>{withdrawInfoString}</b>
                        <Trans i18nKey={`${TRANSLATE}.setTransactionSuccessMessage`} />
                        &nbsp;
                        <a
                            href={`https://etherscan.io/address/${wallet && wallet.ethDepositAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            etherscan.io
                        </a>
                    </>
                );
                setWithdrawPendingTxId("");
            }
        }
    }, [withdrawTransaction]);

    // const withdraw = () => {
    // };

    // const deposit = () => {
    // };

    const getButtonStyle = () => {
        switch (theme) {
            case Theme.BlackWhite:
                return ButtonStyle.Default;
            default:
                return ButtonStyle.TransparentWhite;
        }
    };

    const withdrawETH = (withdrawalAddress, withdrawalAmount) => {
        setWithdrawInfoString(getETHString(withdrawalAmount) + " " + t(`${TRANSLATE}.eth`));
        setError("");
        setWithdrawErrorTrans("walletPanel.dialog.5");
        setProcessing(true);

        withdrawEthereum(withdrawalAddress, withdrawalAmount)
            .then(response => {
                setWithdrawPendingTxId(response.hash);
                hideETHWithdrawalDialog();
                setProcessing(false);

                if (refreshWallet) {
                    refreshWallet();
                }
            })
            .catch(error => setError(error.response.message || error.statusText));
    };

    const withdrawLOTEU = (withdrawalAddress, withdrawalAmount) => {
        setWithdrawInfoString(getLoteuString(withdrawalAmount) + " " + t(`${TRANSLATE}.loteu`));
        setError("");
        setWithdrawErrorTrans("walletPanel.dialog.6");
        setProcessing(true);

        withdrawLoteu(withdrawalAddress, withdrawalAmount)
            .then(response => {
                setWithdrawPendingTxId(response.hash);
                hideLoteuWithdrawalDialog();
                setProcessing(false);

                if (refreshWallet) {
                    refreshWallet();
                }
            })
            .catch(error => setError(error.response.message || error.statusText));
    };

    const withdrawBTC = (withdrawalAddress, withdrawalAmount) => {
        setWithdrawInfoString(getBTCString(withdrawalAmount) + " " + t(`${TRANSLATE}.btc`));
        setError("");
        setWithdrawErrorTrans("walletPanel.dialog.9");
        setProcessing(true);

        withdrawBitcoin(withdrawalAddress, withdrawalAmount)
            .then(response => {
                hideBTCWithdrawalDialog();
                setProcessing(false);

                if (refreshWallet) {
                    refreshWallet();
                }
                if (response.hash === null) {
                    showError({
                        title: t(`${withdrawErrorTrans}.text.title`),
                        text: (
                            <div className="weeklyLottery__notEnoughETH">
                                <Trans i18nKey={`${withdrawErrorTrans}.text.part1`} />
                                <span>
                                    <Trans i18nKey={`${withdrawErrorTrans}.text.part2`} />
                                </span>
                            </div>
                        ),
                        ok: noop,
                        okText: t(`${withdrawErrorTrans}.text.okText`),
                        cancel: null
                    });
                }
            })
            .catch(error => setError(error.response.message || error.statusText));
    };

    const closeCoinbackPopupHandler = () => {
        closeCoinbackPopup();
        readCoinbackNotification();
    };

    const getWalletInProgressLink = () => {
        if (hasPendingTransactions) {
            if (pendingTransactions[0].network === "bitcoin") {
                return `https://www.blockchain.com/btc/address/${wallet && wallet.btcDepositAddress}`;
            } else {
                return `https://etherscan.io/address/${wallet && wallet.ethDepositAddress}`;
            }
        }
        return "";
    };

    return (
        <div className={`walletPanel ${theme} ${opened ? "opened" : "closed"}`}>
            <Grid align="center" justify="space-between" className="topPanel">
                {hasPendingTransactions && (
                    <div className="pendingTransactions">
                        <div className="text">{t(`${TRANSLATE}.pendingTransactions.text`)}</div>
                        <div className="link">
                            {t(`${TRANSLATE}.pendingTransactions.link`)}&nbsp;
                            <a
                                href={getWalletInProgressLink()}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {pendingTransactions[0].network === "bitcoin" ? "blockchain.com" : "etherscan.io"}
                            </a>
                            .
                        </div>
                    </div>
                )}
                {!opened && !hasPendingTransactions && (
                    <>
                        <BonusBox
                            depositEth={showETHDepositDialog}
                        />
                        <Grid align="baseline" noPadding noWidth>
                            <CurrencyCardSmall
                                className={`highlightValue myTicket ${wallet && wallet.weeklyLotteryTickets ? "orangeButton" : ""}`}
                                label={t(`${TRANSLATE}.walletDetails.myTicket`)}
                                caret
                                icon="/images/header-ticket.png"
                                loading={!wallet}
                                value={wallet ? `${wallet.weeklyLotteryTickets} tickets` : ""}
                                onClick={() => openWalletPannel("ticket")}
                            />
                            {!opened
                                && !hasPendingTransactions
                                && location
                                && location.pathname.indexOf("dashboard") >= 0
                                && wallet
                                && wallet.weeklyLotteryTickets > 0
                                && wallet.weeklyLotteryTicketsInGame <= 0
                                && showReminder > 0 &&
                                <Grid className="ticketReminder">
                                    <Grid className="ticketReminderBg" direction="column">
                                        <div className="triangle"></div>
                                        <Grid justify="center" align="center" className="imageContainer">
                                            <SVG src="images/tickets.svg" className="iconContainer">
                                                <img src="images/tickets.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                                            </SVG>
                                        </Grid>
                                    </Grid>
                                    <Grid className="ticketReminderTextContainer">
                                        <div className="title">{t(`${TRANSLATE}.ticketReminder.title`)}</div>
                                        <div className="text">{t(`${TRANSLATE}.ticketReminder.text`)}</div>
                                        <div className="spacebetween" />
                                        <Grid className="buttonContainer">
                                            <Button
                                                className="cancelButton"
                                                style={ButtonStyle.BorderlessShadowBox}
                                                text={t(`${TRANSLATE}.ticketReminder.close`)}
                                                onClick={() => setShowReminder(0)}
                                            />
                                            <Button
                                                className="okButton"
                                                text={t(`${TRANSLATE}.ticketReminder.useTicket`)}
                                                onClick={() => showWeeklyLottery()}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                            <div className="walletDetails">
                                <div className="currenciesInfo smallCards">
                                    <div className="currenciesSection">
                                        <div className="currencyCards">
                                            <CurrencyCardSmall
                                                className="leftBorder eth"
                                                label={t(`${TRANSLATE}.eth`)}
                                                loading={!wallet}
                                                value={wallet ? getETHString(wallet.ethereum) : ""}
                                                onClick={() => openWalletPannel("deposit")}
                                            />
                                            <div>
                                                <CurrencyCardSmall
                                                    className="leftBorder loteu"
                                                    label={t(`${TRANSLATE}.loteu`)}
                                                    loading={!wallet}
                                                    value={wallet ? getLoteuString(wallet.loteu) : ""}
                                                    onClick={() => openWalletPannel("deposit")}
                                                />
                                                {wallet && wallet.coinbackTransferred > 0 && !coinbackPopupClosed && (
                                                    <CoinbackPopup
                                                        amount={wallet.coinbackTransferred}
                                                        onClose={closeCoinbackPopupHandler}
                                                    />
                                                )}
                                            </div>
                                            <CurrencyCardSmall
                                                className="leftBorder lotes"
                                                label={t(`${TRANSLATE}.lotes`)}
                                                loading={!wallet}
                                                value={wallet ? getLotesString(wallet.lotes) : ""}
                                                onClick={() => openWalletPannel("deposit")}
                                            />
                                            <CurrencyCardSmall
                                                className="leftBorder btc"
                                                label={t(`${TRANSLATE}.btc`)}
                                                loading={!wallet}
                                                value={wallet ? getBTCString(wallet.bitcoin) : ""}
                                                onClick={() => openWalletPannel("deposit")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button
                                className="expandWalletButton"
                                style={getButtonStyle()}
                                text={t(`${TRANSLATE}.walletDetails.btn`)}
                                iconURL="icons/wallet.svg"
                                onClick={() => openWalletPannel("deposit")}
                            />
                        </Grid>
                    </>
                )}
                {opened && !hasPendingTransactions && (
                    <div className="walletHeader">
                        <div className="title">{t(`${TRANSLATE}.walletHeader.title`)}</div>
                        <img src="icons/close.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} onClick={() => closeWalletPannel(null)} />
                    </div>
                )}
                {nextMoonVisitorInfoVisible && (
                    <div className="nextMoonVisitorInfo">
                        <div className="title">{t(`${TRANSLATE}.nextMoonVisitorInfo.title`)}</div>
                        <div className="subTitle">{t(`${TRANSLATE}.nextMoonVisitorInfo.subTitle`)}</div>
                        <div className="buttonPanel">
                            <Button
                                text={t(`${TRANSLATE}.nextMoonVisitorInfo.btn1`)}
                                style={ButtonStyle.Borderless}
                                onClick={hideNextMoonVisitorInfo}
                            />
                            <Button
                                className="buyButton"
                                text={t(`${TRANSLATE}.nextMoonVisitorInfo.btn2`)}
                                onClick={buy}
                            />
                        </div>
                        <div className="moonImageContainer">
                            <img
                                className="moonImage"
                                src="/images/loteo-moon.png"
                                alt={t(`${TRANSLATE}.alts.1.alt`)}
                            />
                        </div>
                    </div>
                )}
            </Grid>
            {opened && !hasPendingTransactions && (
                <div className="currenciesInfo">
                    {opened && opened.includes("ticket") && (
                        <div className="currenciesSection">
                            <div className="title">{t(`${TRANSLATE}.currenciesInfo.currenciesSection1.title1`)}</div>

                            <Grid wrap noPadding noWidth>
                                <div className="weeklyLotteryCard">
                                    {!wallet && (
                                        <div className="loading">
                                            {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.loading`)}
                                        </div>
                                    )}
                                    {wallet && (
                                        <>
                                            <img
                                                className="panelGraphicsImage"
                                                src="images/tickets-panel-graphic.svg"
                                                alt={t(`${TRANSLATE}.alts.2.alt`)}
                                            />
                                            <div className="title">
                                                {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.title2`)}
                                            </div>
                                            <div className="countCols">
                                                <div className="countRows">
                                                    <div className="countRow">
                                                        <div className="label">
                                                            {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.label1`)}
                                                        </div>
                                                        <div className="valueLoteoPass">
                                                            {(wallet.weeklyLotteryTickets > 0 || totalLoteoPasses <= 0) && (
                                                                <div className="value">{wallet.weeklyLotteryTickets}</div>
                                                            )}
                                                            {totalLoteoPasses > 0 && (
                                                                <div className={`loteoPass ${wallet.weeklyLotteryTickets <= 0 ? "margin0" : ""}`}>
                                                                    <div className="text">
                                                                        {wallet.weeklyLotteryTickets <= 0 ? "" : "+"} <b>{totalLoteoPasses}</b>{" "}
                                                                        {t(
                                                                            `${TRANSLATE}.currenciesInfo.currenciesSection1.text`
                                                                        )}
                                                                    </div>
                                                                    <div className="info">
                                                                        <img
                                                                            src="icons/info.svg"
                                                                            alt={t(`${TRANSLATE}.alts.3.alt`)}
                                                                            onClick={openLoteoPassPopup}
                                                                        />
                                                                        {loteoPassPopupOpened && (
                                                                            <LoteoPassPopup
                                                                                loteoPasses={wallet.loteoPasses}
                                                                                onClose={closeLoteoPassPopup}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="countRow">
                                                        <div className="label">
                                                            {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.label2`)}
                                                        </div>
                                                        <div className="valueLoteoPass">
                                                            {(wallet.weeklyLotteryTicketsInGame > 0 || wallet.loteoPassesInGame <= 0) && (
                                                                <div className="value">{wallet.weeklyLotteryTicketsInGame}</div>
                                                            )}
                                                            {wallet.loteoPassesInGame > 0 && (
                                                                <div className={`loteoPassInGame ${wallet.weeklyLotteryTicketsInGame <= 0 ? "margin0" : ""}`}>
                                                                    {wallet.weeklyLotteryTicketsInGame <= 0 ? "" : "+"} {wallet.loteoPassesInGame}{" "}
                                                                    {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.text`)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="countRows">
                                                    <div className="countRow">
                                                        <div className="label">
                                                            {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.label3`)}
                                                        </div>
                                                        <div className="valueCoinback">
                                                            <div className="value">
                                                                {wallet.ticketsUsedInCoinback}{" "}
                                                                <span className="text">
                                                                    {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.text3`)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="countRow">
                                                        <div className="label">
                                                            {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.label4`)}
                                                        </div>
                                                        <div className="valueLoteoPass">
                                                            <div className="text">
                                                                <span className="value">
                                                                    {wallet.ticketsUsedInCoinback * 10} / 100
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="weeklyLotteryCard">
                                    {!wallet && (
                                        <div className="loading">
                                            {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.loading`)}
                                        </div>
                                    )}
                                    {wallet && (
                                        <>
                                            <img
                                                className="panelGraphicsImage"
                                                src="images/tickets-panel-graphic.svg"
                                                alt={t(`${TRANSLATE}.alts.2.alt`)}
                                            />
                                            <div className="title">
                                                {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.title3`)}
                                            </div>
                                            <div className="countCols">
                                                <div className="countRows">
                                                    <div className="countRow">
                                                        <div className="label">
                                                            {t(`${TRANSLATE}.currenciesInfo.currenciesSection1.label2`)}
                                                        </div>
                                                        <div className="valueLoteoPass">
                                                            <div className="value">{wallet.apollo11LotteryTicketsInGame}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Grid>
                        </div>)}
                    {opened && opened.includes("deposit") && (
                        <div className="currenciesSection">
                            <div className="title">{t(`${TRANSLATE}.currenciesInfo.currenciesSection2.title`)}</div>
                            <div className="currencyCards">
                                <CurrencyCardFull
                                    name="Ethereum"
                                    loading={!wallet}
                                    value={wallet ? `${getETHString(wallet.ethereum)}` : ""}
                                    otherValue={
                                        (wallet && conversionRates && (
                                            <>
                                                <b>{getEURString(wallet.ethereum / conversionRates.eth)} EUR</b>
                                            </>
                                        )) ||
                                        undefined
                                    }
                                    withdraw={showETHWithdrawalDialog}
                                    deposit={showETHDepositDialog}
                                />
                                <CurrencyCardFull
                                    name="Loteu"
                                    loading={!wallet}
                                    value={wallet ? `${getLoteuString(wallet.loteu)}` : ""}
                                    otherValue={
                                        (wallet && conversionRates && (
                                            <>
                                                <b>{getEURString(wallet.loteu / conversionRates.loteu)} EUR</b>
                                            </>
                                        )) ||
                                        undefined
                                    }
                                    withdraw={showLoteuWithdrawalDialog}
                                    deposit={showLoteuDepositDialog}
                                />
                                <CurrencyCardFull
                                    name="Lotes"
                                    type="lotes"
                                    loading={!wallet}
                                    value={wallet ? `${getLotesString(wallet.lotes)}` : ""}
                                    profit={wallet ? wallet.lotesProfit : null}
                                    otherValue={
                                        (wallet && conversionRates && (
                                            <>
                                                <b>{getEURString(wallet.lotes * 0.09)} EUR</b>
                                            </>
                                        )) ||
                                        undefined
                                    }
                                    conversionRates={conversionRates}
                                />
                                <CurrencyCardFull
                                    name="Bitcoin"
                                    loading={!wallet}
                                    value={wallet ? `${getBTCString(wallet.bitcoin)}` : ""}
                                    otherValue={
                                        (wallet && conversionRates && (
                                            <>
                                                <b>{getEURString(wallet.bitcoin / conversionRates.btc)} EUR</b>
                                            </>
                                        )) ||
                                        undefined
                                    }
                                    withdraw={showBTCWithdrawalDialog}
                                    deposit={showBTCDepositDialog}
                                />
                            </div>
                        </div>)}
                </div>
            )}
            {ethDepositDialogVisible && wallet && (
                <DepositDialog
                    title={t(`${TRANSLATE}.dialog.0.title`)}
                    icon="icons/ethereum.svg"
                    name={t(`${TRANSLATE}.dialog.0.name`)}
                    currency={t(`${TRANSLATE}.eth`)}
                    balance={getETHString(wallet.ethereum)}
                    address={wallet.ethDepositAddress}
                    qrCode={`ethereum:${wallet.ethDepositAddress}`}
                    note={
                        <>
                            {t(`${TRANSLATE}.dialog.0.note`)}&nbsp;
                            <a
                                href={`https://etherscan.io/address/${wallet.ethDepositAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                etherscan.io
                            </a>
                        </>
                    }
                    onClose={hideETHDepositDialog}
                />
            )}
            {ethWithdrawalDialogVisible && wallet && (
                <WithdrawDialog
                    title={t(`${TRANSLATE}.dialog.1.title`)}
                    icon="icons/ethereum.svg"
                    name={t(`${TRANSLATE}.dialog.1.name`)}
                    currency={t(`${TRANSLATE}.eth`)}
                    balance={getETHString(wallet.ethereum)}
                    maxBalance={Math.max(wallet.ethereum - MAX_GAS_ETH, 0)}
                    addressPlaceHolder={t(`${TRANSLATE}.dialog.1.placeholder1`)}
                    amountPlaceHolder={t(`${TRANSLATE}.dialog.1.placeholder2`)}
                    note={
                        <div className="note">
                            <Trans i18nKey={`${TRANSLATE}.dialog.1.note`} />
                            &nbsp;
                            <a
                                href={`https://etherscan.io/address/${wallet.ethDepositAddress}`}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                etherscan.io
                            </a>
                        </div>
                    }
                    processing={processing}
                    error={error}
                    withdraw={withdrawETH}
                    onClose={hideETHWithdrawalDialog}
                />
            )}
            {loteuDepositDialogVisible && wallet && (
                <DepositDialog
                    title={t(`${TRANSLATE}.dialog.3.title`)}
                    icon="icons/ethereum.svg"
                    name={t(`${TRANSLATE}.dialog.3.name`)}
                    currency={t(`${TRANSLATE}.loteu`)}
                    balance={getLoteuString(wallet.loteu)}
                    address={wallet.ethDepositAddress}
                    qrCode={`ethereum:${wallet.ethDepositAddress}`}
                    note={
                        <>
                            {t(`${TRANSLATE}.dialog.3.note`)}&nbsp;
                            <a
                                href={`https://etherscan.io/address/${wallet.ethDepositAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                etherscan.io
                            </a>
                        </>
                    }
                    onClose={hideLoteuDepositDialog}
                />
            )}
            {loteuWithdrawalDialogVisible && wallet && (
                <WithdrawDialog
                    title={t(`${TRANSLATE}.dialog.4.title`)}
                    icon="icons/ethereum.svg"
                    name={t(`${TRANSLATE}.dialog.4.name`)}
                    currency={t(`${TRANSLATE}.loteu`)}
                    balance={getLoteuString(wallet.loteu)}
                    maxBalance={wallet.loteu}
                    addressPlaceHolder={t(`${TRANSLATE}.dialog.4.placeholder1`)}
                    amountPlaceHolder={t(`${TRANSLATE}.dialog.4.placeholder2`)}
                    note={
                        <div className="note">
                            <Trans i18nKey={`${TRANSLATE}.dialog.4.note`} />
                            &nbsp;
                            <a
                                href={`https://etherscan.io/address/${wallet.ethDepositAddress}`}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                etherscan.io
                            </a>
                        </div>
                    }
                    processing={processing}
                    error={error}
                    withdraw={withdrawLOTEU}
                    onClose={hideLoteuWithdrawalDialog}
                />
            )}
            {btcDepositDialogVisible && wallet && (
                <DepositDialog
                    title={t(`${TRANSLATE}.dialog.7.title`)}
                    icon="icons/bitcoin.svg"
                    name={t(`${TRANSLATE}.dialog.7.name`)}
                    currency={t(`${TRANSLATE}.btc`)}
                    balance={wallet.bitcoin ? getBTCString(wallet.bitcoin) : "0"}
                    address={wallet.btcDepositAddress}
                    qrCode={`${wallet.btcDepositAddress}`}
                    note={
                        <>
                            {t(`${TRANSLATE}.dialog.7.note`)}&nbsp;
                            <a
                                href={`https://www.blockchain.com/btc/address/${wallet.btcDepositAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                blockchain.com
                            </a>
                        </>
                    }
                    onClose={hideBTCDepositDialog}
                />
            )}
            {btcWithdrawalDialogVisible && wallet && (
                <WithdrawDialog
                    title={t(`${TRANSLATE}.dialog.8.title`)}
                    icon="icons/bitcoin.svg"
                    name={t(`${TRANSLATE}.dialog.8.name`)}
                    currency={t(`${TRANSLATE}.btc`)}
                    balance={wallet.bitcoin ? getBTCString(wallet.bitcoin) : "0"}
                    maxBalance={Math.max(wallet.bitcoin - MAX_BTC_FEE, 0)}
                    addressPlaceHolder={t(`${TRANSLATE}.dialog.8.placeholder1`)}
                    amountPlaceHolder={t(`${TRANSLATE}.dialog.8.placeholder2`)}
                    note={
                        <div className="note">
                            <Trans i18nKey={`${TRANSLATE}.dialog.8.note`} />
                            &nbsp;
                            <a
                                href={`https://www.blockchain.com/btc/address/${wallet.btcDepositAddress}`}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                blockchain.com
                            </a>
                        </div>
                    }
                    processing={processing}
                    error={error}
                    withdraw={withdrawBTC}
                    onClose={hideBTCWithdrawalDialog}
                />
            )}
            {transactionSuccessMessage && (
                <Dialog className="walletPanelDialog transactionSuccessDialog">
                    <MessagePanel
                        title={t(`${TRANSLATE}.dialog.2.title`)}
                        text={transactionSuccessMessage}
                        ok={() => setTransactionSuccessMessage(null)}
                        okText={t(`${TRANSLATE}.dialog.2.okText`)}
                    />
                </Dialog>
            )}
        </div>
    );
};

export default WalletPanel;
