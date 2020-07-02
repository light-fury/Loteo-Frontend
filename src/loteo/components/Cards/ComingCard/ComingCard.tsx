import React, {useContext} from "react";
import classNames from "classnames";
import {MixButton} from "ui/components";
import {NavigationContext} from "app/contexts";

import "./comingCard.scss";

type Props = {
    type: string;
    gameType?: number;
    thumbUrl: string;
    title: string;
    btnName: string;
};

const ComingCard = ({type, gameType, thumbUrl, title, btnName}: Props) => {
    const backgroundUrl = "/images/dashboard/" + type + "Games/" + thumbUrl;
    const lottery = type === "lottery" ? "lottery" : "loteo";
    const {showGameDetails} = useContext(NavigationContext);

    return (
        <div className="comingCard" style={{backgroundImage: "url(" + backgroundUrl + ")"}}>
            <div className={classNames(`comingCard--title ${lottery}`)}>
                {title}
            </div>
            <div className="comingCard--button">
                <MixButton text={btnName} style="grey" />
            </div>
            <div className="comingCard__information" onClick={() => showGameDetails(gameType)}><i className="fa fa-info" aria-hidden="true" /></div>
        </div>
    );
};

export default ComingCard;
