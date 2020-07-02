import React from "react";
import Slider from "rc-slider";

import {Grid} from "ui/components";
import {getNumberFormattedString} from "common/utils";

import "./progressBar.scss";

type Props = {
    usedColor: string;
    min: number;
    max: number;
    initial: number;
    target: string;
    percent: number;
    leftValue: string;
    rightValue: string;
};

const styles = {
    red: {
        trackStyle: {
            backgroundColor: "#DA2814",
            boxShadow: "0 0 8px 0 #DA2814",
            borderRadius: "3.5px",
            height: 4
        },
        handleStyle: {
            height: "16px",
            width: "16px",
            borderRadius: "50%",
            borderColor: "#DA2814",
            backgroundColor: "#DA2814",
            boxShadow: "0 0 5px 0 #DA2814"
        }
    },
    yellow: {
        trackStyle: {
            background: "linear-gradient(180deg, #FE9A0F 0%, #FECF0F 54.38%, #FFEA00 100%)",
            boxShadow: "0 0 16px 0 #FECF0F",
            borderRadius: "3.5px",
            height: 4
        },
        handleStyle: {
            height: "16px",
            width: "16px",
            borderRadius: "50%",
            borderColor: "#FECF0F",
            background: "linear-gradient(180deg, #FE9A0F 0%, #FECF0F 54.38%, #FFEA00 100%)",
            boxShadow: "0 0 5px 0 #FECF0F"
        }
    }
};

const ProgressBar = ({usedColor = "red", min, max, initial, target, percent, leftValue, rightValue}: Props) => {
    const marks = {
        [initial]: {
            style: {
                color: "#300300",
                width: "60px",
                fontSize: "14px"
            },
            label: <strong>{getNumberFormattedString(initial)} €</strong>
        }
    };

    return (
        <div className="progressBar">
            <Grid className="progressBar__info" justify="space-between" noWidth noPadding>
                <div className="progressBar__info__target">{target}</div>
                <div className="progressBar__info__percent">+ {percent} %</div>
            </Grid>
            <Slider
                min={min}
                max={max}
                marks={marks}
                defaultValue={initial}
                value={initial}
                step={1}
                railStyle={{
                    borderRadius: "3.5px",
                    backgroundColor: "#D8D8D8"
                }}
                trackStyle={styles[usedColor]["trackStyle"]}
                handleStyle={styles[usedColor]["handleStyle"]}
            />
            <Grid className="progressBar__values" justify="space-between" noWidth noPadding>
                <div className="item">{leftValue}</div>
                <div className="item">{rightValue}</div>
            </Grid>
        </div>
    );
};

export default ProgressBar;
