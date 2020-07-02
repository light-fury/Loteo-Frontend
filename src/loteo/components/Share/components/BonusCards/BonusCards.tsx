import React from "react";
import {Trans} from "react-i18next";

import {Grid} from "ui/components";

import "./bonusCards.scss";

type BonusCardTitle = {
    text: string;
    theme?: string;
};

type BonusCard = {
    image?: string;
    title: BonusCardTitle;
    price?: string;
    text: React.ReactNode | string;
};

type Props = {
    cards: BonusCard[];
    cardsKey: string;
};

const BonusCards = ({cards, cardsKey}: Props) => (
    <Grid wrap className="bonusCards">
        <Grid wrap className="col-xs-12" noPadding>
            {cards.map((item, idx) => (
                <Grid key={`bonusCards-${cardsKey}-${idx}`} className="col-xs-12 col-md-4 bonusCards__item">
                    {item.image && <img src={item.image} alt={item.title.text} />}
                    <div className="bonusCards__item__card">
                        <Grid align="center" justify="space-between">
                            <div
                                className={`bonusCards__item__card__title ${
                                    item.title.theme ? item.title.theme : "red"
                                }`}
                            >
                                {item.title.text || ""}
                            </div>
                            {item.price && <div className="bonusCards__item__card__price">{item.price}</div>}
                        </Grid>
                        {item.text && <div className="bonusCards__item__card__text">{item.text}</div>}
                    </div>
                </Grid>
            ))}
        </Grid>
        <Grid className="col-xs-12 bonusCards__disclaimer" justify="center" noPadding>
            <Trans i18nKey="share.affiliatePrograms.bonusCardsDisclaimer" />
        </Grid>
    </Grid>
);

export default BonusCards;
