import React from "react";
import {useTranslation} from "react-i18next";

import {getNumberFormattedString, getLoteuString} from "common/utils";
import {User as WinUser} from "loteo/components";
import {LeaderboardItemWeeklyStats} from "loteo/types";

type Props = {
    stat: LeaderboardItemWeeklyStats;
};

const LeaderboardItem = ({stat}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "dashboard.leaderboard";

    return (
        <div className="winner">
            <div className="winner__header-desktop">
                <div className="winner__header-desktop--game">{t(`${TRANSLATE}.${stat.type}.title`)}</div>
                <div className="winner__header-desktop--users">{getNumberFormattedString(stat.users)}</div>
                <div className="winner__header-desktop--loteu">
                    {getLoteuString(stat.totalAmount)} <span>{t(`${TRANSLATE}.${stat.type}.currency`)}</span>
                </div>
            </div>
            <div className="winner__header-mobile">
                <div className="winner__header-mobile--game">{t(`${TRANSLATE}.${stat.type}.title`)}</div>
                <div className="winner__header-mobile--users">
                    <div className="users-week">{t(`${TRANSLATE}.${stat.type}.users`)}</div>
                    <div className="value">{getNumberFormattedString(stat.users)}</div>
                </div>
                <div className="winner__header-mobile--loteu">
                    <div className="amount">{t(`${TRANSLATE}.totalAmount`)}</div>
                    <div className="value">
                        {getLoteuString(stat.totalAmount)} <span>{t(`${TRANSLATE}.${stat.type}.currency`)}</span>
                    </div>
                </div>
            </div>
            <div className="winner__info-desktop">
                <div className="winner__info-desktop--game">
                    <div className="medal">
                        <i className="fa fa-medal" />
                    </div>
                    <div className="game">{t(`${TRANSLATE}.winnerOfTheWeek`)}</div>
                </div>
                <div className="winner__info-desktop--user">
                    {stat.winner && (
                        <WinUser
                            name={stat.winner.username}
                            breadCrumb={stat.winner.avatar}
                            level={stat.winner.spaceProgramLevels}
                            tickets={stat.winner.spaceProgramSoldTickets}
                        />
                    )}
                </div>
                <div className="winner__info-desktop--loteu">
                    <span className="win-tag">
                        {t(`${TRANSLATE}.${stat.type}.winText`)}{" "}
                        <span>
                            {getLoteuString(stat.prize)} {t(`${TRANSLATE}.${stat.type}.currency`)}
                        </span>
                    </span>
                </div>
            </div>
            <div className="winner__info-mobile">
                <div className="winner__info-mobile--game">
                    <div className="medal">
                        <i className="fa fa-medal" />
                    </div>
                    <div className="gameInfo">
                        <div className="gameInfo--name">{t(`${TRANSLATE}.${stat.type}.title`)}</div>
                        <div className="gameInfo--value">
                            <span className="win-tag">
                                {t(`${TRANSLATE}.${stat.type}.winText`)}{" "}
                                <span>
                                    {getLoteuString(stat.prize)} {t(`${TRANSLATE}.${stat.type}.currency`)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="winner__info-mobile--user">
                    {stat.winner && (
                        <WinUser
                            name={stat.winner.username}
                            breadCrumb={stat.winner.avatar}
                            level={stat.winner.spaceProgramLevels}
                            tickets={stat.winner.spaceProgramSoldTickets}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeaderboardItem;
