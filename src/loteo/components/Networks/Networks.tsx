import React from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";
import {NETWORKS} from "loteo/constants";

import "./networks.scss";

const Networks = () => {
    const {t} = useTranslation();
    const TRANSLATE = "networks";

    return (
        <Grid wrap align="center" justify="center" className="networks">
            {NETWORKS.map((item, idx) => (
                <a
                    key={`networks-item-${idx}`}
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
export default Networks;
