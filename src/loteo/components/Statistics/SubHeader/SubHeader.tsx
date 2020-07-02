import React from "react";
import classNames from "classnames";

import {Grid} from "ui/components";
import {StatisticsFilter as Filter} from "loteo/types";

import "./subHeader.scss";

type Props = {
    title: string;
    filter?: boolean;
    active?: number;
    onChange?(any);
};

const SubHeader = ({title, filter = false, active = 1, onChange}: Props) => (
    <Grid className="statistics__subheader" justify="space-between" noPadding noWidth>
        <div className="statistics__subheader__title">{title}</div>
        {filter && (
            <Grid className="statistics__subheader__filter" align="center" noPadding noWidth>
                {Filter.map((item, idx) => (
                    <div
                        className={classNames("statistics__subheader__filter__item", {"active": active === item.key})}
                        onClick={onChange ? () => onChange(item.name) : () => {}}
                        key={`filter-${idx}`}
                    >
                        {item.name}
                    </div>
                ))}
            </Grid>
        )}
    </Grid>
);

export default SubHeader;
