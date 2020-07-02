import React, {useEffect, useState, useContext, useRef} from "react";
import {useTranslation, Trans} from "react-i18next";
import QRCode from "qrcode";
import copy from "copy-to-clipboard";
import {withRouter} from "react-router";
import AutosizeInput from "react-input-autosize";

import {MessageContext} from "app/contexts";
import useInterval from "hooks/useInterval";
import {Button, Grid, ButtonStyle} from "ui/components";
import {PaymentInfo, TicketCart, ConversionRates, TransactionState} from "loteo/types";
import {TICKET_PRICES, MESSAGE_TRANSACTION_FAILED} from "loteo/constants";
import {BalanceCard, BackgroundStatic} from "loteo/components";
import {getCoinPaymentsAddress, payWithEthereum, payFromWallet} from "loteo/api";
import {loadWallet} from "loteo/actions";
import {getWallet, getConversionRates} from "loteo/selectors";
import {MessagePanel, TransactionInProgress} from "common/components";
import {getBTCString, getETHString, getEURString} from "common/utils";
import {useBooleanState, useReduxLoad, useReduxActions, useReduxStore, useNumberInputState} from "hooks";

import "./paymentDialog.scss";

type ConfirmInfo = {
    value: string;
    negative: boolean;
    confirm();
};

type GeneratedPayment = {
    value: string;
    address: string;
};

type Props = {
    tickets: TicketCart;
    close();
    history: {push: Function};
    location: Location;
    scrollToDiv();
};

