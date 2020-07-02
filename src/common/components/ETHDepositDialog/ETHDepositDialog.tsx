import React from "react";
import {useTranslation} from "react-i18next";

import {Wallet} from "loteo/types";
import {getETHString} from "common/utils";
import {DepositDialog} from "common/components";

type Props = {
    wallet: Wallet;
    onClose();
};

const ETHDepositDialog = ({wallet, onClose}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "walletPanel";

    return (
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
            onClose={onClose}
        />
    );
};

export default ETHDepositDialog;
