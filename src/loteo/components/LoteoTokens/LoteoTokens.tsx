import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";

import "./loteoTokens.scss";

type State = {
    loteu: boolean;
    lotes: boolean;
};

const LoteoTokens = () => {
    const {t} = useTranslation();
    const TRANSLATE = "info.loteoTokens";

    const [expanded, setExpanded] = useState<State>({
        loteu: false,
        lotes: false
    });

    const toggleExpanded = key => setExpanded({...expanded, [key]: !expanded[key]});

    return (
        <div className="loteoTokens">
            <Grid align="start" justify="center" className="loteoTokens__section">
                <div>
                    <h3>
                        {t(`${TRANSLATE}.t3`)}
                        <a
                            href="https://etherscan.io/address/0xf8a3dc13b7a8da473f80660f513c4343e4edd7f7"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            0xf8a3dc13b7a8da473f80660f513c4343e4edd7f7
                        </a>
                    </h3>
                    <p>
                        {t(`${TRANSLATE}.p5`)}
                        {!expanded.loteu && (
                            <>
                                {"..."}
                                <button
                                    className="loteoTokens__section__toggleBtn"
                                    onClick={() => toggleExpanded("loteu")}
                                >
                                    {t("global.showMore")}
                                </button>
                            </>
                        )}
                    </p>
                    {expanded.loteu && (
                        <>
                            <p>{t(`${TRANSLATE}.p6`)}</p>
                            <p>{t(`${TRANSLATE}.p7`)}</p>
                        </>
                    )}
                </div>
                <img src="images/info/loteoTokens/loteu.png" alt={t(`${TRANSLATE}.t3`)} />
            </Grid>
            <div className="center">
                <img className="loteuChart" src="images/loteu-chart.png" alt="loteu" />
            </div>
            <Grid align="start" justify="center" className="loteoTokens__section">
                <div>
                    <h3>
                        {t(`${TRANSLATE}.t2`)}
                        <a
                            href="https://etherscan.io/address/0xc39fb6b4a3ef33c34447405288dd16898bd39648"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            0xc39fb6b4a3ef33c34447405288dd16898bd39648
                        </a>
                    </h3>
                    <p>
                        {t(`${TRANSLATE}.p2`)}
                        {!expanded.lotes && (
                            <>
                                {"..."}
                                <button
                                    className="loteoTokens__section__toggleBtn"
                                    onClick={() => toggleExpanded("lotes")}
                                >
                                    {t("global.showMore")}
                                </button>
                            </>
                        )}
                    </p>
                    {expanded.lotes && (
                        <>
                            <p>{t(`${TRANSLATE}.p3`)}</p>
                            <p>{t(`${TRANSLATE}.p4`)}</p>
                        </>
                    )}
                </div>
                <img src="images/info/loteoTokens/lotes.png" alt={t(`${TRANSLATE}.t2`)} />
            </Grid>
            <div className="lotesCharts">
                <img className="lotesChartNow" src="images/lotes-chart-1.png" alt={t(`${TRANSLATE}.alts.0.alt`)} />
                <img className="lotesChartFuture" src="images/lotes-chart-2.png" alt={t(`${TRANSLATE}.alts.0.alt`)} />
            </div>
        </div>
    );
};
export default LoteoTokens;
