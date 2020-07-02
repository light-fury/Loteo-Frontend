import React from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";

import "./acceptedCurrencies.scss";

const AcceptedCurrencies = () => {
    const {t} = useTranslation();
    const TRANSLATE = "acceptedCurrencies";

    return (
        <div className="acceptedCurrencies">
            <div className="title">{t(`${TRANSLATE}.acceptedCurrencies`)}</div>
            <div className="separator" />
            <Grid justify="center" wrap noWidth>
                <Grid noWidth>
                    <div className="currencies">
                        <div className="currency">
                            <img src="/images/home/paymnetsMethod/loteu.png" alt="loteo"/>
                        </div>
                        <div className="currencyName active">LOTEU</div>
                    </div>
                    <div className="currencies">
                        <div className="currency active">
                            <img className="ethereum" src="/images/home/paymnetsMethod/ethereum.png" alt="ethereum"/>
                        </div>
                        <div className="currencyName active">ETHEREUM</div>
                    </div>
                    <div className="currencies">
                        <div className="currency active">
                            <img src="/images/home/paymnetsMethod/bitcoin.png" alt="bitcoin"/>
                        </div>
                        <div className="currencyName active">BITCOIN</div>
                    </div>
                </Grid>
                <Grid noWidth>
                    <div className="currencies">
                        <div className="currency">
                            <img className="image" src="/images/home/paymnetsMethod/card1.png" alt="card"/>
                        </div>
                        <div className="currencyName">Coming Soon</div>
                    </div>
                    <div className="currencies">
                        <div className="currency">
                            <img className="image" src="/images/home/paymnetsMethod/paypal.png" alt="paypal"/>
                        </div>
                        <div className="currencyName">Coming Soon</div>
                    </div>
                    <div className="currencies">
                        <div className="currency">
                            <img className="image" src="/images/home/paymnetsMethod/visa.png" alt="visa"/>
                        </div>
                        <div className="currencyName">Coming Soon</div>
                    </div>
                </Grid>
            </Grid>
            <div className="separator" />
        </div>
    );
};
export default AcceptedCurrencies;
