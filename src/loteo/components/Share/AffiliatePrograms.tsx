import React, {useContext, useEffect} from "react";
import {useTranslation, Trans} from "react-i18next";

import {Grid, Button, ButtonStyle} from "ui/components";
import {BackgroundTexture} from "loteo/components";
import {NavigationContext} from "app/contexts";
import {AuthContext} from "auth/contexts";
import {login} from "auth/api";

import {BonusLabel, BonusCards, SpaceProgramInfo, VIPInfo, ProfitCalculator} from "./components";

const ShareAffiliatePrograms = () => {
    const {t} = useTranslation();
    const TRANSLATE = "share.affiliatePrograms";

    const {navigateTo} = useContext(NavigationContext);
    const {loggedIn} = useContext(AuthContext);

    useEffect(() => {
        const el = document.getElementById(location.hash.slice(1));

        if (el) {
            setTimeout(() => {
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 1000);
        }
    }, []);

    const premiumBonusCards = [
        {
            image: "images/share/bonuses/ticket.png",
            title: {
                text: t(`${TRANSLATE}.premiumBonusCards.0.title`)
            },
            price: t(`${TRANSLATE}.premiumBonusCards.0.price`),
            text: <Trans i18nKey={`${TRANSLATE}.premiumBonusCards.0.text`} />
        },
        {
            image: "images/share/bonuses/maxx.png",
            title: {
                text: t(`${TRANSLATE}.premiumBonusCards.1.title`)
            },
            price: t(`${TRANSLATE}.premiumBonusCards.1.price`),
            text: <Trans i18nKey={`${TRANSLATE}.premiumBonusCards.1.text`} />
        },
        {
            image: "images/share/bonuses/pass.png",
            title: {
                text: t(`${TRANSLATE}.premiumBonusCards.2.title`),
                theme: "yellow"
            },
            price: t(`${TRANSLATE}.premiumBonusCards.2.price`),
            text: <Trans i18nKey={`${TRANSLATE}.premiumBonusCards.2.text`} />
        }
    ];

    const affiliateBonusCards = [
        {
            image: "images/share/bonuses/ticket.png",
            title: {
                text: t(`${TRANSLATE}.affiliateBonusCards.0.title`)
            },
            text: <Trans i18nKey={`${TRANSLATE}.affiliateBonusCards.0.text`} />
        },
        {
            image: "images/share/bonuses/maxx.png",
            title: {
                text: t(`${TRANSLATE}.affiliateBonusCards.1.title`)
            },
            text: <Trans i18nKey={`${TRANSLATE}.affiliateBonusCards.1.text`} />
        },
        {
            image: "images/share/bonuses/pass.png",
            title: {
                text: t(`${TRANSLATE}.affiliateBonusCards.2.title`),
                theme: "yellow"
            },
            text: <Trans i18nKey={`${TRANSLATE}.affiliateBonusCards.2.text`} />
        }
    ];

    return (
        <Grid container wrap className="share__affiliatePrograms">
            <BackgroundTexture />
            {/* 1st section header */}
            <Grid direction="column" align="center" className="col-xs-12">
                <img
                    src="images/share/premium-partner.svg"
                    alt={t(`${TRANSLATE}.alts.0.alt`)}
                    className="share__affiliatePrograms__headerIcon"
                />
                <h3 className="yellow">
                    <Trans i18nKey={`${TRANSLATE}.title1`} />
                </h3>
                <h4>
                    <Trans i18nKey={`${TRANSLATE}.subtitle1`} />
                </h4>
            </Grid>

            {/* Premium Partner Bonus cards */}
            <BonusLabel
                label={t(`${TRANSLATE}.bonuses.0.label`)}
                text={t(`${TRANSLATE}.bonuses.0.text`)}
                description={t(`${TRANSLATE}.bonuses.0.description`)}
                id="premiumLine"
            />
            <BonusCards cards={premiumBonusCards} cardsKey="affiliatePrograms" />

            {/* Space Program Info (icons with coins) */}
            <BonusLabel label={t(`${TRANSLATE}.bonuses.1.label`)} text={t(`${TRANSLATE}.bonuses.1.text`)} />
            <Grid className="col-xs-12">
                <h4>
                    <Trans i18nKey={`${TRANSLATE}.subtitle2`} />
                </h4>
            </Grid>
            <SpaceProgramInfo />

            {/* VIP Status Program */}
            <BonusLabel label={t(`${TRANSLATE}.bonuses.2.label`)} text={t(`${TRANSLATE}.bonuses.2.text`)} />
            <VIPInfo />

            {/* Premium Partner Call To Action (yellow button above the "OR" divider) */}
            <Grid align="center" direction="column" className="col-xs-12 share__affiliatePrograms__cta">
                <h3 className="yellow">
                    <Trans i18nKey={`${TRANSLATE}.title2`} />
                </h3>
                <Button
                    text={t(`${TRANSLATE}.CTA`)}
                    style={ButtonStyle.GoldCondensed}
                    onClick={loggedIn ? () => navigateTo("/dashboard#buy") : () => login(undefined, true)}
                />
            </Grid>

            {/* "OR" divider */}
            <Grid align="center" justify="center" className="col-xs-12 share__affiliatePrograms__divider">
                {t(`${TRANSLATE}.divider`)}
            </Grid>

            {/* 2nd section header */}
            <Grid direction="column" align="center" className="col-xs-12">
                <img
                    src="images/share/affiliate-partner.svg"
                    alt={t(`${TRANSLATE}.alts.1.alt`)}
                    className="share__affiliatePrograms__headerIcon"
                />
                <h3 className="red">
                    <Trans i18nKey={`${TRANSLATE}.title3`} />
                </h3>
                <h4>
                    <Trans i18nKey={`${TRANSLATE}.subtitle3`} />
                </h4>
            </Grid>

            {/* Affiliate Partner Bonus cards */}
            <BonusLabel
                label={t(`${TRANSLATE}.bonuses.3.label`)}
                text={t(`${TRANSLATE}.bonuses.3.text`)}
                description={t(`${TRANSLATE}.bonuses.3.description`)}
                theme="red"
                id="affiliateLine"
            />
            <BonusCards cards={affiliateBonusCards} cardsKey="affiliatePrograms" />

            {/* Profit calculator */}
            <ProfitCalculator />

            {/* Affiliate Partner Call To Action (red button above footer) */}
            <Grid align="center" direction="column" className="col-xs-12 share__affiliatePrograms__cta">
                <h3 className="red">
                    <Trans i18nKey={`${TRANSLATE}.title4`} />
                </h3>
                <Button
                    text={t(`${TRANSLATE}.CTA`)}
                    style={ButtonStyle.Default}
                    onClick={loggedIn ? () => navigateTo("/dashboard#buy") : () => login(undefined, true)}
                />
            </Grid>
        </Grid>
    );
};

export default ShareAffiliatePrograms;
