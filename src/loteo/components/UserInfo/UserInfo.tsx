import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {User} from "auth/types";
import {logout} from "auth/actions";
import {NavigationContext} from "app/contexts";
import {Grid} from "ui/components";

import "./userInfo.scss";

type Props = {
    logout();
    user: User | null;
    detailsHidden?: boolean;
    hideActions?: boolean;
};

const UserInfoComponent = ({user, logout, detailsHidden = false, hideActions = false}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "userInfoComponent";
    const {showUserProfile} = useContext(NavigationContext);
    if (user) {
        const script = document.createElement("script");

        script.id = "chatBroEmbedCode";
        script.innerHTML = "function ChatbroLoader(chats,async){async = !1 !== async; var params={embedChatsParameters: chats instanceof Array?chats:[chats],lang:navigator.language||navigator.userLanguage,needLoadCode:'undefined'==typeof Chatbro,embedParamsVersion:localStorage.embedParamsVersion,chatbroScriptVersion:localStorage.chatbroScriptVersion},xhr=new XMLHttpRequest;xhr.withCredentials=!0,xhr.onload=function(){eval(xhr.responseText)},xhr.onerror=function(){console.error('Chatbro loading error')},xhr.open('GET','//www.chatbro.com/embed.js?'+btoa(unescape(encodeURIComponent(JSON.stringify(params)))),async),xhr.send()}/* Chatbro Widget Embed Code End */ChatbroLoader({encodedChatId: '047ub'});";
        document.body.appendChild(script);
    }
    return (
        <div className="userInfo">
            <div className="userInfo__avatar">
                {user && (
                    <img
                        src={user.avatar || "http://www.gravatar.com/avatar/?d=mp"}
                        alt={t(`${TRANSLATE}.alts.0.alt`)}
                        className="picture"
                    />
                )}
                {!detailsHidden && (
                    <div className="userInfo__avatar__nameActions">
                        <div className="arrow-up" />
                        <div className="name">
                            {user ? user.username : t(`${TRANSLATE}.loading`)}
                            {user && !!user.spaceProgramSoldTickets.toString() && user.spaceProgramLevels && (
                                <Grid align="center">
                                    {user.spaceProgramLevels.map((item, idx) => (
                                        <img
                                            key={`headerAffiliateLevel-star-${idx}`}
                                            src="images/star-small-active.svg"
                                            className={
                                                "star" + (item <= user.spaceProgramSoldTickets ? " active" : " inactive")
                                            }
                                            alt="*"
                                        />
                                    ))}
                                </Grid>
                            )}
                        </div>
                        {user && user.affiliateStatus !== "NONE" && (
                            user.affiliateStatus === "PREMIUM" ?
                                <div className="premium">{t(`${TRANSLATE}.affiliateStatus.${user ? user.affiliateStatus : ""}`)}</div>
                                :   <div className="affiliate">{t(`${TRANSLATE}.affiliateStatus.${user ? user.affiliateStatus : ""}`)}</div>
                        )}
                        {hideActions == false && (
                            <div className="actions">
                                <div className="action" onClick={showUserProfile}>
                                    {t(`${TRANSLATE}.profile`)}
                                </div>
                                <div className="separator" />
                                <div className="action" onClick={logout}>
                                    {t(`${TRANSLATE}.logout`)}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            logout
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoComponent);
