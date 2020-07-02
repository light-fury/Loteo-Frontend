import React from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";
import {getETHString} from "common/utils";

import "./spaceProgramStatisticsTable.scss";

type SpaceProgramLevel = {
    level: number;
    ticketCount: number;
    usersCount: number;
    eth: number;
    ethPerUser: number;
};

type SpaceProgramStatistics = {
    levelData: SpaceProgramLevel[];
    paidOutLastMonth: number;
    paidOutTotal: number;
};

type Props = {
    locked?: boolean;
    data?: SpaceProgramStatistics | null;
};

const SpaceProgramStatisticsTable = ({locked = true, data}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.spaceProgramStatisticsTable";

    const tableRows = ["usersCount", "eth", "ethPerUser"];

    return (
        <div className={`spaceProgramStatisticsTable ${locked ? "locked" : ""}`}>
            <table>
                {data && (
                    <>
                        <thead>
                            <tr>
                                <th>{t(`${TRANSLATE}.header`)}</th>
                                {data.levelData.map((item, idx) => (
                                    <th key={`spaceProgramStatisticsTable-headerItem-${idx}`}>
                                        <Grid
                                            align="baseline"
                                            justify="center"
                                            className="spaceProgramStatisticsTable__headerItem"
                                        >
                                            <span>{item.level}</span> %
                                            <div className="spaceProgramStatisticsTable__headerItem__stars">
                                                {[...Array(3)].map((_, idx2) => (
                                                    <img
                                                        key={`spaceProgramStatisticsTable-headerItem-${idx}-${idx2}`}
                                                        src="images/star-small-active.svg"
                                                        className={`star ${idx2 <= idx ? "active" : " inactive"}`}
                                                        alt="*"
                                                    />
                                                ))}
                                            </div>
                                        </Grid>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.levelData &&
                                tableRows.map((item, idx) => (
                                    <tr key={`spaceProgramStatisticsTable-row-${idx}`}>
                                        <td>{t(`${TRANSLATE}.body.${idx}.tr.td`)}</td>
                                        {data.levelData.map((col, idx2) => (
                                            <td key={`spaceProgramStatisticsTable-row-${idx}-${idx2}`}>
                                                {item !== "usersCount" ? getETHString(col[item] || 0) : col[item] || 0}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>
                                    <Grid className="spaceProgramStatisticsTable__profit">
                                        <Grid
                                            align="center"
                                            justify="space-between"
                                            className="spaceProgramStatisticsTable__profit__item"
                                        >
                                            <span>{t(`${TRANSLATE}.foot.lastMonth`)}</span>
                                            <Grid
                                                align="center"
                                                className="spaceProgramStatisticsTable__profit__item__value"
                                            >
                                                {t(`${TRANSLATE}.foot.eth`)}
                                                <strong>
                                                    {(data.paidOutLastMonth && getETHString(data.paidOutLastMonth)) ||
                                                        "0.0"}
                                                </strong>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            align="center"
                                            justify="space-between"
                                            className="spaceProgramStatisticsTable__profit__item"
                                        >
                                            <span>{t(`${TRANSLATE}.foot.totally`)}</span>
                                            <Grid
                                                align="center"
                                                className="spaceProgramStatisticsTable__profit__item__value"
                                            >
                                                {t(`${TRANSLATE}.foot.eth`)}
                                                <strong>
                                                    {(data.paidOutTotal && getETHString(data.paidOutTotal)) || "0.0"}
                                                </strong>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </td>
                            </tr>
                        </tfoot>
                    </>
                )}
            </table>
        </div>
    );
};

export default SpaceProgramStatisticsTable;
