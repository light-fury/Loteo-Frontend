import React from "react";
import {useTranslation} from "react-i18next";

import {isETHAddressValid, isBTCAddressValid} from "common/utils";
import {useInputState, useNumberInputState} from "hooks";
import {Button, ButtonStyle, Dialog, Input, Grid} from "ui/components";
import {ErrorList, LabelInput} from "common/components";
import {BalanceCard} from "loteo/components";

import "./withdrawDialog.scss";

type Props = {
    title: string;
    note: React.ReactNode;
    icon: string;
    name: string;
    balance: string;
    currency: string;
    maxBalance: number;
    addressPlaceHolder: string;
    amountPlaceHolder: string;
    processing: boolean;
    error?: string;
    withdraw(address: string, amount: number);
    onClose();
};

const WithdrawDialog = ({
    title,
    note,
    icon,
    name,
    balance,
    currency,
    maxBalance,
    addressPlaceHolder,
    amountPlaceHolder,
    processing,
    error,
    withdraw,
    onClose
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "walletPanel";

    const [withdrawalAddress, setWithdrawalAddress] = useInputState();
    const [withdrawalAmount, setWithdrawalAmount, setWithdrawalAmountDirectly] = useNumberInputState(-1);

    const withdrawFromWallet = () => {
        if (withdrawalAmount > maxBalance) {
            setWithdrawalAmountDirectly(maxBalance);
            return;
        }
        withdraw(withdrawalAddress, withdrawalAmount);
    };

    const validateAddress = (address: string, isEth: boolean) => {
        if (isEth) {
            return isETHAddressValid(address);
        }
        return isBTCAddressValid(address);
    };

    return (
        <Dialog className="withdrawalDialog" title={title} onClose={onClose}>
            <div className="title">{t(`${TRANSLATE}.withdraw.balanceTitle`)}</div>
            <BalanceCard icon={icon} name={name} value={`${balance} ${currency}`} showRedValue active />
            <div className="title">
                {currency} {t(`${TRANSLATE}.withdraw.addressTitle`)}
            </div>
            <Input
                className="withdrawalAddressInput"
                value={withdrawalAddress}
                onChange={setWithdrawalAddress}
                error={withdrawalAddress && !validateAddress(withdrawalAddress, currency !== "BTC") ? title : null}
                placeholder={addressPlaceHolder}
            />
            <Grid className="withdrawalAmountGroup" noWidth align="center">
                <LabelInput
                    className="withdrawalAmountLabel"
                    label={currency}
                    value={withdrawalAmount === -1 ? "" : withdrawalAmount}
                    onChange={setWithdrawalAmount}
                    placeholder={amountPlaceHolder}
                />
                <Button
                    className="maxButton"
                    text={t(`${TRANSLATE}.withdraw.max`)}
                    onClick={() => setWithdrawalAmountDirectly(maxBalance)}
                    style={ButtonStyle.None}
                />
            </Grid>
            {note}
            <ErrorList errors={error ? [error] : []} />
            <Button
                className="submitButton"
                text={
                    processing ? t(`${TRANSLATE}.withdraw.processingButton`) : t(`${TRANSLATE}.withdraw.submitButton`)
                }
                onClick={withdrawFromWallet}
                disabled={processing || !withdrawalAmount || !validateAddress(withdrawalAddress, currency !== "BTC")}
            />
        </Dialog>
    );
};

export default WithdrawDialog;
