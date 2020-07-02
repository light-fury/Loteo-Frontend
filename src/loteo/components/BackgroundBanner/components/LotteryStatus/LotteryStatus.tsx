import React, {Fragment} from "react";

import {LotteryStatusInfo} from "loteo/types";
import {Grid} from "ui/components";

import "./lotteryStatus.scss";

type Props = {
    info: LotteryStatusInfo[];
};

const LotteryStatus = ({info}: Props) => (
    <div className="lotteryStatus">
        <div className="lotteryStatus__category">
            <div className="separator_hr separator_mobile" />
            <div className="lotteryStatus__category--items">
                <Grid direction="row" align="center" justify="space-between">
                    {info && info.map((item, index) => (
                        <Fragment key={`lottery-status-lvr-${index}`}>
                            {index === 1 && (<div className="separator_vr" />)}
                            <div className="item" key={`lottery-status-${index}`}>
                                <div className="item--title">{item.title}</div>
                                <div className="item--status">{item.subTitle}</div>
                                <div className={`item--value ${item.isSmall ? "small" : ""}`}>{item.value}</div>
                            </div>
                            {index === 1 && (<div className="separator_vr" />)}
                        </Fragment>
                    ))}
                </Grid>
            </div>
            <div className="separator_hr" />
        </div>
    </div>
);

export default LotteryStatus;
