import React from "react";
import {useTranslation} from "react-i18next";

import {User} from "auth/types";
import {MOFStat} from "loteo/types";
import {Table} from "ui/components";

type Props = {
    stats: MOFStat[];
    user: User | null;
};

const Leaderboard = ({stats = [], user = null}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "board";

    const headers = [
        {
            id: "id",
            header: t(`${TRANSLATE}.position`),
            width: "10%"
        },
        {
            id: "userName",
            header: t(`${TRANSLATE}.player`)
        },
        {
            id: "totalBets",
            header: t(`${TRANSLATE}.usedLoteu`),
            width: "15%"
        }
    ];

    const normalizeData = (stats: MOFStat[], user: User | null): MOFStat[] => {
        if (user) {
            stats.forEach(stat => {
                if (stat.userName === user.username) {
                    stat["_active"] = true;
                }
            });
        }
        return stats;
    };

    const getMyStat = (stats: MOFStat[], user: User | null): object[] => {
        if (user) {
            const myStat: object = {...stats.find(stat => stat.userName === user.username)};
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

    return (
        <div className="mof__inner__board">
            <Table headers={headers} data={getMyStat(stats, user)} hideFooter />
            <br />
            <Table headers={headers} data={normalizeData(stats, user)} hideHeader />
        </div>
    );
};

export default Leaderboard;
