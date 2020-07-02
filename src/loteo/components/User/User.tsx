import React from "react";

import {Grid} from "ui/components";
import {getLimittedDecimal, getNumberFormattedString} from "common/utils";

import "./user.scss";

type Props = {
    name: string | null;
    breadCrumb?: string | null;
    level: number[] | null;
    winPrice?: object | null;
    tickets?: number | null;
};

const User = ({name, level = null, breadCrumb, winPrice = null, tickets}: Props) => (
    <div className="user">
        <div className="user__info">
            <div className="pictureContainer">
                <img
                    src={breadCrumb || "http://www.gravatar.com/avatar/?d=mp"}
                    alt="avatar"
                    className="picture"
                />
            </div>
            <div className="nameActions">
                <div className="name">
                    {name}
                    <Grid align="center">
                        {level && level.map((item, idx) => (
                            <img
                                key={`headerAffiliateLevel-star-${idx}`}
                                src="images/star-small-active.svg"
                                className={
                                    "star" + (tickets && item <= tickets ? " active" : " inactive")
                                }
                                alt="*"
                            />
                        ))}
                        {!level && [1,2,3].map((item, idx) => (
                            <img
                                key={`headerAffiliateLevel-star-${idx}`}
                                src="images/star-small-active.svg"
                                className="star inactive"
                                alt="*"
                            />
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
        {winPrice !== null && (
            <div className="user__winPrice">
                <div>WINNER</div>
                <div className="price">{getNumberFormattedString(getLimittedDecimal(winPrice["price"], 2))} {winPrice["unit"]}</div>
            </div>
        )}
    </div>
);

export default User;
