import React, {useContext, useState, useEffect} from "react";

import {Grid} from "ui/components";
import {NavigationContext} from "app/contexts";
import {getBonusStatus} from "loteo/api";
import {BonusStatus} from "loteo/types";
import "./bonusBox.scss";

type Props = {
    depositEth();
};

const BonusBox = ({depositEth}: Props) => {

    const {showWeeklyLottery, showPromotions} = useContext(NavigationContext);
    const [bonusStatus, setBonusStatus] = useState<BonusStatus | null>(null);

    const getBonus = () => {
        if (bonusStatus && bonusStatus.firstDeposit && bonusStatus.firstTicket) {
            return 2;
        } else if (bonusStatus && !bonusStatus.firstDeposit && !bonusStatus.firstTicket) {
            return 0;
        } else {
            return 1;
        }
    };

    useEffect(() => {
        getBonusStatus().then(response => {
            setBonusStatus(response);
        });
    }, []);

    return (
        <div className="myBonus">
            <div className="myBonus__action">
                My BONUSES
                <div className="number">{getBonus()}</div>
            </div>
            <div className="myBonus__list">
                {getBonus() > 0 && (<div className="arrow-up" />)}
                {bonusStatus && bonusStatus.firstDeposit && (
                    <div className="category">
                        <div className="title">WELCOME BONUS</div>
                        <p className="details">Deposit 1 ETH & get bonus 3000 LOTEU</p>
                        <Grid className="buttons" noPadding noWidth justify="start">
                            <div className="more" onClick={showPromotions}>More info</div>
                            <div className="claim" onClick={depositEth}>CLAIM</div>
                        </Grid>
                    </div>
                )}
                {bonusStatus && bonusStatus.firstTicket && (
                    <div className="category">
                        <div className="title">FIRST TICKET BONUS</div>
                        <p className="details">Buy first ticket & get 100 LOTEU to double your chances</p>
                        <Grid className="buttons" noPadding noWidth justify="start">
                            <div className="more" onClick={showPromotions}>More info</div>
                            <div className="claim" onClick={() => showWeeklyLottery()}>CLAIM</div>
                        </Grid>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BonusBox;
