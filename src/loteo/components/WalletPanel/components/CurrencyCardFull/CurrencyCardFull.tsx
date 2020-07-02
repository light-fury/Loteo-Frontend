import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import SVG from "react-inlinesvg";

import {Button, ButtonStyle, Grid} from "ui/components";
import {getUser} from "auth/selectors";
import {useReduxStore} from "hooks";
import {LotesProfit, ConversionRates} from "loteo/types";
import {getLoteuString, getEURString} from "common/utils";

type Props = {
    loading: boolean;
    name: string;
    value: string;
    currency?: string;
    type?: string;
    otherValue?: string | React.ReactNode;
    profit?: LotesProfit | null;
    conversionRates?: ConversionRates | null;
    withdraw?: () => void;
    deposit?: () => void;
};

const CurrencyCardFull = ({loading, name, value, currency, otherValue, profit, conversionRates, withdraw, deposit, type}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "currencyCardFull";
    const GLOBALTRANSLATE = "global";
    const [user] = useReduxStore([getUser]);

    const getEUR = (eth: number, loteu: number): string => {
        if (conversionRates) {
            return getEURString(eth / conversionRates.eth + loteu / conversionRates.loteu);
        }
        return getEURString(0);
    };

    return (
        <div className="currencyCardFull">
            {loading && <div className="loading">{t(`${TRANSLATE}.loading`)}</div>}
            {!loading && (
                <Fragment>
                    <div className="nameValue">
                        <div className="name">{name}</div>
                        <div className="valueCurrency">
                            <div className="value">{value}</div>
                            {currency && <div className="currency">{currency}</div>}
                            {otherValue && <div className="otherValue">{otherValue}</div>}
                        </div>
                    </div>
                    {type == "lotes" && (
                        <div className="info">
                            <Grid justify="space-between" align="center">
                                <Grid justify="center" align="center" className="title">
                                    {t(`${TRANSLATE}.nextPayout`)}
                                    <SVG src="icons/info.svg" className="moreInfo__icon moreInfo--small" />
                                </Grid>
                                <Grid justify="center" align="center" noWidth>
                                    <span className="value">
                                        <strong>{profit ? getEURString(profit.nextPayoutEth) : 0} {t(`${GLOBALTRANSLATE}.eth`)}<br/>{profit ? getLoteuString(profit.nextPayoutLoteu) : 0} {t(`${GLOBALTRANSLATE}.loteu`)}</strong>
                                    </span>
                                    <span>
                                        {`( ${getEUR(profit ? profit.nextPayoutEth : 0, profit ? profit.nextPayoutLoteu : 0)}${t(`${GLOBALTRANSLATE}.euro`)} )`}
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid justify="space-between" align="center">
                                <Grid justify="center" align="center" className="title">
                                    {t(`${TRANSLATE}.totalPayout`)}
                                </Grid>
                                <Grid justify="center" align="center" noWidth>
                                    <span className="value">
                                        <strong>{profit ? getEURString(profit.eth) : 0} {t(`${GLOBALTRANSLATE}.eth`)}<br/>{profit ? getLoteuString(profit.loteu) : 0} {t(`${GLOBALTRANSLATE}.loteu`)}</strong>
                                    </span>
                                    <span>
                                        {`( ${getEUR(profit ? profit.eth : 0, profit ? profit.loteu : 0)}${t(`${GLOBALTRANSLATE}.euro`)} )`}
                                    </span>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                    {type !== "lotes" && (
                        <div className="actions">
                            {withdraw && user && user.username !== "ayaanrah26" && (
                                <Button
                                    text={t(`${TRANSLATE}.withdraw`)}
                                    style={ButtonStyle.Borderless}
                                    onClick={withdraw}
                                />
                            )}
                            {deposit && (
                                <Button text={t(`${TRANSLATE}.deposit`)} style={ButtonStyle.Default} onClick={deposit} />
                            )}
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default CurrencyCardFull;
