import React from "react";
import {useTranslation} from "react-i18next";

import {Dialog} from "ui/components";
import {Address, BalanceCard} from "loteo/components";

import "./depositDialog.scss";

type Props = {
    title: string;
    note: React.ReactNode;
    icon: string;
    name: string;
    balance: string;
    currency: string;
    address: string;
    qrCode: string;
    onClose();
};

const DepositDialog = ({title, note, icon, name, balance, currency, address, qrCode, onClose}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "walletPanel";

    return (
        <Dialog className="depositDialog" title={title} onClose={onClose}>
            <div className="title">{t(`${TRANSLATE}.deposit.balanceTitle`)}</div>
            <BalanceCard icon={icon} name={name} value={`${balance} ${currency}`} showRedValue active />
            <div className="title">
                {currency} {t(`${TRANSLATE}.deposit.addressTitle`)}
            </div>
            <Address address={address} qrCodeValue={qrCode} note={note} />
        </Dialog>
    );
};

export default DepositDialog;
