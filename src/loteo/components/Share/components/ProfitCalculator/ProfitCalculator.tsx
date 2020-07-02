import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {getEURString} from "common/utils";
import {Slider, Grid} from "ui/components";

import "./profitCalculator.scss";

const ProfitCalculator = () => {
    const {t} = useTranslation();
    const TRANSLATE = "share.affiliatePrograms.profitCalculator";

    const [invitees, setInvitees] = useState(1);
    const [tickets, setTickets] = useState(1);

    const isNumberVisible = number => number === 1 || number % 5 === 0;
    const decreaseTickets = () => setTickets(Math.max(1, tickets - 1));
    const increaseTickets = () => setTickets(tickets + 1);
    const calculateEarnings = () => {
        return invitees * 0.4 * tickets;
    };
    const decreaseInvitees = () => setInvitees(Math.max(1, invitees - 1));
    const increaseInvitees = () => setInvitees(Math.min(25, invitees + 1));

    return (
        <Grid wrap className="profitCalculator">
            <Grid justify="center" className="col-xs-12 profitCalculator__title">
                {t(`${TRANSLATE}.title`)}
            </Grid>
            <Grid className="col-xs-12">
                <Grid direction="column" className="profitCalculator__card">
                    <Grid wrap align="center" className="profitCalculator__card__inner">
                        <Grid align="center" className="col-xs-12 col-md-6 profitCalculator__card__inner__column">
                            <img className="icon" src="images/high-five.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} />
                            <div className="profitCalculator__card__inner__column__text">{t(`${TRANSLATE}.text1`)}</div>
                        </Grid>
                        <Grid
                            align="center"
                            className="col-xs-12 hidden-md hidden-lg hidden-xl profitCalculator__card__inner__column"
                        >
                            <button onClick={decreaseInvitees}>
                                <img src="icons/minus.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                            </button>
                            <div className="profitCalculator__card__inner__column__value">
                                {invitees} {invitees > 1 ? t(`${TRANSLATE}.friends`) : t(`${TRANSLATE}.friend`)}
                            </div>
                            <button onClick={increaseInvitees}>
                                <img src="icons/plus.svg" alt={t(`${TRANSLATE}.alts.2.alt`)} />
                            </button>
                        </Grid>
                        <Grid className="col-xs-6 hidden-xs hidden-sm profitCalculator__card__inner__column">
                            <Slider
                                min={1}
                                max={25}
                                isNumberVisible={isNumberVisible}
                                value={invitees}
                                onChange={setInvitees}
                            />
                        </Grid>
                        <Grid align="center" className="col-xs-12 col-md-6 profitCalculator__card__inner__column">
                            <img src="images/tickets.svg" alt={t(`${TRANSLATE}.alts.3.alt`)} />
                            <div className="profitCalculator__card__inner__column__text">{t(`${TRANSLATE}.text2`)}</div>
                        </Grid>
                        <Grid align="center" className="col-xs-12 col-md-6 profitCalculator__card__inner__column">
                            <button onClick={decreaseTickets}>
                                <img src="icons/minus.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} />
                            </button>
                            <div className="profitCalculator__card__inner__column__value">
                                {tickets} {tickets > 1 ? t(`${TRANSLATE}.tickets`) : t(`${TRANSLATE}.ticket`)}
                            </div>
                            <button onClick={increaseTickets}>
                                <img src="icons/plus.svg" alt={t(`${TRANSLATE}.alts.2.alt`)} />
                            </button>
                        </Grid>
                    </Grid>
                    <Grid align="center" justify="center" className="profitCalculator__card__summary">
                        <div>{t(`${TRANSLATE}.label1`)}:</div>
                        <span>
                            {getEURString(calculateEarnings())} {t(`${TRANSLATE}.eur`)}
                        </span>
                        <div>{t(`${TRANSLATE}.label2`)}</div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfitCalculator;
