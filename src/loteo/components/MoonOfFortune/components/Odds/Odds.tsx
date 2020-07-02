import React from "react";

import {Grid} from "ui/components";

import "./odds.scss";

type Props = {
    availableSegments: object;
    result?: string;
    showWin: boolean;
};

const Odds = ({availableSegments, result, showWin = false}: Props) => {
    return (
        <Grid wrap align="center" justify="center" className="mofOdds">
            {Object.entries(availableSegments)
                .sort()
                .map(item => (
                    <div
                        key={`mof-odds-${item[0]}`}
                        className={`mofOdds__item
                        ${showWin && result === item[0] ? "active" : ""}`}
                        style={{color: item[1]}}
                    >
                        <span>{item[0]} x</span>
                    </div>
                ))}
        </Grid>
    );
};

export default Odds;
