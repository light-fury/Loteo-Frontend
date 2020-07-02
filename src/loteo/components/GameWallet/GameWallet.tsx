import React, {useEffect, useContext} from "react";
import {useTranslation, Trans} from "react-i18next";

import {getGameWalletBalance, depositToGameWallet, withdrawFromGameWallet} from "loteo/api";
import {useBooleanState, useDidUpdateEffect, useReduxStore} from "hooks";
import {ETHDepositDialog} from "common/components";
import {Grid, Button, ButtonStyle} from "ui/components";
import {TransactionState, Wallet} from "loteo/types";
import {MessageContext} from "app/contexts";
import {getUser} from "auth/selectors";

import {GameWalletDialog, GameWalletPopup} from "./components";

import "./gameWallet.scss";

const REFRESH_INTERVAL = 10 * 1000;

type Props = {
    wallet: Wallet | null;
    refreshWallet?();
    walletAmount: number;
    setWalletAmount: Function;
    winVisible: boolean;
};

const GameWallet = ({wallet, refreshWallet, walletAmount, setWalletAmount, winVisible}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "gameWallet";

    const [withdrawalDialogVisible, showWithdrawalDialog, hideWithdrawalDialog] = useBooleanState();
    const [depositDialogVisible, showDepositDialog, hideDepositDialog] = useBooleanState();
    const [depositPopupVisible, showDepositPopup, hideDepositPopup] = useBooleanState();
    const [transactionPopupVisible, showTransactionPopup, hideTransactionPopup] = useBooleanState();
    const [ethDepositVisible, showEthDeposit, hideEthDeposit] = useBooleanState();
    const {showError} = useContext(MessageContext);
    const pendingTransactions =
        (wallet && wallet.transactions.filter(tx => tx.state === TransactionState.PENDING)) || [];
    const hasPendingTransactions = pendingTransactions.length > 0;

    // TEMP
    const [user] = useReduxStore([getUser]);

    const updateWallet = () => {
        if (refreshWallet) {
            refreshWallet();
        }

        getGameWalletBalance().then(({balance}) => {
            if (typeof balance === "number") {
                setWalletAmount(balance);
            }
        });
    };

    useEffect(() => {
        updateWallet();
    }, []);

    useEffect(() => {
        if (hasPendingTransactions && refreshWallet) {
            const intervalID = setInterval(refreshWallet, REFRESH_INTERVAL);
            return () => clearInterval(intervalID);
        }
        // console.log("useEffect", hasPendingTransactions, refreshWallet);

        // getGameWalletBalance().then(({balance}) => {
        //     if (typeof balance === "number") {
        //         setWalletAmount(balance);
        //     }
        // });
    }, [hasPendingTransactions]);

    useEffect(() => {
        if (!winVisible) {
            updateWallet();
        }
    }, [winVisible]);

    useEffect(() => {
        setTimeout(() => {
            if (walletAmount === 0) {
                showDepositPopup();
            }
        }, 3000);
    }, [walletAmount]);

    useDidUpdateEffect(() => {
        if (!hasPendingTransactions) {
            showTransactionPopup();
            updateWallet();
        }
    }, [hasPendingTransactions]);

    const handleShowDialog = (show: () => void, hide: () => void) => {
        if (wallet) {
            if (wallet.ethereum >= 0.017) {
                show();
            } else {
                showError({
                    title: t(`${TRANSLATE}.errors.0.title`),
                    text: <Trans i18nKey={`${TRANSLATE}.errors.0.text`} />,
                    ok: showEthDeposit,
                    okText: t(`${TRANSLATE}.errors.0.confirm`),
                    cancel: hide
                });
            }
        }
    };

    const handleWihdrawal = (amount: number) => {
        withdrawFromGameWallet(amount).then(() => {
            if (refreshWallet) {
                refreshWallet();
            }
        });
        hideWithdrawalDialog();
    };

    const handleDeposit = (amount: number) => {
        depositToGameWallet(amount).then(() => {
            if (refreshWallet) {
                refreshWallet();
            }
        });
        hideDepositDialog();
        hideDepositPopup();
    };

    return (
        <div className="gameWallet">
            {hasPendingTransactions ? (
                <div className="pendingTransactions">
                    <div className="text">{t(`${TRANSLATE}.pendingTransactions.text`)}</div>
                    <div className="link">
                        {t(`${TRANSLATE}.pendingTransactions.link`)}&nbsp;
                        <a
                            href={`https://etherscan.io/address/${wallet && wallet.ethDepositAddress}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            etherscan.io
                        </a>
                        .
                    </div>
                </div>
            ) : (
                <>
                    <Grid align="baseline" className="gameWallet__balance" noWidth>
                        <span>{t(`${TRANSLATE}.title`)}</span>
                        <strong>{walletAmount >= 0 && walletAmount}</strong>
                    </Grid>
                    <Grid noWidth>
                        {user && user.username !== "ayaanrah26" && (
                            <Button
                                text={t(`${TRANSLATE}.sections.1.text`)}
                                style={ButtonStyle.TransparentWhite}
                                onClick={() => handleShowDialog(showWithdrawalDialog, hideWithdrawalDialog)}
                            />
                        )}
                        <Button
                            text={t(`${TRANSLATE}.sections.2.text`)}
                            style={ButtonStyle.RedCondensed}
                            onClick={() => handleShowDialog(showDepositDialog, hideDepositDialog)}
                        />
                    </Grid>
                </>
            )}
            {transactionPopupVisible && (
                <GameWalletPopup
                    className="transaction"
                    title={t(`${TRANSLATE}.sections.0.title`)}
                    text={t(`${TRANSLATE}.sections.0.text`)}
                    buttonText={t(`${TRANSLATE}.sections.0.buttonText`)}
                    onClick={hideTransactionPopup}
                />
            )}
            {!hasPendingTransactions && depositPopupVisible && (
                <GameWalletPopup
                    className="deposit"
                    title={t(`${TRANSLATE}.sections.3.title`)}
                    text={t(`${TRANSLATE}.sections.3.text`)}
                    buttonText={t(`${TRANSLATE}.sections.3.buttonText`)}
                    onClick={hideDepositPopup}
                />
            )}
            {withdrawalDialogVisible && (
                <GameWalletDialog
                    title={t(`${TRANSLATE}.sections.4.title`)}
                    balanceCardCurrency={t(`${TRANSLATE}.sections.4.balanceCardCurrency`)}
                    walletAmount={walletAmount}
                    inputLabel={t(`${TRANSLATE}.sections.4.inputLabel`)}
                    buttonText={t(`${TRANSLATE}.sections.4.buttonText`)}
                    onConfirm={handleWihdrawal}
                    onClose={hideWithdrawalDialog}
                />
            )}
            {depositDialogVisible && (
                <GameWalletDialog
                    title={t(`${TRANSLATE}.sections.5.title`)}
                    balanceCardCurrency={t(`${TRANSLATE}.sections.5.balanceCardCurrency`)}
                    walletAmount={wallet ? wallet.loteu : 0}
                    inputLabel={t(`${TRANSLATE}.sections.5.inputLabel`)}
                    buttonText={t(`${TRANSLATE}.sections.5.buttonText`)}
                    onConfirm={handleDeposit}
                    onClose={hideDepositDialog}
                    allowAmount={true}
                />
            )}
            {ethDepositVisible && wallet && <ETHDepositDialog wallet={wallet} onClose={hideEthDeposit} />}
        </div>
    );
};

export default GameWallet;
