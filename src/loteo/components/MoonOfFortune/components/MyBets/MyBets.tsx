import React from "react";
import {useTranslation} from "react-i18next";

import {Spin} from "loteo/types";
import {Table} from "ui/components";

type Props = {
    bets: Spin[];
};

const MyBets = ({bets = []}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "board";

    const headers = [
        {
            id: "bet",
            header: (
                <span>
                    {t(`${TRANSLATE}.bet`)}
                    <br />
                    <span className="subHeader">{t(`${TRANSLATE}.loteu`)}</span>
                </span>
            ),
            width: "9.5%"
        },
        {
            id: "time",
            header: t(`${TRANSLATE}.time`),
            width: "22.5%"
        },
        {
            id: "level",
            header: "LEVEL",
            width: "23%"
        },
        {
            id: "payout",
            header: t(`${TRANSLATE}.payout`),
            width: "30%"
        },
        {
            id: "profit",
            header: (
                <span>
                    {t(`${TRANSLATE}.profit`)}
                    <br />
                    <span className="subHeader">{t(`${TRANSLATE}.loteu`)}</span>
                </span>
            ),
            width: "15%"
        }
    ];

    const dateToString = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        let hour = date.getHours();
        const minutes = date.getMinutes();
        const amOrPm = hour >= 12 ? "PM" : "AM";

        if (hour > 12) {
            hour -= 12;
        } else if (hour === 0) {
            hour = 12;
        }

        return `${day}/${month}/${year} ${hour}:${minutes} ${amOrPm}`;
    };

    const normalizeData = (spins: Spin[]): object[] => {
        var data: object[] = [];
        for (let spin of spins) {
            const created: Date = new Date(spin.created);
            data.push({
                bet: spin.betAmount,
                time: dateToString(created),
                level: spin.level,
                payout: spin.multiplier.toFixed(1) + " x",
                profit: spin.betAmount * spin.multiplier
            });
        }
        return data;
    };

    return (
        <div className="mof__inner__board">
            <Table headers={headers} data={normalizeData(bets)} rowsPerPage={10} />
        </div>
    );
};

export default MyBets;
