import React, {useContext} from "react";
import {Trans} from "react-i18next";
import {useTranslation} from "react-i18next";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {DepositDialog} from "common/components";
import {MixButton} from "ui/components";
import {User} from "auth/types";
import {getUser} from "auth/selectors";
import {getWallet} from "loteo/selectors";
import {getETHString} from "common/utils";
import {useReduxStore, useBooleanState} from "hooks";
import {Wallet} from "loteo/types";

import "./depositBonus.scss";

type Props = {
    children?: React.ReactNode;
    promotion?: boolean;
};

const DepositBonus = ({children, promotion = false}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "walletPanel";
    const contentTransalate = "backgroundBanners";

    const {loggedIn} = useContext(AuthContext);
    const [ethDepositDialogVisible, showETHDepositDialog, hideETHDepositDialog] = useBooleanState();
    const [wallet]: [Wallet | null, User | null] = useReduxStore([getWallet, getUser]);

    const handlePlay = () => {
        if (loggedIn) {
            showETHDepositDialog();
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className={`depositBonus banner ${promotion ? "promotion" : ""}`}>
            {!promotion && (
                <>
                    <div className="depositBonus__content loteo-banner">
                        <div className="title"><h1>First DEPOSIT<br/>bonus</h1></div>
                        <div className="detail">
                            {"Deposit 1ETH\n & get BONUS 3000 LOTEU!"}
                        </div>
                    </div>
                    <div className="depositBonus__bottom loteo-banner">
                        <div className="action">
                            <MixButton text="DEPOSIT" style="gold" onClick={handlePlay}/>
                        </div>
                        {children}
                    </div>
                </>
            )}
            {promotion && (
                <>
                    <div className="depositBonus__content">
                        <div className="title"><h1 className="promotion">First DEPOSIT<br/>bonus</h1></div>
                        <div className="detail promotion">
                            <Trans i18nKey={`${contentTransalate}.depositBonus.promotionDetail`} />
                        </div>
                    </div>
                    <div className="depositBonus__promotionAction" onClick={handlePlay}>
                        <MixButton text="DEPOSIT" style="gold" onClick={handlePlay}/>
                    </div>
                </>
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
        </div>
    );
};

export default DepositBonus;
