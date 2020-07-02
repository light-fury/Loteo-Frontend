import React, {useState} from "react";
import {Button, ButtonStyle, Grid} from "ui/components";
import {noop} from "common/utils";

import "./table.scss";

interface TableHeader {
    id: string;
    header: React.ReactNode | string;
    subHeader?: React.ReactNode | string;
    sortable?: boolean;
    width?: string;
}

type Props = {
    headers?: TableHeader[];
    data: object[];
    rowsPerPage?: number;
    hideHeader?: boolean;
    hideFooter?: boolean;
    renderable?: boolean;
    onSort?(id, order);
    className?: string;
    style?: object;
};

const Table = ({
    headers = [],
    data = [],
    rowsPerPage = 10,
    hideHeader = false,
    hideFooter = false,
    renderable = false,
    onSort = noop,
    className,
    style
}: Props) => {
    const [page, setPage] = useState<number>(1);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "dec">("dec");
    const count = data.length;

    const onSortData = (id: string, sortable: boolean = false) => {
        if (sortable) {
            setSortKey(id);
            setSortOrder(sortOrder === "asc" ? "dec" : "asc");
            onSort(id, sortOrder);
        }
    };

    const renderHeader = () => {
        return (
            <>
                <colgroup>
                    {headers.map(header => (
                        <col key={`table-col-${header.id}`} width={header.width} />
                    ))}
                </colgroup>
                {!hideHeader && (
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th
                                    key={`table-header-${header.id}`}
                                    onClick={() => onSortData(header.id, header.sortable)}
                                    className={header.sortable ? "sortable" : ""}
                                >
                                    <Grid noWidth>
                                        <div className={`header ${header.id === sortKey ? "active" : ""}`}>
                                            {header.header}
                                            {header.subHeader && (
                                                <Grid justify="space-between" align="center" noWidth>
                                                    <span className="header__subHeader">{header.subHeader}</span>
                                                    {header.id === sortKey && (
                                                        <img
                                                            src="icons/chevron-down.svg"
                                                            alt="close"
                                                            className={`header__arrowButton ${
                                                                sortOrder === "dec" ? "down" : ""
                                                            }`}
                                                        />
                                                    )}
                                                </Grid>
                                            )}
                                        </div>
                                    </Grid>
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
            </>
        );
    };

    const renderData = () => {
        return (
            <tbody>
                {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item, index) => (
                    <tr key={`tr-${index}`} className={[item["_active"] ? "active" : "", item["_className"]].join(" ")}>
                        {headers.map(header => (
                            <td key={`td-${index}-${header.id}`} style={{width: header.width}}>{item[header.id]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    const renderRenderableData = () => {
        return (
            <tbody>
                {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item, index) => (
                    <tr key={`tr-${index}`} className={[item["_active"] ? "active" : "", item["_className"]].join(" ")}>
                        <td style={{padding: 0}}>{item}</td>
                    </tr>
                ))}
            </tbody>
        );
    };

    return (
        <div className={`loteoTable ${className ? className : ""}`} style={style}>
            <table>
                {!hideHeader && renderHeader()}
                {renderable ? renderRenderableData() : renderData()}
            </table>
            {!hideFooter && (
                <div className="footer">
                    <span>
                        Showing {(page - 1) * rowsPerPage + 1}-{Math.min(count, page * rowsPerPage)}
                    </span>
                    <div className="pagination">
                        <Button
                            className="pagination__arrowButton left"
                            style={ButtonStyle.TransparentWhite}
                            text=""
                            iconURL="icons/chevron-right-white.svg"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        />
                        <span>
                            {page}/{Math.ceil(count / rowsPerPage)}
                        </span>
                        <Button
                            className="pagination__arrowButton"
                            style={ButtonStyle.TransparentWhite}
                            text=""
                            iconURL="icons/chevron-right-white.svg"
                            onClick={() => setPage(page + 1)}
                            disabled={page === Math.ceil(count / rowsPerPage)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
