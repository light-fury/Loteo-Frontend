import React from "react";
import {useTranslation} from "react-i18next";

import {useNumberInputState} from "hooks";
import {Button, ButtonStyle, Dialog, Input} from "ui/components";
import {getLoteuString} from "common/utils";

type Props = {
    title?: string;
    balanceCardCurrency?: string;
    walletAmount: number;
    inputLabel?: string;
    buttonText: string;
    onConfirm: (amount: number) => void;
    onClose();
    allowAmount?: boolean;
};

const GameWalletDialog = ({
    title,
    balanceCardCurrency,
    walletAmount,
    inputLabel,
    buttonText,
    onConfirm,
    onClose,
    allowAmount = false
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "gameWalletDialog";

    const [loteuAmount, setLoteuAmount] = useNumberInputState();

    return (
        <Dialog className="gameWallet__dialog" title={title || ""} hasCloseButton={false}>
            <strong>{t(`${TRANSLATE}.title`)}</strong>
            <div className="gameWallet__dialog__balance">
                {t(`${TRANSLATE}.balance.my`)} {` ${balanceCardCurrency || t(`${TRANSLATE}.balance.loteu`)} `}{" "}
                {t(`${TRANSLATE}.balance.wallet`)}
                <span>
                    <strong>{`${getLoteuString(walletAmount)} `}</strong>
                    {t(`${TRANSLATE}.balance.loteu`)}
                </span>
            </div>
            {allowAmount && inputLabel && <strong>{inputLabel}</strong>}
            {allowAmount && <Input value={loteuAmount} onChange={setLoteuAmount} />}
            <div className="gameWallet__dialog__actions">
                <Button
                    text={buttonText}
                    onClick={() => onConfirm(allowAmount ? loteuAmount : walletAmount)}
                    disabled={allowAmount ? !loteuAmount || loteuAmount <= 0 || loteuAmount > walletAmount : !walletAmount}
                />
                <Button text="Cancel" style={ButtonStyle.Borderless} onClick={onClose} />
            </div>
        </Dialog>
    );
};

export default GameWalletDialog;
