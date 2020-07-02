import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {getETHString} from "common/utils";

import "./affiliatePartnersTable.scss";

type Props = {
    data: any;
    levels: number[];
};

const Row = ({data, levels}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.partnersTable";

    const [expanded, setExpanded] = useState(false);

    const isExpandable = !!(data && data.partners && data.partners.length);

    const resolveCol = (col: any, levels: number[], showPartners: boolean) => {
        switch (col[0]) {
            case "nickname":
                return showPartners ? (
                    <>
                        <div>{col[1]}</div>
                        {showPartners && !!data.partners && <span>{data.partners.length} partners</span>}
                    </>
                ) : (
                    col[1]
                );

            case "partners":
                return Array.isArray(col[1]) ? col[1].length : col[1];

            case "spaceProgram":
                return (
                    <div className="spaceBetween">
                        <div>{col[1]}</div>
                        <div>
                            {levels.map((_, idx) => (
                                <img
                                    key={`star-${idx}`}
                                    src="images/star-small-active.svg"
                                    className={`star ${col[1] <= levels[idx] ? "inactive" : "active"}
                                    `}
                                    alt="*"
                                />
                            ))}
                        </div>
                    </div>
                );

            case "totalEth":
                return getETHString(col[1]);

            case "affiliateStatus":
                return (
                    <div
                        className={`affiliatePartnersTable__row__status affiliatePartnersTable__row__status--${col[1].toLowerCase()}`}
                    >
                        {t(`${TRANSLATE}.status.${col[1]}`)}
                    </div>
                );

            default:
                return col[1];
        }
    };

    return (
        <>
            <tr
                className={`affiliatePartnersTable__row ${expanded ? "expanded" : ""}`}
                onClick={() => isExpandable && setExpanded(!expanded)}
                style={{cursor: isExpandable ? "pointer" : ""}}
            >
                {Object.entries(data).map((item, idx) => (
                    <td key={`affiliatePartnersTable-row-col-${idx}`}>{resolveCol(item, levels, true)}</td>
                ))}
            </tr>
            {expanded &&
                isExpandable &&
                data.partners.map((row, idx) => (
                    <tr
                        key={`affiliatePartnersTable-row-col-child-${idx}`}
                        className={`
                        affiliatePartnersTable__row__child
                        ${data.partners && idx + 1 < data.partners.length ? "" : "last"}
                    `}
                    >
                        {Object.entries(row).map((col, idx2) => (
                            <td key={`affiliatePartnersTable-row-col-${idx2}`}>
                                {resolveCol(col, [30, 100, 200], false)}
                            </td>
                        ))}
                    </tr>
                ))}
        </>
    );
};

export default Row;
