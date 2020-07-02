import React, {useContext} from "react";
import {useTranslation} from "react-i18next";

import {User} from "auth/types";
import {MyAffiliate} from "loteo/types";
import {NavigationContext} from "app/contexts";
import {Grid} from "ui/components";
import {camelCase} from "common/utils";

import {ProgressInfoHeader, ProgressInfoCTA, ProgressInfoUnlockable} from "..";

import "./progressInfo.scss";

type Props = {
    user: User | null;
    myAffiliate?: MyAffiliate;
    buyPass();
    buyTicket();
};

const ProgressInfo = ({user, myAffiliate, buyPass, buyTicket}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.progressInfo";

    const {navigateTo} = useContext(NavigationContext);

    const tiers = {
        Bronze: "#563216",
        Silver: "#B6B6B6",
        Gold: "#FECF0F",
        Platinum: "#835F5F",
        Diamond: "#003393",
        "Moon Stone": "#DA2814"
    };

    const isPremium = !!(user && user.affiliateStatus === "PREMIUM");
    const isAffiliate = !!(user && user.affiliateStatus === "AFFILIATE");

    const premiumPartner = [
        {
            unlocked: isPremium,
            theme: "yellow",
            title: t(`${TRANSLATE}.unlockables.premiumPartner.premiumLine.title`),
            lockedText: t(`${TRANSLATE}.unlockables.premiumPartner.premiumLine.lockedText`),
            unlockedText: t(`${TRANSLATE}.unlockables.premiumPartner.premiumLine.unlockedText`),
            onInfoClick: () => navigateTo("/share/affiliate-programs#premiumLine"),
            content: null
        },
        {
            unlocked: isPremium,
            theme: "yellow",
            title: t(`${TRANSLATE}.unlockables.premiumPartner.doubleChance.title`),
            lockedText: t(`${TRANSLATE}.unlockables.premiumPartner.doubleChance.lockedText`),
            unlockedText: t(`${TRANSLATE}.unlockables.premiumPartner.doubleChance.unlockedText`),
            onInfoClick: () => navigateTo("/share/affiliate-programs#premiumLine"),
            content: null
        },
        {
            unlocked: isPremium,
            theme: "yellow",
            title: t(`${TRANSLATE}.unlockables.premiumPartner.spaceProgram.title`),
            onInfoClick: null,
            content: (
                <Grid className="progressInfo__spaceProgram">
                    {myAffiliate &&
                        myAffiliate.stats &&
                        myAffiliate.spaceProgramStats.levelData.map(SPItem => (
                            <Grid
                                key={`progressInfo-spaceProgramItem-${SPItem.level}`}
                                direction="column"
                                align="center"
                                className={`progressInfo__spaceProgram__item ${
                                    (myAffiliate.stats.spaceProgramSoldTickets || 0) >= SPItem.ticketCount
                                        ? "active"
                                        : "inactive"
                                } ${!isPremium ? "locked" : ""}`}
                            >
                                <div className="progressInfo__spaceProgram__item__title">
                                    {SPItem.level}
                                    <span>%</span>
                                </div>
                                <Grid>
                                    {[...Array(SPItem.level)].map((_, starIdx) => (
                                        <img
                                            key={`progressInfo-spaceProgramItem-${SPItem}-${starIdx}`}
                                            src={
                                                !isPremium
                                                    ? "images/star-small-pink.svg"
                                                    : "images/star-small-active.svg"
                                            }
                                            alt="*"
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                </Grid>
            )
        },
        {
            unlocked: isPremium,
            theme: "yellow",
            title: t(`${TRANSLATE}.unlockables.premiumPartner.VIPStatus.title`),
            onInfoClick: null,
            content: (
                <Grid wrap justify="center" className="progressInfo__VIPStatus">
                    {user &&
                        user.vipStatuses.map(tier => (
                            <Grid
                                key={`progressInfo__VIPStatusItem-${tier.name}`}
                                justify="center"
                                className={`progressInfo__VIPStatus__item ${
                                    (user.premiumTickets || 0) >= tier.tickets ? "active" : "inactive"
                                } ${!isPremium ? "locked" : ""}`}
                                style={{color: tiers[tier.name]}}
                                noPadding
                            >
                                <span>
                                    {t(
                                        `share.affiliatePrograms.VIPInfo.tiers.${camelCase(
                                            tier.name.toLowerCase()
                                        )}.title`
                                    )}
                                </span>
                            </Grid>
                        ))}
                </Grid>
            )
        }
    ];

    const affiliatePartner = [
        {
            unlocked: !isPremium && isAffiliate,
            theme: "red",
            title: t(`${TRANSLATE}.unlockables.affiliatePartner.affiliateLine.title`),
            lockedText: t(`${TRANSLATE}.unlockables.affiliatePartner.affiliateLine.lockedText`),
            unlockedText: t(`${TRANSLATE}.unlockables.affiliatePartner.affiliateLine.unlockedText`),
            onInfoClick: () => navigateTo("/share/affiliate-programs#affiliateLine"),
            content: null
        }
    ];

    return (
        <Grid align="start" className="progressInfo">
            <Grid direction="column" className="col-xs-12 col-md-6" noPadding>
                <Grid className="col-xs-12">
                    <ProgressInfoHeader
                        theme="yellow"
                        available={!isPremium}
                        unlocked={isPremium}
                        title={t(`${TRANSLATE}.premiumPartner.title`)}
                        subtitle={t(`${TRANSLATE}.premiumPartner.subtitle`)}
                        icon="images/share/benefits/pass.svg"
                        unlockedIcon="images/share/premium-partner.svg"
                    />
                </Grid>
                <Grid justify="center" className="col-xs-12">
                    <ProgressInfoCTA
                        text={t(`${TRANSLATE}.buyPass`)}
                        buttonStyle="YellowCondensed"
                        theme="yellow"
                        available={true}
                        unlocked={isPremium}
                        onClick={buyPass}
                    />
                </Grid>
                <Grid wrap className="col-xs-12 progressInfo__content" noPadding>
                    {premiumPartner.map((item, idx) => (
                        <Grid key={`progressInfo-premiumPartnerUnlockable-${idx}`} className="col-xs-12 col-md-6">
                            <ProgressInfoUnlockable
                                unlocked={item.unlocked}
                                theme={item.theme}
                                title={item.title}
                                lockedText={item.lockedText}
                                unlockedText={item.unlockedText}
                                onInfoClick={item.onInfoClick}
                                content={item.content}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid justify="center" className="progressInfo__divider">
                <div>OR</div>
            </Grid>
            <Grid direction="column" className="col-xs-12 col-md-6" noPadding>
                <Grid className="col-xs-12">
                    <ProgressInfoHeader
                        theme="red"
                        available={!isPremium}
                        unlocked={isAffiliate && !isPremium}
                        title={t(`${TRANSLATE}.affiliatePartner.title`)}
                        subtitle={t(`${TRANSLATE}.affiliatePartner.subtitle`)}
                        icon="images/share/benefits/ticket.svg"
                        unlockedIcon="images/share/affiliate-partner-white.svg"
                    />
                </Grid>
                <Grid justify="center" className="col-xs-12">
                    <ProgressInfoCTA
                        text={t(`${TRANSLATE}.buyTicket`)}
                        buttonStyle="RedCondensed"
                        theme="white"
                        available={!isPremium}
                        unlocked={isAffiliate}
                        onClick={buyTicket}
                    />
                </Grid>
                <Grid className="col-xs-12 progressInfo__content" noPadding>
                    {affiliatePartner.map((item, idx) => (
                        <Grid key={`progressInfo-affiliatePartnerUnlockable-${idx}`} className="col-xs-12">
                            <ProgressInfoUnlockable
                                unlocked={item.unlocked}
                                theme={item.theme}
                                title={item.title}
                                lockedText={item.lockedText}
                                unlockedText={item.unlockedText}
                                onInfoClick={item.onInfoClick}
                                content={item.content}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProgressInfo;
