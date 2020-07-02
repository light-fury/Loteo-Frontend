import React from "react";
import {useTranslation} from "react-i18next";

import {LoadingText} from "common/components";
import {Grid} from "ui/components";
import {BackgroundTexture} from "loteo/components";
import {getBaseURL} from "common/utils";
import {User} from "auth/types";
import {MyAffiliate} from "loteo/types";

import {AffiliatePartnersTable, Header} from "loteo/components/MyAffiliate/components";

type Props = {
    myAffiliate?: MyAffiliate;
    user?: User;
};

const MyAffiliatePartners = ({myAffiliate, user}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate";

    return myAffiliate && user ? (
        <Grid container direction="column" className="myAffiliate__statistics">
            <Header text={t(`${TRANSLATE}.subtitle2`)} />
            <AffiliatePartnersTable
                address={user ? `${getBaseURL()}?referral=${user.referralCode}` : "..."}
                data={myAffiliate && myAffiliate.partners ? myAffiliate.partners : null}
                levels={myAffiliate.stats.spaceProgramLevels}
            />
            <BackgroundTexture />
        </Grid>
    ) : (
        <div className="myAffiliate__loading">
            <LoadingText text={t(`${TRANSLATE}.loading`)} />
        </div>
    );
};

export default MyAffiliatePartners;
