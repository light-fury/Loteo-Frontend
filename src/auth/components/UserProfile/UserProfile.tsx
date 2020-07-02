import React, {useContext} from "react";
import {useTranslation} from "react-i18next";

import {NavigationContext} from "app/contexts";
import {Background, Header, UserInfo as UserInfoComponent} from "loteo/components";
import {withAuthorization} from "auth/hoc";
import {UserForm} from "auth/components";
import {loadUser, logout} from "auth/actions";

import {useReduxActions, useReduxLoad} from "hooks";
import {getUser, getUserLoading} from "auth/selectors";

import {Button, ButtonStyle} from "ui/components";
import {ContextTabs, Loading} from "common/components";

import "./userProfile.scss";

const UserProfile = () => {
    const {t} = useTranslation();
    const TRANSLATE = "userProfile";

    const {showDashboard} = useContext(NavigationContext);
    const [user, userLoading] = useReduxLoad([loadUser()], [getUser, getUserLoading]);

    const [logoutUser] = useReduxActions([logout]);

    return (
        <div className="userProfile">
            <Background hideBackgroundEnd>
                <Header />
                <div className="userInfo">
                    <UserInfoComponent user={user} userLoading={userLoading} hideActions />
                    <Button
                        className="logoutButton"
                        text={t(`${TRANSLATE}.logout`)}
                        style={ButtonStyle.TransparentWhite}
                        iconURL="icons/logout-icon.svg"
                        onClick={logoutUser}
                    />
                    <img className="closeButton" src="icons/close.svg" alt="close" onClick={showDashboard} />
                </div>
                <ContextTabs
                    tabs={[
                        {
                            name: t(`${TRANSLATE}.tabs.0.name`),
                            path: "/user-profile"
                        }
                    ]}
                />
            </Background>
            {!user && <Loading />}
            {user && <UserForm user={user} />}
        </div>
    );
};
export default withAuthorization(UserProfile);
