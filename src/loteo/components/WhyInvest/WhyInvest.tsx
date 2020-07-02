import React, {useState, useContext, useEffect} from "react";
import {Helmet} from "react-helmet";
import {useTranslation, Trans} from "react-i18next";
import AutosizeInput from "react-input-autosize";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import {useInputState} from "hooks";
import {Footer, Header, NetworksSidebar} from "loteo/components";
import {Grid} from "ui/components";
import {NavigationContext} from "app/contexts";

import "./whyInvest.scss";

const WhyInvest = () => {
    const {t} = useTranslation();
    const TRANSLATE = "whyInvest";
    const {showContactUs} = useContext(NavigationContext);
    const [pros, setPros] = useState(0.001);
    const [fromProsInput, setFromProsInput] = useState(0);
    const [prosInput, setProsInput, setProsInputDirectly] = useInputState("0.001");
    const [realInvest, setRealInvest] = useState(10000);
    const [invest, , setInvestDirectly] = useInputState("10000");

    const normalInteger = (str) => {
        return str.match(/\d/g);
    };

    const normalFloat = (str) => {
        return str.match(/[+-]?\d+(\.\d+)?/g);
    };

    const numberWithSpaces = (str) => {
        var parts = str.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    };

    useEffect(() => {
        let tempNumber = normalFloat(prosInput);

        if (!tempNumber || tempNumber.length === 0) {
            setFromProsInput(1);
            setPros(0);
        } else {
            tempNumber = tempNumber.join("");
            setFromProsInput(1);
            setPros(Number(tempNumber));
        }
    }, [prosInput]);

    useEffect(() => {
        if (fromProsInput === 1) {
            setFromProsInput(0);
            return;
        }
        setProsInputDirectly(pros.toFixed(3));
    }, [pros]);

    const setInvestInputWithCursor = (e) => {
        let num = e.target.selectionStart;
        const prevValue = invest;
        const target = e.target;

        let tempNumber = normalInteger(target.value);
        if (!tempNumber || tempNumber.length === 0) {
            setInvestDirectly("");
        } else {
            tempNumber = tempNumber.join("");
            setRealInvest(Number(tempNumber));
            setInvestDirectly(numberWithSpaces(Number(tempNumber).toFixed(0)));
            setTimeout(() => {
                num += numberWithSpaces(Number(tempNumber).toFixed(0)).split(" ").length - prevValue.split(" ").length;
                target.setSelectionRange(num, num);
            }, 10);
        }
    };

    return (
        <div className="whyInvest">
            <Helmet>
                <title>{t(`${TRANSLATE}.helmet`)}</title>
            </Helmet>
            <NetworksSidebar />
            <div className="background">
                <Header />
                <Grid justify="end" className="elements">
                    <img src="images/why-invest-right.png" alt={t(`${TRANSLATE}.alts.0.alt`)} />
                </Grid>
                <div className="content">
                    <svg width="100%">
                        <text dy="81.25%" dx="12">{t(`${TRANSLATE}.t1`)}</text>
                    </svg>
                    <div className="subTitle">{t(`${TRANSLATE}.p1`)}</div>
                </div>
                <div className="rectangle">
                    <div className="topDivider"></div>
                    <div>
                        {t(`${TRANSLATE}.p21`)}
                        <span>
                            <AutosizeInput
                                key={t(`${TRANSLATE}.alts.1.alt`)}
                                name="invest-revenue-name"
                                minWidth={10}
                                inputClassName="textInput"
                                value={prosInput}
                                onChange={setProsInput}
                                placeholder="0"
                            />
                            %
                        </span>
                        <Trans
                            i18nKey={`${TRANSLATE}.p2`}
                            values={{revenue: `$${numberWithSpaces((pros * 10000).toFixed())}M`}}
                        />
                    </div>
                    <div className="bottomDivider"></div>
                </div>
            </div>
            <Grid align="center" direction="column" className="bottomPanel">
                <div className="sliderContainer">
                    <Grid direction="row" justify="space-between">
                        <div className="mark">{`${numberWithSpaces(`${pros}`)}%`}</div>
                        <div className="mark">10%</div>
                    </Grid>
                    <Slider
                        min={0.001}
                        max={10}
                        defaultValue={pros}
                        value={pros}
                        onChange={setPros}
                        step={0.001}
                        railStyle={{backgroundColor: "#EBEBEB", height: 14}}
                        trackStyle={{backgroundColor: "#EBEBEB", height: 14}}
                        handleStyle={{
                            height: 44,
                            width: 44,
                            marginLeft: -22,
                            marginTop: -15,
                            borderColor: "transparent",
                            backgroundColor: "#1BCEA7E0"
                        }}
                    />
                </div>
                <div className="fixedRevenue">{`${numberWithSpaces((pros * 40 / 0.001).toFixed())}%`}</div>
                <h1>{t(`${TRANSLATE}.p3`)}</h1>
                <Grid direction="row" className="calculator">
                    <svg width="100%">
                        <text dy="68.6%">{t(`${TRANSLATE}.p4`)}</text>
                    </svg>
                    <div className="priceContainer">
                        <AutosizeInput
                            name="invest-field-name"
                            inputClassName="textInput"
                            value={numberWithSpaces(invest)}
                            onChange={(e) => setInvestInputWithCursor(e)}
                            placeholder="10 000"
                            placeholderIsMinWidth
                        />
                        $
                    </div>
                </Grid>
                <Grid direction="row" className="calculator">
                    <svg width="100%">
                        <text dy="68.6%">{t(`${TRANSLATE}.p5`)}</text>
                    </svg>
                    <div className="priceContainer">
                        {`${numberWithSpaces((realInvest * 0.4 / 12 * pros / 0.001).toFixed())}$`}
                    </div>
                </Grid>
                <Grid direction="row" className="calculator marginBt40">
                    <svg width="100%">
                        <text dy="68.6%">{t(`${TRANSLATE}.p6`)}</text>
                    </svg>
                    <div className="priceContainer">
                        {`${numberWithSpaces((realInvest * 0.4 * pros / 0.001).toFixed())}$`}
                    </div>
                </Grid>
                <Grid className="contactButton" onClick={showContactUs}>
                    {t("global.contactUs")}
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
};
export default WhyInvest;
