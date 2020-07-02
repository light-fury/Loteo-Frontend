import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import copy from "copy-to-clipboard";

import {MyAffiliatePartner} from "loteo/types";
import {Button, ButtonStyle} from "ui/components";
import Row from "./Row";

import "./affiliatePartnersTable.scss";

type Props = {
    address: string | null;
    data: MyAffiliatePartner[] | null;
    levels: number[] | null;
};

const AffiliatePartnersTable = ({address, data, levels}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.partnersTable";
    const [copied, setCopied] = useState(false);

    const headers = [...Array(8)].map((_, idx) => t(`${TRANSLATE}.headers.${idx}`));

    const copyAddress = () => {
        if (address) {
            copy(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 200);
        }
    };

    return (
        <div className="affiliatePartnersTable">
            <table>
                {headers && !!headers.length && (
                    <thead>
                        <tr>
                            {headers.map(item => (
                                <th key={`affiliatePartnersTable-header-${item}`}>
                                    {/* Insert a space in front of every capital letter
                                and remove spaces around the string with trim()
                                (basically convert camelCase to normal wording) */}
                                    {item.replace(/([A-Z])/g, " $1").trim()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {data &&
                        !!data.length &&
                        data.map((row, idx) => (
                            <Row
                                key={`affiliatePartnersTable-row-${idx}`}
                                data={row}
                                levels={levels || [30, 100, 200]}
                            />
                        ))}
                    <tr>
                        <td colSpan={headers.length}>
                            {(!data || !data.length) && (
                                <div className="affiliatePartnersTable__empty">
                                    <strong>{t(`${TRANSLATE}.empty`)}</strong>
                                    {address && (
                                        <>
                                            <span>{t(`${TRANSLATE}.copyText`)}</span>
                                            <div className="affiliatePartnersTable__empty__address">
                                                <div>{address}</div>
                                                <Button
                                                    style={ButtonStyle.RedCondensed}
                                                    text={copied ? t(`${TRANSLATE}.copied`) : t(`${TRANSLATE}.copy`)}
                                                    onClick={copyAddress}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AffiliatePartnersTable;
