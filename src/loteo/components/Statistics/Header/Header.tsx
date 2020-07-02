import React from "react";
import classNames from "classnames";

import {Grid} from "ui/components";
import {StatisticsFilter as Filter} from "loteo/types";

import "./header.scss";

type Props = {
    title: string;
    active?: number;
    onChange(any);
};

const Header = ({title, active = 1, onChange}: Props) => (
    <Grid className="statistics__header" justify="space-between" noPadding noWidth>
        <div className="statistics__header__title">{title}</div>
        <Grid className="statistics__header__filter" align="center" noPadding noWidth>
            {Filter.map((item, idx) => (
                <div
                    className={classNames("statistics__header__filter__item", {"active": active === item.key})}
                    onClick={() => onChange(item.name)}
                    key={`filter-${idx}`}
                >
                    {item.name}
                </div>
            ))}
        </Grid>
    </Grid>
);

export default Header;
