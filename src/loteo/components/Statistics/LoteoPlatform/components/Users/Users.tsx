import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getName} from "country-list";

import {useReduxStore} from "hooks";
import {loadStatisticsUsers} from "loteo/actions";
import {Button, ButtonStyle, Grid} from "ui/components";
import {
    Trend,
    UserCard,
    StatisticsSubHeader as SubHeader
} from "loteo/components";
import {StatisticsUsers, StatisticsFilter} from "loteo/types";
import {getStatisticsUsers} from "loteo/selectors";

import "./users.scss";

type Props = {
    className?: string;
    loadStatisticsUsers(string);
};

const Users = ({loadStatisticsUsers}: Props) => {
    const [page, setPage] = useState<number>(1);
    const rowsPerPage = 10;
    const [currentFilter, setCurrentFilter] = useState(0);
    const [userData]: [StatisticsUsers | null] = useReduxStore([getStatisticsUsers]);
    const handleChangeFilter = (category) => {
        loadStatisticsUsers(category);
        StatisticsFilter.forEach((item) =>
            category === item.name ? setCurrentFilter(item.key) : currentFilter
        );
    };

    useEffect(() => {
        loadStatisticsUsers("daily");
    }, []);

    return (
        <div className="users">
            <SubHeader title="Users" active={currentFilter} onChange={handleChangeFilter} filter/>
            <Trend className="trend">
                <UserCard type="Registered users" users={userData ? userData.registeredUsers : 0} reverse />
                <UserCard type="Active Users" users={userData && userData.activeUsers ? userData.activeUsers : 0} reverse />
                <UserCard type="Affiliate Loteo" users={userData ? userData.affiliateLoteo : 0} reverse />
                <UserCard type="Affiliate Partners" users={userData ? userData.affiliatePartners : 0} reverse />
                <UserCard type="Bounce Rate" users={userData ? userData.bounces : 0} bigPercent reverse />
            </Trend>
            <div className="users__trend">
                <Grid className="users__trend__section" justify="space-between" noPadding noWidth>
                    <Grid noWidth className="users__trend__section__status col-lg-8 col-md-12" direction="column">
                        <Grid className="users__trend__section__status__header" noPadding noWidth>
                            <Grid className="col-xs-4">Country</Grid>
                            <Grid className="col-xs-4">Registred Users</Grid>
                            <Grid className="col-xs-4">Active Users</Grid>
                        </Grid>
                        <Grid direction="column" noPadding noWidth>
                            {(userData && userData.regionInfo) && userData.regionInfo.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item, idx) => (
                                <Grid className="users__trend__section__status__table" noPadding noWidth key={`owner-${idx}`}>
                                    <Grid className="col-xs-4">
                                        <div className={`flags ${item.country ? item.country.toLowerCase() : ""}`}></div>
                                        <div>{item["countryName"]}</div>
                                    </Grid>
                                    <Grid className="col-xs-4">{getName(item["country"])}</Grid>
                                    <Grid className="col-xs-4">{item["registeredUsers"]}</Grid>
                                </Grid>
                            ))}
                        </Grid>
                        {userData && userData.regionInfo && (
                            <div className="pagination">
                                <Button
                                    className="pagination__arrowButton left"
                                    style={ButtonStyle.TransparentWhite}
                                    text=""
                                    iconURL="icons/chevron-right.svg"
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                />
                                <span>
                                    {page}/{Math.ceil(userData.regionInfo.length / rowsPerPage)}
                                </span>
                                <Button
                                    className="pagination__arrowButton"
                                    style={ButtonStyle.TransparentWhite}
                                    text=""
                                    iconURL="icons/chevron-right.svg"
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === Math.ceil(userData.regionInfo.length / rowsPerPage)}
                                />
                            </div>
                        )}
                    </Grid>
                    <Grid noWidth className="users__trend__section__status col-lg-4 col-md-12" direction="column">
                        <Grid className="users__trend__section__status__header" noPadding noWidth>
                            <Grid className="col-xs-12">Uers distribution in Countries</Grid>
                        </Grid>
                        <Grid direction="column" noPadding noWidth>
                            {(userData && userData.regionInfo) && userData.regionInfo.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item, idx) => (
                                <Grid className="users__trend__section__status__table" noPadding noWidth key={`owner-${idx}`}>
                                    <Grid className="col-xs-6">
                                        <div className={`flags ${item.country ? item.country.toLowerCase() : ""}`}></div>
                                        <div>{getName(item["country"])}</div>
                                    </Grid>
                                    <Grid className="col-xs-6">{userData.registeredUsers && item.registeredUsers ? ((item["registeredUsers"] / userData.registeredUsers) * 100).toFixed(2) : 0} %</Grid>
                                </Grid>
                            ))}
                        </Grid>
                        {userData && userData.regionInfo && (
                            <div className="pagination">
                                <Button
                                    className="pagination__arrowButton left"
                                    style={ButtonStyle.TransparentWhite}
                                    text=""
                                    iconURL="icons/chevron-right.svg"
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                />
                                <span>
                                    {page}/{Math.ceil(userData.regionInfo.length / rowsPerPage)}
                                </span>
                                <Button
                                    className="pagination__arrowButton"
                                    style={ButtonStyle.TransparentWhite}
                                    text=""
                                    iconURL="icons/chevron-right.svg"
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === Math.ceil(userData.regionInfo.length / rowsPerPage)}
                                />
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadStatisticsUsers
        },
        dispatch
    );


export default connect(
    null,
    mapDispatchToProps
)(Users);
