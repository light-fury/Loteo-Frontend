import React from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";

import "./ticketCard.scss";

type Props = {
    picture: string;
    title: string;
    text: string | React.ReactNode;
    value: number;
    onChange(newCount: number);
    amountLeft?: number;
    maxAmount?: number;
};

const TicketCard = ({picture, title, text, value, onChange, amountLeft, maxAmount}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "ticketCard";

    return (
        <div className="ticketCard">
            <div className="imagePanel">
                <img src={picture} alt={t(`${TRANSLATE}.alts.0.alt`)} />
            </div>
            <div className="detailsPanel">
                <div className="titleText">
                    <Grid wrap align="center" justify="space-between" className="title">
                        <span>{title}</span>
                        {amountLeft && maxAmount && (
                            <div className="counter">{`${amountLeft}/${maxAmount} ${t("countInfo.valueLeft")}`}</div>
                        )}
                    </Grid>
                    <div className="text">{text}</div>
                </div>
                <div className="bottomPanel">
                    <div className="buyPanel">
                        <div className="label">{t(`${TRANSLATE}.label`)}</div>
                        <div className="countControls">
                            <img
                                src="icons/minus.svg"
                                alt={t(`${TRANSLATE}.alts.1.alt`)}
                                onClick={() => onChange(Math.max(value - 1, 0))}
                            />
                            <div className="count">{value.toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
                            <img
                                src="icons/plus.svg"
                                alt={t(`${TRANSLATE}.alts.2.alt`)}
                                onClick={() => onChange(value + 1)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TicketCard;
