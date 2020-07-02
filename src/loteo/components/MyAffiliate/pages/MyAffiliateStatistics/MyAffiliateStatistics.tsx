import React from "react";
import {useTranslation} from "react-i18next";

import {LoadingText} from "common/components";
import {camelCase} from "common/utils";
import {Grid} from "ui/components";
import {BackgroundTexture} from "loteo/components";
import {User} from "auth/types";
import {MyAffiliate} from "loteo/types";

import {
    AffiliateStatisticsTable,
    AffiliateVIPStatus,
    SpaceProgramStatisticsTable,
    Header
} from "loteo/components/MyAffiliate/components";

type Props = {
    showPassDialog();
    myAffiliate: MyAffiliate;
    user: User;
};

const MyAffiliateStatistics = ({showPassDialog, myAffiliate, user}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate";

    const tiers =
        user &&
        user.vipStatuses.map(item => {
            const name = item.name.toLowerCase();

            return {
                theme: camelCase(name),
                image: `images/myAffiliate/VIPStatus/${camelCase(name)}.svg`,
                title: t(`share.affiliatePrograms.VIPInfo.tiers.${camelCase(name)}.title`),
                amount: item.tickets,
                bonus: item.lotesBonus
            };
        });

    return myAffiliate && user ? (
        <Grid container direction="column" className="myAffiliate__statistics">
            <Header
                text={t(`${TRANSLATE}.subtitle1`)}
                locked={user.affiliateStatus !== "PREMIUM"}
                onClick={showPassDialog}
            />
            <AffiliateStatisticsTable
                locked={user.affiliateStatus !== "PREMIUM"}
                data={myAffiliate.stats}
                onUnlockClick={showPassDialog}
            />
            <Header
                text={t(`${TRANSLATE}.subtitle3`)}
                locked={user.affiliateStatus !== "PREMIUM"}
                onClick={showPassDialog}
            />
            <SpaceProgramStatisticsTable
                locked={user.affiliateStatus !== "PREMIUM"}
                data={myAffiliate.spaceProgramStats}
            />
            <Header
                text={t(`${TRANSLATE}.subtitle4`)}
                locked={user.affiliateStatus !== "PREMIUM"}
                onClick={showPassDialog}
            />
            <AffiliateVIPStatus amount={user.premiumTickets || 0} tiers={tiers} />
            <BackgroundTexture />
        </Grid>
    ) : (
        <div className="myAffiliate__loading">
            <LoadingText text={t(`${TRANSLATE}.loading`)} />
        </div>
    );
};

export default MyAffiliateStatistics;