const PaymentDialog = ({tickets, close, history, location, scrollToDiv}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "paymentDialog";
    const {showPayment, showError} = useContext(MessageContext);
    const [wallet] = useReduxLoad([loadWallet()], [getWallet]);
    const [previousWallet, setPreviousWallet] = useState();
    const [conversionRates]: [ConversionRates | null] = useReduxStore([getConversionRates]);
    const [refreshWallet] = useReduxActions([loadWallet]);
    const scrollView = useRef<HTMLDivElement>(null);
    const [currentTab, setCurrentTab] = useState(0);
    const [copied, setCopied] = useState(false);
    const [qrCodeDataURL, setQRCodeDataURL] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [seconds, setSeconds] = useState(3600);
    const [loteuAmount, setLoteuAmount, setLoteuAmountDirectly] = useNumberInputState(Number(tickets["loteu"]));
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const totalEUR = paymentInfo ? getEURString(paymentInfo.totalEUR) : "-";
    const totalETH = paymentInfo ? getETHString(paymentInfo.totalETH) : "-";
    const totalBTC = paymentInfo ? getBTCString(paymentInfo.totalBTC) : "-";
    const hasPendingTransactions = wallet && wallet.transactions.some(tx => tx.state === TransactionState.PENDING);
    const [generatedPaymentLoading, startGeneratedPaymentLoading, finishGeneratedPaymentLoading] = useBooleanState(
        false
    );
    const [generatedPayment, setGeneratedPayment] = useState<GeneratedPayment | null>(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentInProgress, setPaymentInProgress] = useState(false);
    const [btcProcessing, setBtcProcessing] = useState(false);
    const [emptyDialog, setEmptyDialog] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useBooleanState();

    useEffect(() => {
        const tempPaymentInfo = {
            totalBTC: 0,
            totalETH: 0,
            totalEUR: 0
        };
        if (tickets["tickets"]) {
            tempPaymentInfo.totalEUR += tickets["tickets"] * (conversionRates ? conversionRates.weeklyTicketPrice : 0);
        }
        if (tickets["loteoPass"]) {
            tempPaymentInfo.totalEUR += tickets["loteoPass"] * (conversionRates ? conversionRates.loteoPassPrice : 0);
        }
        if (tickets["loteoMaxx10"]) {
            tempPaymentInfo.totalEUR += tickets["loteoMaxx10"] * (conversionRates ? conversionRates.loteoMaxx10Price : 0);
        }
        if (tickets["loteoMaxx20"]) {
            tempPaymentInfo.totalEUR += tickets["loteoMaxx20"] * (conversionRates ? conversionRates.loteoMaxx20Price : 0);
        }
        if (tickets["loteoMaxx50"]) {
            tempPaymentInfo.totalEUR += tickets["loteoMaxx50"] * (conversionRates ? conversionRates.loteoMaxx50Price : 0);
        }
        if (tickets["loteoMaxx100"]) {
            tempPaymentInfo.totalEUR += tickets["loteoMaxx100"] * (conversionRates ? conversionRates.loteoMaxx100Price : 0);
        }
        if (tickets.loteu) {
            tempPaymentInfo.totalEUR += tickets.loteu / (conversionRates ? conversionRates.loteuBuy : 125);
        }

        tempPaymentInfo.totalBTC = tempPaymentInfo.totalEUR * (conversionRates ? conversionRates.btc : 0);
        tempPaymentInfo.totalETH = tempPaymentInfo.totalEUR * (conversionRates ? conversionRates.eth : 0);

        setPaymentInfo(tempPaymentInfo);
    }, [tickets]);

    useEffect(() => {
        let tempTickets = {...tickets} || {};
        tempTickets["loteu"] = Number(loteuAmount);
        showPayment(tempTickets);
    }, [loteuAmount]);

    const updateTicketInfo = (name, value) => {
        let tempTickets = {...tickets} || {};
        tempTickets[name] += (name === "loteu" ? value * 100 : value);
        if (name === "loteu") {
            if ((tempTickets["tickets"] && tempTickets["tickets"] > 0)
                || (tempTickets["loteoPass"] && tempTickets["loteoPass"] > 0)
                || (tempTickets["loteoMaxx10"] && tempTickets["loteoMaxx10"] > 0)
                || (tempTickets["loteoMaxx20"] && tempTickets["loteoMaxx20"] > 0)
                || (tempTickets["loteoMaxx50"] && tempTickets["loteoMaxx50"] > 0)
                || (tempTickets["loteoMaxx100"] && tempTickets["loteoMaxx100"] > 0)) {
                if (tempTickets[name] < 100) {
                    if (value < 0) {
                        tempTickets[name] = 0;
                    } else {
                        tempTickets[name] = 100;
                    }
                }
            } else {
                if (tempTickets[name] < (conversionRates ? Number((conversionRates.loteuBuy * 10).toFixed(0)) : 4000)) {
                    tempTickets[name] = conversionRates ? Number((conversionRates.loteuBuy * 10).toFixed(0)) : 4000;
                }
            }
            setLoteuAmountDirectly(tempTickets[name]);
        } else {
            if (tempTickets[name] <= 0) {
                tempTickets[name] -= value;
            }
        }
        showPayment(tempTickets);
    };

    const toPriceRow = (name, price, offset) => (
        <Grid direction="row" className="priceRow">
            <Grid className="leftText">{name}</Grid>
            <Grid className="countControls">
                <img onClick={() => updateTicketInfo(offset, -1)} src="icons/button-minus.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                <Grid className="count">{tickets[offset].toLocaleString(undefined, {minimumIntegerDigits: 2})}</Grid>
                <img onClick={() => updateTicketInfo(offset, 1)} src="icons/button-plus.svg" alt={t(`${TRANSLATE}.alts.2.alt`)} />
            </Grid>
            <Grid className="rightText">{getEURString(price, true)} EUR</Grid>
        </Grid>
    );

    const toLoteuPriceRow = (name, price, offset) => (
        <Grid direction="column">
            <Grid direction="row" className={`priceRow loteuRow ${showErrorMessage === 0 ? "showErrorMessage" : ""}`}>
                <Grid className="leftText">{name}</Grid>
                <Grid className="countControls">
                    <img onClick={() => updateTicketInfo(offset, -1)} src="icons/button-minus.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                    <AutosizeInput
                        name="loteu-field-name"
                        className="loteoTextInputContainer"
                        inputClassName="loteoTextInput"
                        value={loteuAmount}
                        onChange={setLoteuAmount}
                        placeholder="00"
                        placeholderIsMinWidth
                    />
                    <img onClick={() => updateTicketInfo(offset, 1)} src="icons/button-plus.svg" alt={t(`${TRANSLATE}.alts.2.alt`)} />
                </Grid>
                <Grid className="rightText">{getEURString(price, true)} EUR</Grid>
            </Grid>
            <Grid justify="center" className="topBottomGrid">
                {showErrorMessage > 0 &&
                    <div className="warningText">
                        {showErrorMessage === 1 ? t(`${TRANSLATE}.errorDialog.0.text`) : t(`${TRANSLATE}.errorDialog.1.text`)}
                    </div>
                }
            </Grid>
        </Grid>
    );

    const goToPaymentMethod = () => {
        if ((tickets["tickets"] && tickets["tickets"] > 0)
            || (tickets["loteoPass"] && tickets["loteoPass"] > 0)
            || (tickets["loteoMaxx10"] && tickets["loteoMaxx10"] > 0)
            || (tickets["loteoMaxx20"] && tickets["loteoMaxx20"] > 0)
            || (tickets["loteoMaxx50"] && tickets["loteoMaxx50"] > 0)
            || (tickets["loteoMaxx100"] && tickets["loteoMaxx100"] > 0)) {
            if (tickets["loteu"] && tickets["loteu"] < 100) {
                setShowErrorMessage(1);
                scrollToBottom();
                setTimeout(() => setShowErrorMessage(0), 2000);
                return;
            }
        } else {
            if (tickets["loteu"] && tickets["loteu"] < (conversionRates ? Number((conversionRates.loteuBuy * 10).toFixed(0)) : 4000)) {
                setShowErrorMessage(2);
                scrollToBottom();
                setTimeout(() => setShowErrorMessage(0), 2000);
                return;
            }
        }
        setCurrentTab(1);
    };

    const scrollToBottom = () => {
        const component = scrollView.current;
        if (component) {
            component.scrollIntoView({behavior: "smooth"});
        }
    };

    const confirmEthereum = () => {
        if (paymentInfo && paymentInfo.totalETH > wallet.ethereum) {
            return;
        }
        confirmEthereumPayment();
    };

    const generateEthereumPayment = () => {
        startGeneratedPaymentLoading();

        getCoinPaymentsAddress(tickets)
            .then(response => {
                setGeneratedPayment({
                    value: `${response.amountToPay} ${t(`${TRANSLATE}.eth`)}`,
                    address: response.address
                });

                finishGeneratedPaymentLoading();
            })
            .catch(error => {
                finishGeneratedPaymentLoading();
                console.error(error);
            });
    };

    const confirmBitcoin = () => {
        if (paymentInfo && paymentInfo.totalBTC > wallet.bitcoin) {
            return;
        }
        confirmBitcoinPayment();
    };

    useEffect(() => {
        if (paymentInProgress && !hasPendingTransactions) {
            if (wallet && wallet.ethereum !== previousWallet.ethereum) {
                setPaymentSuccess();
            } else if (wallet && wallet.bitcoin !== previousWallet.bitcoin) {
                setPaymentSuccess();
            } else {
                close();
                showError(MESSAGE_TRANSACTION_FAILED);
            }
            setPaymentProcessing(false);
            setPaymentInProgress(false);
            setBtcProcessing(false);
            setEmptyDialog(false);
        }
    }, [hasPendingTransactions]);

    const confirmEthereumPayment = async () => {
        try {
            setPaymentProcessing(true);
            await payWithEthereum(tickets);
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
        } catch (err) {
            setPaymentProcessing(false);
            console.log(err);
        }
    };

    const confirmBitcoinPayment = async () => {
        try {
            setPaymentProcessing(true);
            setBtcProcessing(true);
            await payFromWallet(tickets, "btc");
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
        } catch (err) {
            setPaymentProcessing(false);
            setBtcProcessing(false);
            console.log(err);
        }
    };

    const copyAddress = (address) => {
        copy(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 200);
    };

    useInterval(() => setSeconds(seconds - 1));

    const generateQRCode = async text => {
        const qrCodeDataURL = await QRCode.toDataURL(text);
        setQRCodeDataURL(qrCodeDataURL);
        setSeconds(3600);
    };

    useEffect(() => {
        if (generatedPayment) {
            generateQRCode(generatedPayment.value);
        }
    }, [generatedPayment]);

    if (paymentSuccess) {
        const flag = (tickets["tickets"] && tickets["tickets"] > 0)
            || (tickets["loteoPass"] && tickets["loteoPass"] > 0)
            || (tickets["loteoMaxx10"] && tickets["loteoMaxx10"] > 0)
            || (tickets["loteoMaxx20"] && tickets["loteoMaxx20"] > 0)
            || (tickets["loteoMaxx50"] && tickets["loteoMaxx50"] > 0)
            || (tickets["loteoMaxx100"] && tickets["loteoMaxx100"] > 0);
        return (
            <Grid align="center" justify="center" className="paymentDialog">
                <div className="dialogOverlay" />
                <div className="dialogScrollContainer">
                    <Grid className="dialogArea payWithEth">
                        <MessagePanel
                            title={t(`${TRANSLATE}.messagePanel.title`)}
                            text={flag ? t(`${TRANSLATE}.messagePanel.text`) : t(`${TRANSLATE}.messagePanel.loteuText`)}
                            ok={() => {
                                if (!flag && location.pathname === "/dashboard") {
                                    scrollToDiv();
                                }
                                close();
                            }}
                            cancel={() => {
                                close(); history.push("/dashboard");
                            }}
                            okText={flag ? t(`${TRANSLATE}.messagePanel.okText`) : t(`${TRANSLATE}.messagePanel.playText`)}
                            cancelText={flag ? t(`${TRANSLATE}.messagePanel.cancelText`) : t(`${TRANSLATE}.messagePanel.closeText`)}
                            cancelStyle={ButtonStyle.BorderlessShadowBox}
                        />
                    </Grid>
                </div>
            </Grid>
        );
    }

    const onCloseBtcProgress = () => {
        setPaymentProcessing(false);
        setBtcProcessing(false);
        setEmptyDialog(true);
    };

    if (paymentProcessing) {
        return (
            <TransactionInProgress btcPayment={btcProcessing} onClose={onCloseBtcProgress} />
        );
    }

    if (generatedPayment) {
        return (
            <Grid align="center" justify="center" className="paymentDialog">
                <div className="dialogOverlay" />
                <div className="dialogScrollContainer">
                    <Grid className="dialogArea payWithEth">
                        <div className="headerContainer">
                            <Grid direction="column" justify="center" className="titleSubTitle">
                                {t(`${TRANSLATE}.payWithEth`)}
                            </Grid>
                            <div className="text">
                                <Trans
                                    i18nKey={`${TRANSLATE}.dialog.0.info`}
                                    values={{payment: `${getETHString(parseFloat(generatedPayment.value))} ${t(`${TRANSLATE}.eth`)}`}}
                                />
                            </div>
                            <img className="closeButton" src="icons/close.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} onClick={close} />
                        </div>
                        <Grid direction="row" align="center" className="ethAddressContainer">
                            <div className="ethAddressText">
                                {generatedPayment.address}
                            </div>
                            <Button
                                text={copied ? t(`${TRANSLATE}.copied`) : t(`${TRANSLATE}.copy`)}
                                onClick={() => copyAddress(generatedPayment.address)}
                                className="payButton"
                            />
                        </Grid>
                        <Grid direction="column" align="center" justify="center" className="ethQRCodeContainer">
                            {(qrCodeDataURL || generatedPayment.value) && (
                                <div>
                                    {qrCodeDataURL && <img src={qrCodeDataURL || ""} alt={t(`${TRANSLATE}.alts.0.alt`)} />}
                                </div>
                            )}
                            {(qrCodeDataURL || generatedPayment.value) && (
                                <div className="validForText">
                                    {t(`${TRANSLATE}.qrCodeValid`)}
                                    <strong>{`${(Math.floor(seconds / 60) < 10 ? "0" : "")}${Math.floor(seconds / 60)}:${((seconds % 60) < 10 ? "0" : "")}${(seconds % 60)}`}</strong>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        );
    }

    if (emptyDialog) {
        return null;
    }

    return (
        <Grid align="center" justify="center" className="paymentDialog">
            <div className="dialogOverlay" />
            <div className="dialogScrollContainer">
                <Grid className="dialogArea">
                    <BackgroundStatic className="dialogHeader">
                        <Grid direction="column" justify="center" className="titleSubTitle">
                            {t(`${TRANSLATE}.title`)}
                        </Grid>
                        <Grid align="end" className="contextTabs">
                            <div
                                className={`contextTab ${currentTab === 0 ? "active" : ""}`}
                                onClick={() => setCurrentTab(0)}
                            >
                                {t(`${TRANSLATE}.tabs.0.alt`)}
                            </div>
                            <div
                                className={`contextTab ${currentTab === 1 ? "active" : ""}`}
                                onClick={goToPaymentMethod}
                            >
                                {t(`${TRANSLATE}.tabs.1.alt`)}
                            </div>
                        </Grid>
                        <img className="closeButton" src="icons/close.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} onClick={close} />
                    </BackgroundStatic>
                    {currentTab === 0 && <Grid justify="center" direction="column" className="dialogContent">
                        <div className="summaryDetails">
                            <Grid direction="column">
                                {(tickets.tickets &&
                                    toPriceRow(
                                        t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.0.row`),
                                        tickets.tickets * TICKET_PRICES.ticket,
                                        "tickets"
                                    )) ||
                                    ""}
                                {(tickets.loteoPass &&
                                    toPriceRow(
                                        t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.1.row`),
                                        tickets.loteoPass * TICKET_PRICES.loteoPass,
                                        "loteoPass"
                                    )) ||
                                    ""}
                                {(tickets.loteoMaxx10 &&
                                    toPriceRow(
                                        t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.2.row`),
                                        tickets.loteoMaxx10 * TICKET_PRICES.loteoMaxx10,
                                        "loteoMaxx10"
                                    )) ||
                                    ""}
                                {(tickets.loteoMaxx20 &&
                                    toPriceRow(
                                        t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.3.row`),
                                        tickets.loteoMaxx20 * TICKET_PRICES.loteoMaxx20,
                                        "loteoMaxx20"
                                    )) ||
                                    ""}
                                {(tickets.loteoMaxx50 &&
                                    toPriceRow(
                                        t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.4.row`),
                                        tickets.loteoMaxx50 * TICKET_PRICES.loteoMaxx50,
                                        "loteoMaxx50"
                                    )) ||
                                    ""}
                                {(tickets.loteoMaxx100 &&
                                    toPriceRow(
                                        t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.5.row`),
                                        tickets.loteoMaxx100 * TICKET_PRICES.loteoMaxx100,
                                        "loteoMaxx100"
                                    )) ||
                                    ""}
                                {(tickets.loteu &&
                                    toLoteuPriceRow(
                                        t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.6.row`),
                                        tickets.loteu / (conversionRates ? conversionRates.loteuBuy : 125),
                                        "loteu"
                                    )) ||
                                    ""}
                                {(!tickets.loteu &&
                                    toLoteuPriceRow(
                                        t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.6.row`),
                                        0,
                                        "loteu"
                                    )) ||
                                    ""}
                                <div className="bottomDiv" ref={scrollView} />
                            </Grid>
                        </div>
                        <Grid justify="center" className="totalContainer">
                            <Grid
                                wrap
                                align="center"
                                justify="center"
                                className="summaryPanel"
                            >
                                <Grid justify="end" className="totals" noWidth>
                                    <div className="label">{t(`${TRANSLATE}.total`)}</div>
                                    <div className="value">
                                        <b>{totalETH}</b> {t(`${TRANSLATE}.eth`)}
                                    </div>
                                    <div className="value">
                                        <b>{totalBTC}</b> {t(`${TRANSLATE}.btc`)}
                                    </div>
                                    <div className="value main">
                                        <b>{totalEUR}</b> €
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid align="center" justify="center" className="buttonContainer">
                            <Button
                                className="goToPaymentButton"
                                text={t(`${TRANSLATE}.goToPaymentMethod`)}
                                onClick={goToPaymentMethod}
                            />
                        </Grid>
                    </Grid>}
                    {currentTab === 1 && <Grid justify="center" direction="column" className="dialogContent">
                        <Grid direction="column" className="payMethods">
                            <div className="card">
                                <BalanceCard
                                    icon="icons/ethereum.svg"
                                    name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.name1`)}
                                    value={`${getETHString(wallet.ethereum)} ${t(`${TRANSLATE}.eth`)}`}
                                    showRedValue={paymentInfo && paymentInfo.totalETH > wallet.ethereum}
                                    active={paymentInfo && paymentInfo.totalETH > wallet.ethereum ? false : true}
                                    onClick={confirmEthereum}
                                />
                                <BalanceCard
                                    icon="icons/bitcoin.svg"
                                    name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card1`)}
                                    value={`${getBTCString(wallet.bitcoin)} ${t(`${TRANSLATE}.btc`)}`}
                                    showRedValue={paymentInfo && paymentInfo.totalBTC > wallet.bitcoin}
                                    active={paymentInfo && paymentInfo.totalBTC > wallet.bitcoin ? false : true}
                                    onClick={confirmBitcoin}
                                />
                                <div className="title">{t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.t2`)}</div>
                                <BalanceCard
                                    icon="icons/ethereum-round.svg"
                                    name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card2`)}
                                    value={t(`${TRANSLATE}.dialog.1.paymentOptions.otherPayment.info1`)}
                                    showRedValue={false}
                                    onClick={generateEthereumPayment}
                                    loading={generatedPaymentLoading}
                                    description
                                    active
                                />
                                <BalanceCard
                                    icon="icons/card.svg"
                                    name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card3`)}
                                    comingSoon
                                />
                            </div>
                        </Grid>
                    </Grid>}
                </Grid>
            </div>
        </Grid>
    //  {/* <Dialog
    //         className="paymentDialog"
    //         title={t(`${TRANSLATE}.dialog.1.title`)}
    //         subTitle={t(`${TRANSLATE}.dialog.1.subTitle`)}
    //         onClose={close}
    //     >
    //          <Grid className="paymentOptions">
    //             <Grid direction="column" className="summary">
    //                 <div className="title">{t(`${TRANSLATE}.dialog.1.paymentOptions.summary.title`)}</div>
    //                 <Grid justify="space-between" className="priceRows">
    //                     {(tickets.tickets &&
    //                         toPriceRow(
    //                             t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.0.row`),
    //                             tickets.tickets * TICKET_PRICES.ticket
    //                         )) ||
    //                         ""}
    //                     {(tickets.loteoPass &&
    //                         toPriceRow(
    //                             t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.1.row`),
    //                             tickets.loteoPass * TICKET_PRICES.loteoPass
    //                         )) ||
    //                         ""}
    //                     {(tickets.loteoMaxx10 &&
    //                         toPriceRow(
    //                             t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.2.row`),
    //                             tickets.loteoMaxx10 * TICKET_PRICES.loteoMaxx10
    //                         )) ||
    //                         ""}
    //                     {(tickets.loteoMaxx20 &&
    //                         toPriceRow(
    //                             t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.3.row`),
    //                             tickets.loteoMaxx20 * TICKET_PRICES.loteoMaxx20
    //                         )) ||
    //                         ""}
    //                     {(tickets.loteoMaxx50 &&
    //                         toPriceRow(
    //                             t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.4.row`),
    //                             tickets.loteoMaxx50 * TICKET_PRICES.loteoMaxx50
    //                         )) ||
    //                         ""}
    //                     {(tickets.loteoMaxx100 &&
    //                         toPriceRow(
    //                             t(`${TRANSLATE}.dialog.1.paymentOptions.summary.price.5.row`),
    //                             tickets.loteoMaxx100 * TICKET_PRICES.loteoMaxx100
    //                         )) ||
    //                         ""}
    //                 </Grid>
    //                 <Grid align="baseline" justify="space-between" className="totalPrice">
    //                     <div className="label">{t(`${TRANSLATE}.dialog.1.paymentOptions.summary.label`)}</div>
    //                     <div className="price">{totalEUR} €</div>
    //                 </Grid>
    //                 <Grid align="baseline" justify="end" className="otherCurrencies">
    //                     <div className="price">
    //                         <span className="value">{totalETH}</span> {t(`${TRANSLATE}.eth`)}
    //                     </div>
    //                     <div className="price">
    //                         <span className="value">{totalBTC}</span> {t(`${TRANSLATE}.btc`)}
    //                     </div>
    //                 </Grid>
    //             </Grid>
    //             {!confirmInfo && !otherPaymentVisible && wallet && (
    //                 <Grid direction="column" className="payMethods">
    //                     <div className="deduction card">
    //                         <div className="title">{t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.t1`)}</div>
    //                         <BalanceCard
    //                             icon="icons/ethereum.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.name1`)}
    //                             value={`${getETHString(wallet.ethereum)} ${t(`${TRANSLATE}.eth`)}`}
    //                             showRedValue={paymentInfo && paymentInfo.totalETH > wallet.ethereum}
    //                             onClick={confirmEthereum}
    //                         />
    //                         <BalanceCard
    //                             icon="icons/bitcoin.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card1`)}
    //                             comingSoon
    //                         />
    //                     </div>
    //                     <div className="newPayment card">
    //                         <div className="title">{t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.t2`)}</div>
    //                         <BalanceCard
    //                             icon="icons/cryptocurrency.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card2`)}
    //                             onClick={showOtherPayment}
    //                             active
    //                         />
    //                         <BalanceCard
    //                             icon="icons/card.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card3`)}
    //                             comingSoon
    //                         />
    //                         <BalanceCard
    //                             icon="icons/bank.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card4`)}
    //                             comingSoon
    //                         />
    //                         <BalanceCard
    //                             icon="icons/sms.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card5`)}
    //                             comingSoon
    //                         />
    //                         <BalanceCard
    //                             icon="icons/world.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.payMethods.card6`)}
    //                             comingSoon
    //                         />
    //                     </div>
    //                 </Grid>
    //             )}
    //             {!confirmInfo && otherPaymentVisible && (
    //                 <div className="otherPayment">
    //                     {renderBackToOptions()}
    //                     <div className="title">{t(`${TRANSLATE}.dialog.1.paymentOptions.otherPayment.title`)}</div>
    //                     <div className="options">
    //                         <BalanceCard
    //                             icon="icons/ethereum.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.otherPayment.name1`)}
    //                             onClick={generateEthereumPayment}
    //                             loading={generatedPaymentLoading}
    //                             active
    //                         />
    //                         <BalanceCard
    //                             icon="icons/bitcoin.svg"
    //                             name={t(`${TRANSLATE}.dialog.1.paymentOptions.otherPayment.name2`)}
    //                             comingSoon
    //                         />
    //                     </div>
    //                 </div>
    //             )}
    //             {confirmInfo && (
    //                 <Grid direction="column" align="start" className="confirmation">
    //                     {renderBackToOptions()}
    //                     {confirmInfo.negative && (
    //                         <>
    //                             <div className="text">
    //                                 {t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.text1.0.span`)}{" "}
    //                                 <span className="bolder red">
    //                                     {t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.text1.1.span`)}
    //                                 </span>{" "}
    //                                 {t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.text1.2.span`)}
    //                             </div>
    //                             <div className="info">
    //                                 {t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.info`)}
    //                             </div>
    //                             <div className="fill" />
    //                         </>
    //                     )}
    //                     {!confirmInfo.negative && (
    //                         <>
    //                             <div className="text">
    //                                 {t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.text2.0.span`)}{" "}
    //                                 <span className="bolder">
    //                                     {t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.text2.1.span`)} <br />
    //                                     {confirmInfo.value}
    //                                 </span>{" "}
    //                                 <br />
    //                                 {t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.text2.2.span`)}
    //                             </div>
    //                             <div className="fill" />
    //                             <Button
    //                                 className="confirmPaymentButton"
    //                                 text={
    //                                     paymentProcessing
    //                                         ? t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.btn1`)
    //                                         : t(`${TRANSLATE}.dialog.1.paymentOptions.confirmation.btn2`)
    //                                 }
    //                                 onClick={confirmInfo.confirm}
    //                                 disabled={paymentProcessing}
    //                             />
    //                         </>
    //                     )}
    //                     <Button text="Cancel" style={ButtonStyle.Borderless} onClick={goBack} />
    //                 </Grid>
    //             )}
    //         </Grid>
    //     </Dialog> */}
    );
};

export default withRouter(PaymentDialog);
