import React from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";
import {MixButton} from "ui/components";

import "./inviteFriends.scss";

type Props = {
    showInviteFriends();
};

const InviteFriends = ({showInviteFriends}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "inviteFriendsSection";

    return (
        <div className="inviteFriendsSection">
            <div className="inviteFriendsSection__header">
                {t(`${TRANSLATE}.t1`)}
                <div className="detail">
                    {t(`${TRANSLATE}.p.0`)} {t(`${TRANSLATE}.p.1`)}
                </div>
            </div>
            <Grid wrap justify="center" align="baseline" noWidth>
                <Grid className="col-xs-12 col-md-5 col-lg-4" justify="center" noPadding>
                    <div className="inviteFriendsSection__premium">
                        <div className="friends-avatar"><img src="/images/dashboard/premium-partner.svg" alt="premium" /></div>
                        <div className="title">
                            Buy LoteoPass & become
                            <h4>PREMIUM PARTNER</h4>
                        </div>
                    </div>
                </Grid>
                <Grid className="col-xs-12 col-md-5 col-lg-4" justify="center" noPadding>
                    <div className="inviteFriendsSection__affiliate">
                        <div className="friends-avatar"><img src="/images/dashboard/affiliate-partner.svg" alt="premium"/></div>
                        <div className="title">
                            Invite friends & and play for free as
                            <h4>AFFILIATE PARTNER</h4>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <div className="affiliate-btn">
                <MixButton text={t("footer.affiliate.btn")} style="gold" onClick={showInviteFriends} />
            </div>
        </div>
    );
};

export default InviteFriends;
