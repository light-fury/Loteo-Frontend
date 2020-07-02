import React, {useState} from "react";
import moment from "moment";

import {Button, ButtonStyle, Grid} from "ui/components";
import {LoteoSales} from "loteo/types";
import {useBodyNoScroll} from "hooks";

import "./loteoPassSales.scss";

type Props = {
    owners: LoteoSales[] | null;
    close(any);
};

const LoteoPassSales = ({owners, close}: Props) => {
    const [page, setPage] = useState<number>(1);
    const count = owners ? owners.length : 0;
    const rowsPerPage = 10;

    useBodyNoScroll();

    return (
        <div className="loteoPassSales">
            <div className="loteoPassSales__overlay" />
            <div className="loteoPassSales__section">
                <div className="loteoPassSales__section__close" onClick={() => close(null)}><i className="fa fa-times"></i></div>
                <div className="loteoPassSales__section__title">LoteoPass Owners</div>
                <Grid className="loteoPassSales__section__header" noPadding noWidth>
                    <Grid className="col-xs-3">Owner</Grid>
                    <Grid className="col-xs-6">Email</Grid>
                    <Grid className="col-xs-3">Valid until</Grid>
                </Grid>
                <Grid direction="column" noPadding noWidth>
                    {owners && owners.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item, idx) => (
                        <Grid className="loteoPassSales__section__table" noPadding noWidth key={`owner-${idx}`}>
                            <Grid className="col-xs-3">{item["username"]}</Grid>
                            <Grid className="col-xs-6">{item["email"]}</Grid>
                            <Grid className="col-xs-3">{moment(item["validUntil"]).format("DD MMM YYYY")}</Grid>
                        </Grid>
                    ))}
                </Grid>
                <div className="pagination">
                    <Button
                        className="pagination__arrowButton left"
                        style={ButtonStyle.TransparentWhite}
                        text=""
                        iconURL="icons/chevron-right.svg"
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
                        iconURL="icons/chevron-right.svg"
                        onClick={() => setPage(page + 1)}
                        disabled={page === Math.ceil(count / rowsPerPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoteoPassSales;
