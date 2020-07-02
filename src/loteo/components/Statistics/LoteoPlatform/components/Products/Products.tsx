import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Grid} from "ui/components";
import {
    Trend,
    TrendCard,
    StatisticsSubHeader as SubHeader
} from "loteo/components";
import {
    loadStatisticsProduct
} from "loteo/actions";
import {LoteoPassSales, ProductTicketSales, MoFVolume} from "common/components";
import {StatisticsProduct, LoteoSales, ProductTicket, MoFVolumeDeatil, StatisticsFilter} from "loteo/types";
import {getStatisticsProduct} from "loteo/selectors";
import {useReduxStore} from "hooks";

import "./products.scss";

type Props = {
    className: string;
    loadStatisticsProduct(string);
};


const Products = ({className, loadStatisticsProduct}: Props) => {
    const [currentFilter, setCurrentFilter] = useState(0);
    const [ownersLoteoPass, setOwnersLoteoPass] = useState<LoteoSales[] | null>(null);
    const [ownersProductTicket, setOwnersProductTicket] = useState<ProductTicket[] | null>(null);
    const [ownersMoFVolume, setOwnersMoFVolume] = useState<MoFVolumeDeatil[] | null>(null);
    const [dialogType, setDialogType] = useState();
    const [product]: [StatisticsProduct | null] = useReduxStore([getStatisticsProduct]);

    const handleChangeFilter = (category) => {
        loadStatisticsProduct(category);
        StatisticsFilter.forEach((item) =>
            category === item.name ? setCurrentFilter(item.key) : currentFilter
        );
    };

    useEffect(() => {
        loadStatisticsProduct("daily");
    }, []);

    const showDetailDialog = (type) => {
        if (product) {
            switch (type) {
                case "weeklyTicket":
                    setOwnersProductTicket(product.weeklyTicketsSales);
                    setDialogType("ProductTicket");
                    break;
                case "dailyTicket":
                    setOwnersProductTicket(product.dailyTicketsSales);
                    setDialogType("ProductTicket");
                    break;
                case "loteoMaxx10":
                    setOwnersProductTicket(product.loteoMaxx10Sales);
                    setDialogType("ProductTicket");
                    break;
                case "loteMaxx20":
                    setOwnersProductTicket(product.loteoMaxx20Sales);
                    setDialogType("ProductTicket");
                    break;
                case "loteoMaxx50":
                    setOwnersProductTicket(product.loteoMaxx50Sales);
                    setDialogType("ProductTicket");
                    break;
                case "loteoMaxx100":
                    setOwnersProductTicket(product.loteoMaxx100Sales);
                    setDialogType("ProductTicket");
                    break;
                case "boughtLoteu":
                    setOwnersProductTicket(product.loteuSales);
                    setDialogType("ProductTicket");
                    break;
                case "mof":
                    setOwnersMoFVolume(product.spinDetails);
                    setDialogType("mof");
                    break;
                case "loteopassSales":
                    setOwnersLoteoPass(product.loteoPassSales);
                    setDialogType("loteopassSales");
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className={className}>
            <SubHeader title="Products" active={currentFilter} onChange={handleChangeFilter} filter/>
            <div className="products">
                <Grid className="products__ticketSales" noWidth noPadding>
                    <Trend className="trend" backgroundImg="ticket.png">
                        <TrendCard name="Weekly Lottery tickets sales" value={product ? product.weeklyTicketsSalesCount : null} onOpen={showDetailDialog} dialog="weeklyTicket" showDetail/>
                    </Trend>
                    <Trend className="trend" backgroundImg="ticket.png">
                        <TrendCard name="Daily Lottery tickets sales" value={product ? product.dailyTicketsSalesCount : null} onOpen={showDetailDialog} dialog="dailyTicket" showDetail/>
                    </Trend>
                    <Trend className="trend" backgroundImg="loteopass.svg">
                        <TrendCard
                            name="LoteoPass sales"
                            value={product ? product.loteoPassSales.length : null}
                            showDetail
                            onOpen={showDetailDialog}
                            dialog="loteopassSales"
                        />
                    </Trend>
                </Grid>
                <div className="products__loteoSales">
                    <Trend className="trend" backgroundImg="loteomaxx.svg">
                        <TrendCard name="LoteoMaxx Total sales" value={product ? product.loteoMaxxTotalSales : null} />
                        <TrendCard name="LoteoMaxx 10 sales" value={product ? product.loteoMaxx10SalesCount : null} onOpen={showDetailDialog} dialog="loteoMaxx10" showDetail/>
                        <TrendCard name="LoteoMaxx 20 sales" value={product ? product.loteoMaxx20SalesCount : null} onOpen={showDetailDialog} dialog="loteMaxx20" showDetail/>
                        <TrendCard name="LoteoMaxx 50 sales" value={product ? product.loteoMaxx50SalesCount : null} onOpen={showDetailDialog} dialog="loteoMaxx50" showDetail/>
                        <TrendCard name="LoteoMaxx 100 sales" value={product ? product.loteoMaxx100SalesCount : null} onOpen={showDetailDialog} dialog="loteoMaxx100" showDetail/>
                    </Trend>
                </div>
                <Grid className="products__games" noWidth noPadding>
                    <Trend className="trend" backgroundImg="bought.png">
                        <TrendCard name="Bought Loteu on Platform" value={product ? product.loteuSalesCount : null} onOpen={showDetailDialog} dialog="boughtLoteu" showDetail/>
                    </Trend>
                    <Trend className="trend" backgroundImg="mof.png">
                        <TrendCard name="Volume in Moon of Fortune" value={product ? product.mofVolume : null} onOpen={showDetailDialog} dialog="mof" showDetail/>
                    </Trend>
                </Grid>
                {(dialogType === "loteopassSales") && (<LoteoPassSales owners={ownersLoteoPass ? ownersLoteoPass : null} close={setDialogType}/>)}
                {(dialogType === "ProductTicket") && (<ProductTicketSales owners={ownersProductTicket ? ownersProductTicket : null} close={setDialogType}/>)}
                {(dialogType === "mof") && (<MoFVolume owners={ownersMoFVolume ? ownersMoFVolume : null} close={setDialogType}/>)}
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadStatisticsProduct
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(Products);

