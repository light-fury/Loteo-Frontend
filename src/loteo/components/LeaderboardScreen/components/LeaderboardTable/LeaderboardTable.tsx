import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";

import {User} from "auth/types";
import {LeaderboardStats} from "loteo/types";
import {Table} from "ui/components";

type Props = {
    stats?: LeaderboardStats[];
    user: User | null;
};

const LeaderboardTable = ({stats = [], user = null}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "leaderboard";

    const [sortedStats, setSortedStats] = useState<LeaderboardStats[] | null>(null);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "dec">("dec");

    useEffect(() => {
        if (sortKey) {
            if (sortOrder === "asc") {
                setSortedStats([...stats.sort((a, b) => a[sortKey] - b[sortKey])]);
            } else {
                setSortedStats([...stats.sort((a, b) => b[sortKey] - a[sortKey])]);
            }
        }
    }, [stats]);

    const headers = [
        {
            id: "userName",
            header: t(`${TRANSLATE}.player`)
        },
        {
            id: "weeklyLotteryUsedTickets",
            header: t(`${TRANSLATE}.weeklyLottery.title`),
            subHeader: t(`${TRANSLATE}.usedTickets`),
            sortable: true,
            width: "15%"
        },
        {
            id: "weeklyLotteryUsedLoteu",
            header: t(`${TRANSLATE}.weeklyLottery.title`),
            subHeader: t(`${TRANSLATE}.usedLoteu`),
            sortable: true,
            width: "15%"
        },
        {
            id: "apollo11Lottery",
            header: t(`${TRANSLATE}.apollo11Lottery.title`),
            subHeader: t(`${TRANSLATE}.usedLoteu`),
            sortable: true,
            width: "15%"
        },
        // {
        //     id: "loteoRooms",
        //     header: t(`${TRANSLATE}.loteoRooms`),
        //     subHeader: t(`${TRANSLATE}.spentEth`),
        //     sortable: true,
        //     width: "15%"
        // },
        {
            id: "moonOfFortune",
            header: t(`${TRANSLATE}.mof`),
            subHeader: t(`${TRANSLATE}.loteuVolumne`),
            sortable: true,
            width: "15%"
        },
        {
            id: "affiliate",
            header: t(`${TRANSLATE}.affiliate`),
            subHeader: t(`${TRANSLATE}.users`),
            sortable: true,
            width: "15%"
        }
    ];

    const normalizeData = (leaderboardStats: LeaderboardStats[], user: User | null): LeaderboardStats[] => {
        if (user) {
            leaderboardStats.forEach(stat => {
                if (stat.userName === user.username) {
                    stat["_active"] = true;
                }
            });
        }
        return leaderboardStats;
    };

    const getMyStat = (leaderboardStats: LeaderboardStats[], user: User | null): object[] => {
        if (user) {
            let myStat: object = {...leaderboardStats.find(stat => stat.userName === user.username)};
            if (myStat["userName"] === undefined) {
                myStat = {
                    weeklyLotteryUsedTickets: 0,
                    weeklyLotteryUsedLoteu: 0,
                    apollo11Lottery: 0,
                    // loteoRooms: 0,
                    moonOfFortune: 0,
                    affiliate: 0
                };
            }
            if (myStat) {
                myStat["userName"] = (
                    <div>
                        <img src={user.avatar} alt="avatar" />
                        <span>{user.username}</span>
                    </div>
                );
                myStat["_className"] = "selected";
                return [myStat];
            }
        }
        return [];
    };

    const onSort = (id: string, order: "asc" | "dec") => {
        setSortKey(id);
        setSortOrder(order);
        if (order === "asc") {
            setSortedStats([...stats.sort((a, b) => a[id] - b[id])]);
        } else {
            setSortedStats([...stats.sort((a, b) => b[id] - a[id])]);
        }
    };

    return (
        <div>
            <Table headers={headers} data={getMyStat(sortedStats || stats, user)} hideFooter onSort={onSort} />
            <br />
            <Table headers={headers} data={normalizeData(sortedStats || stats, user)} hideHeader />
        </div>
    );
};

export default LeaderboardTable;
