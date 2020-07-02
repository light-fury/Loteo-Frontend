import React from "react";
import {Trans} from "react-i18next";

import {Grid} from "ui/components";

import "./spaceProgramInfo.scss";

const SpaceProgramInfo = () => {
    const TRANSLATE = "share.affiliatePrograms.spaceProgram";

    const spaceProgram = [
        {
            image: "images/share/spaceProgram/1.png",
            text: <Trans i18nKey={`${TRANSLATE}.0.text`} />
        },
        {
            image: "images/share/spaceProgram/2.png",
            text: <Trans i18nKey={`${TRANSLATE}.1.text`} />
        },
        {
            image: "images/share/spaceProgram/3.png",
            text: <Trans i18nKey={`${TRANSLATE}.2.text`} />
        }
    ];

    return (
        <Grid wrap className="spaceProgramInfo">
            {spaceProgram.map((item, idx) => (
                <Grid
                    key={`share-affiliatePrograms-spaceProgram-${idx}`}
                    direction="column"
                    align="center"
                    className="col-xs-12 col-md-4"
                >
                    <img src={item.image} alt={`${idx + 1}%`} />
                    <div className="spaceProgramInfo__text">{item.text}</div>
                </Grid>
            ))}
        </Grid>
    );
};

export default SpaceProgramInfo;
