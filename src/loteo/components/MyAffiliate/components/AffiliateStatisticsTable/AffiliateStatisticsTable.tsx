import React, {Fragment} from "react";
import {useTranslation, Trans} from "react-i18next";

import {MyAffiliateStatistics} from "loteo/types";
import {getETHString, getLoteuString} from "common/utils";
import {Grid} from "ui/components";

import {UnlockButton} from "..";

import "./affiliateStatisticsTable.scss";

type Props = {
    locked?: boolean;
    data?: MyAffiliateStatistics | null;
    onUnlockClick();
};

const AffiliateStatisticsTable = ({locked = true, data, onUnlockClick}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.statisticsTable";

    const headers = [...Array(6)].map((_, idx) => t(`${TRANSLATE}.headers.${idx}.name`));
    return (
        <div className="affiliateStatisticsTable">
            <table>
                <thead>
                    <tr>
                        {headers.map((item, idx) => (
                            <th key={`AffiliateStatisticsTable-header-${idx}`}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{t(`${TRANSLATE}.body.0.tr.td`)}</td>
                        <td>{(data && data.totalUsers) || 0}</td>
                        <td>{(data && data.activeUsers) || 0}</td>
                        <td>{(data && data.thisWeekPlayUsers) || 0}</td>
                        <td>{(data && data.thisWeekUsedTickets) || 0}</td>
                        <td>{(data && data.totalTickets) || 0}</td>
                    </tr>
                    <tr>
                        <td>{t(`${TRANSLATE}.body.1.tr.td`)}</td>
                        {locked ? (
                            <td colSpan={headers.length - 1} className="affiliateStatisticsTable__notPremium">
                                <Grid align="center" justify="center">
                                    <UnlockButton onClick={onUnlockClick} />
                                    <div className="affiliateStatisticsTable__notPremium__text">
                                        <Trans i18nKey={`${TRANSLATE}.notPremium.text`} />
                                    </div>
                                </Grid>
                            </td>
                        ) : (
                            <Fragment>
                                <td colSpan={2}>
                                    <div className="center">
                                        {(data && data.spaceProgramSoldTickets) || 0}
                                        <span className="extraMarginRight">{t(`${TRANSLATE}.body.1.tr.span1`)}</span>
                                        {data &&
                                            data.spaceProgramLevels &&
                                            data.spaceProgramLevels.map((item, idx) => (
                                                <img
                                                    key={`spaceProgramSoldTickets-star-${idx}`}
                                                    src="images/star-small-active.svg"
                                                    className={
                                                        "star big" +
                                                        (item <= data.spaceProgramSoldTickets ? " active" : " inactive")
                                                    }
                                                    alt="*"
                                                />
                                            ))}
                                    </div>
                                </td>
                                <td colSpan={3} className="affiliateStatisticsTable__levels">
                                    <div>
                                        <img src="images/info-icon.svg" alt="?" />
                                        <span className="grey">{t(`${TRANSLATE}.body.1.tr.span2`)}</span>
                                    </div>
                                    <div className="affiliateStatisticsTable__levels__items">
                                        {data &&
                                            data.spaceProgramLevels &&
                                            data.spaceProgramLevels.map((item, idx) => (
                                                <div key={`spaceProgramLevels-${idx}`}>
                                                    {item}
                                                    <small>{t(`${TRANSLATE}.soldTickets`)}</small>
                                                    {[...Array(idx + 1)].map((_, idx2) => (
                                                        <img
                                                            key={`spaceProgramLevels-${idx}-star-${idx2}`}
                                                            src="images/star-small-active.svg"
                                                            className="star"
                                                            alt="*"
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                    </div>
                                </td>
                            </Fragment>
                        )}
                    </tr>
                    <tr>
                        <td>{t(`${TRANSLATE}.body.2.tr.td`)}</td>
                        <td colSpan={5}>
                            <div className="center">
                                {(data && data.downlinesUsers) || 0}
                                <span>{t(`${TRANSLATE}.body.2.tr.span`)}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>{t(`${TRANSLATE}.foot.title`)}</td>
                        <td colSpan={5}>
                            <div className="affiliateStatisticsTable__profit">
                                {t(`${TRANSLATE}.foot.nextPayout`)}
                                <div>
                                    {data && data.profit && data.profit.nextPayoutEth
                                        ? getETHString(data.profit.nextPayoutEth)
                                        : "0.0"}
                                </div>

                                {t(`${TRANSLATE}.foot.eth`)}
                                <div>
                                    {data && data.profit && data.profit.eth ? getETHString(data.profit.eth) : "0.0"}
                                </div>
                                {t(`${TRANSLATE}.foot.loteu`)}
                                <div>
                                    {data && data.profit && data.profit.loteu
                                        ? getLoteuString(data.profit.loteu)
                                        : "0.0"}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default AffiliateStatisticsTable;
