import React from "react";
import classNames from "classnames";
import {Grid} from "ui/components";
import {getNumberFormattedString} from "common/utils";

import "./userCard.scss";

type Props = {
    type: string;
    users?: number | null;
    reverse?: boolean;
    thumb?: string | null;
    percent?: number;
    bigPercent?: boolean;
};

const UserCard = ({type, users = null, bigPercent = false, reverse = false, thumb, percent}: Props) => (
    <Grid className="userCard" direction="column" noPadding noWidth>
        <Grid className={classNames({reverse} )} direction="column" justify="center" noPadding noWidth>
            {thumb && (
                <div className="userCard__thumb">
                    <img src={`/images/statistics/socialNetworks/${thumb}`} alt="user-card"/>
                </div>
            )}
            <div className="userCard__type">{type}</div>
            <div className="userCard__users">{getNumberFormattedString(users ? users : 0)} {bigPercent ? "%" : ""}</div>

        </Grid>
        <Grid className="userCard__percent" justify="center">
            {percent && (<div className="userCard__percent">+ {getNumberFormattedString(percent)} %</div>)}
        </Grid>
    </Grid>
);

export default UserCard;
