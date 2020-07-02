import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";

import {withAuthorization} from "auth/hoc";
import {getLeaderboardStats} from "loteo/api";
import {loadUser} from "auth/actions";
import {getUser} from "auth/selectors";
import {useReduxLoad} from "hooks";
import {LeaderboardStats} from "loteo/types";
import {User} from "auth/types";
import {Background, Header, Footer} from "loteo/components";
import {Button, ButtonStyle, Grid} from "ui/components";

import {LeaderboardTable} from "./components";

import "./leaderboard.scss";

enum TimeFilter {
    Weekly = "weekly",
    Monthly = "monthly",
    AllTime = "allTime"
}

const Leaderboard = () => {
    const {t} = useTranslation();
    const TRANSLATE = "board";

    const [user]: [User | null] = useReduxLoad([loadUser()], [getUser]);
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.AllTime);
    const [leaderboardStats, setLeaderboardStats] = useState<LeaderboardStats[]>([]);

    useEffect(() => {
        getLeaderboardStats(timeFilter.toString()).then(stats => setLeaderboardStats(stats));
    }, [timeFilter]);

    return (
        <div className="leaderboard-page">
            <Background hideBackgroundEnd>
                <Header />
                <Grid justify="space-between" className="leaderboard-page__header" noWidth>
                    <h3>{t(`${TRANSLATE}.leaderboard`)}</h3>
                    <Grid noWidth>
                        {[TimeFilter.Weekly, TimeFilter.Monthly, TimeFilter.AllTime].map(filter => (
                            <Button
                                key={`time-filter-${filter}`}
                                text={t(`${TRANSLATE}.${filter}`)}
                                style={ButtonStyle.None}
                                className={`leaderboard-page__header__button ${timeFilter === filter ? "active" : ""}`}
                                onClick={() => setTimeFilter(filter)}
                            />
                        ))}
                    </Grid>
                </Grid>
                <div className="leaderboard-page__inner">
                    <LeaderboardTable stats={leaderboardStats} user={user} />
                </div>
            </Background>
            <Footer />
        </div>
    );
};

export default withAuthorization(Leaderboard);
