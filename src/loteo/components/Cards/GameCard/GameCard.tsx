import React, {useContext} from "react";
import classNames from "classnames";

import {User} from "auth/types";
import {NavigationContext} from "app/contexts";
import {Counter, User as Winner} from "loteo/components";
import {MixButton} from "ui/components";

import "./gameCard.scss";

type Props = {
    type: string;
    gameType?: number;
    thumbUrl: string;
    title: string;
    userInfo?: User | null;
    lastWinner?: string | null;
    lastWinnerPrice?: number | null;
    value: string;
    unit: string;
    winnerCurrency?: string;
    entry?: string;
    bonus?: string | null;
    additional?: string;
    startTime: Date | null;
    btnName: string;
    btnType: string;
    playNow?();
};

const GameCard = ({
    type = "lottery",
    gameType,
    thumbUrl,
    userInfo,
    lastWinner = null,
    lastWinnerPrice = null,
    title,
    value,
    unit,
    winnerCurrency,
    entry,
    bonus = null,
    additional,
    startTime,
    btnName,
    btnType,
    playNow}: Props
) => {
    const backgroundUrl = "/images/dashboard/" + type + "Games/" + thumbUrl;
    const lottery = type === "lottery" ? "lottery" : "loteo";
    const {showGameDetails} = useContext(NavigationContext);

    return (
        <div className="gameCard" >
            <div className="gameCard__card" style={{backgroundImage: "url(" + backgroundUrl + ")"}}>
                <div className={classNames(`gameCard__card--title ${lottery}`)}>
                    {title}
                </div>
                <div className="gameCard__card--value">
                    {value} <span>{unit}</span>
                </div>
                {startTime && (
                    <div className="gameCard__card--time">
                        <p>Game starts in:</p>
                        <Counter untilDate={startTime ? startTime : new Date()} />
                    </div>
                )}
                <div className="gameCard__card--button" onClick={playNow}>
                    <MixButton text={btnName} style={btnType} />
                    {entry && (
                        <div className="entry">
                            <div className="content">
                                Entry: <span>{entry}</span><br/>
                                {bonus && (
                                    <>
                                        Bonus: <span>{bonus}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="gameCard__card--additional">
                    {additional}
                </div>
                <div className="gameCard__card__information" onClick={() => showGameDetails(gameType)}><i className="fa fa-info" aria-hidden="true" /></div>
            </div>
            {(lastWinner !== null || userInfo !== null) && (
                <div className="gameCard__winner">
                    <Winner
                        name={(lastWinner ? lastWinner : null) || (userInfo ? userInfo.username : null)}
                        breadCrumb={userInfo && userInfo.avatar ? userInfo.avatar : null}
                        level={userInfo ? userInfo.spaceProgramLevels : null}
                        tickets={userInfo && userInfo.spaceProgramSoldTickets ? userInfo.spaceProgramSoldTickets : null}
                        winPrice={{price: lastWinnerPrice, unit: winnerCurrency}}
                    />
                </div>
            )}
        </div>
    );
};

export default GameCard;
