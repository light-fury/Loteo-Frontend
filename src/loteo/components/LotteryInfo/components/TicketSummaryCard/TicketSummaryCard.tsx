import React from "react";
import {useTranslation} from "react-i18next";

import {Grid, Button} from "ui/components";

import "./ticketSummaryCard.scss";

type Props = {
    className?: string;
    image: string;
    icon?: string;
    title?: string | React.ReactNode;
    text?: string | React.ReactNode;
    align?: string;
    onClick?();
    onInfoClick?();
};

const TicketSummaryCard = ({className = "", image, icon, title, text, align = "left", onClick, onInfoClick}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "global";

    return (
        <Grid
            direction="column"
            className={`ticketSummaryCard ${className} alignItems-${align}`}
            style={{background: `url(${image}) center / cover no-repeat`}}
        >
            {icon && <img src={icon} alt="icon" className="ticketSummaryCard__icon" />}
            {title && (
                <Grid align="center" className="ticketSummaryCard__title">
                    {title}
                    {onInfoClick && (
                        <img src="icons/info.svg" onClick={onInfoClick} alt={t("ticketSummaryCard.alts.1.alt")} />
                    )}
                </Grid>
            )}
            {text && <div className="ticketSummaryCard__text">{text}</div>}
            {onClick ? (
                <Button text="" onClick={onClick} />
            ) : (
                <div className="ticketSummaryCard__comingSoon">{t(`${TRANSLATE}.comingSoon`)}</div>
            )}
        </Grid>
    );
};
export default TicketSummaryCard;
