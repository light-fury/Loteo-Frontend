import React from "react";

import {
    StatisticsHeader as Header,
    Trend,
    UserCard
} from "loteo/components";
// import {getTwitterUsers} from "loteo/api";

import "./socialNetworks.scss";

const SocialNetworks = () => {
    // const twitterFollowers = getTwitterUsers();

    return (
        <div className="socialNetworks">
            <Header title="Social Networks" onChange={() => {}}/>
            <div className="socialNetworks__content">
                <Trend className="trend">
                    <UserCard type="Telegram Chat" users={8000} thumb="telegram.svg"/>
                    <UserCard type="Telegram Channel" users={6000} thumb="telegram.svg"/>
                    <UserCard type="Twitter" users={6000} thumb="twitter.svg"/>
                    <UserCard type="Facebook" users={15233} thumb="facebook.svg"/>
                    <UserCard type="Instagram" users={4856} thumb="instagram.svg"/>
                    <UserCard type="Reddit" users={9852} thumb="reddit.svg"/>
                    <UserCard type="Bitcointalk" users={8000} thumb="btc.svg"/>
                    <UserCard type="LinkedIn" users={6000} thumb="linkedin.svg"/>
                    <UserCard type="Medium Subscribers" users={25632} thumb="subscribers.png"/>
                    <UserCard type="Web Subscribers" users={15233} thumb="web-subscribers.png"/>
                    <UserCard type="Youtube subscribers" users={4856} thumb="youtube.svg"/>
                    <UserCard type="Youtube Totalviews" users={9852} thumb="youtube.svg"/>
                </Trend>
            </div>
        </div>
    );
};

export default SocialNetworks;
