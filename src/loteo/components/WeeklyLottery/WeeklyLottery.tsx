import React from "react";

import {withAuthorization} from "auth/hoc";
import {BackgroundStatic, Header} from "loteo/components";

import {loadWallet} from "loteo/actions";
import {getWallet} from "loteo/selectors";
import {useReduxLoad} from "hooks";

import {TicketSelector} from "./components";

import "./weeklyLottery.scss";
type Props = {
    location: Location;
};
const WeeklyLottery = ({location}: Props) => {
    const [wallet, refreshWallet] = useReduxLoad([loadWallet()], [getWallet]);

    return (
        <div className="weeklyLottery">
            <BackgroundStatic className="apolloDailyLottery">
                <Header wallet={wallet} hideBottomSeparator />
                <div className="weeklyLottery__inner">
                    <TicketSelector wallet={wallet} location={location} refreshWallet={refreshWallet} />
                </div>
            </BackgroundStatic>
        </div>
    );
};

export default withAuthorization(WeeklyLottery);
