import React from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";
import {NETWORKS} from "loteo/constants";

import "./networksSidebar.scss";

const NetworksSidebar = () => {
    const {t} = useTranslation();
    const TRANSLATE = "networks";

    return (
        <Grid
            direction="column"
            align="center"
            justify="center"
            className="networksSidebar"
        >
            {NETWORKS.map((item, idx) => (
                <a
                    key={`networksSidebar-item-${idx}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={item.icon} alt={t(`${TRANSLATE}.alts.${idx}.alt`)} />
                </a>
            ))}
        </Grid>
    );
};
export default NetworksSidebar;
