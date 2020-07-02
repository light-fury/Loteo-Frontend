import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";

import "./partners.scss";

const Partners = () => {
    const {t} = useTranslation();
    const TRANSLATE = "partner";
    const showMoreMobileRef = useRef<HTMLDivElement>(null);
    const [renderAdvantageCount, setRenderAdvantageCount] = useState<number>(6);

    const showMoreButtonClick = () => {
        if (showMoreMobileRef.current) {
            const node = showMoreMobileRef.current;
            node.style.opacity = "0";
            setRenderAdvantageCount(partners.length + 1);
            setTimeout(() => {
                node.style.display = "none";
            }, 1000);
        }
    };

    const partners = [
        {
            logoURL: "images/partners/coinpayments.png",
            link: "https://www.coinpayments.net"
        },
        {
            logoURL: "images/partners/coinspectator.png",
            link:
                "https://coinspectator.com/news/1250203/loteo-set-to-transform-lotteries-onto-the-blockchain-creates-new-paradigm-of-how-lotteries-should-function-lottery-needs-a-revolution"
        },
        {
            logoURL: "images/partners/roadcrossers.png",
            link: "https://roadcrossers.com/en/"
        },
        {
            logoURL: "images/partners/hacktrophy.png",
            link: "https://hacktrophy.com/sk/"
        },
        {
            logoURL: "images/partners/coinewstelegraph.png",
            link:
                "https://coinnewstelegraph.com/loteo-set-to-transform-lotteries-onto-the-blockchain-creates-new-paradigm-of-how-lotteries-should-function/"
        },
        {
            logoURL: "images/partners/coinmagazine.png",
            link:
                "http://cryptomax.news/loteo-set-to-transform-lotteries-onto-the-blockchain-creates-new-paradigm-of-how-lotteries-should-function-lottery-needs-a-revolution/"
        },
        {
            logoURL: "images/partners/bitcoingarden.png",
            link:
                "https://bitcoingarden.org/loteo-set-to-transform-lotteries-onto-the-blockchain-creates-new-paradigm-of-how-lotteries-should-function-lottery-needs-a-revolution/"
        },
        {
            logoURL: "images/partners/vixen.png",
            link:
                "https://vixennow.com/2019/02/17/loteo-set-to-transform-lotteries-onto-the-blockchain-creates-new-paradigm-of-how-lotteries-should-function/"
        },
        {
            logoURL: "images/partners/torus.png",
            link: "https://www.toruspr.com"
        },
        {
            logoURL: "images/partners/thebitcoinnews.png",
            link:
                "https://thebitcoinnews.com/loteo-set-to-transform-lotteries-onto-the-blockchain-creates-new-paradigm-of-how-lotteries-should-function-lottery-needs-a-revolution/"
        },
        {
            logoURL: "images/partners/blockonomi.png",
            link: "https://blockonomi.com/loteo-transform-lotteries-blockchain/"
        },
        {
            logoURL: "images/partners/amazon.png",
            link: "https://aws.amazon.com"
        },
        {
            logoURL: "images/partners/techbulion.png",
            link:
                "https://www.techbullion.com/loteo-set-to-transform-lotteries-onto-the-blockchain-creates-new-paradigm-of-how-lotteries-should-function/"
        },
        {
            logoURL: "images/partners/metamask.png",
            link: "https://metamask.io"
        },
        {
            logoURL: "images/partners/icomagazine.png",
            link: "https://icomagazine.com/loteo-set-to-transform-lotteries-onto-the-blockchain/"
        },
        {
            logoURL: "images/partners/eterbase.png",
            link: "https://www.eterbase.com"
        },
        {
            logoURL: "images/partners/cryptonewslab.png",
            link:
                "http://cryptonewslab.com/posts/loteo-set-to-transform-lotteries-onto-the-blockchain-creates-new-paradigm-of-how-lotteries-should-function-lottery-needs-a-revolution/"
        },
        {
            logoURL: "images/partners/cryptonachrichten.png",
            link:
                "https://krypto-nachrichten.com/loteo-set-zur-umwandlung-von-lotterien-in-die-blockchain-erzeugt-ein-neues-paradigma-fuer-das-funktionieren-von-lotterien-lotterie-braucht-eine-revolution/"
        },
        {
            logoURL: "images/partners/cryptomoney.png",
            link: "https://kryptomoney.com/loteo-set-to-transform-lotteries-onto-the-blockchain/"
        },
        {
            logoURL: "images/partners/ronixlab.png",
            link: "https://kryptomoney.com/loteo-set-to-transform-lotteries-onto-the-blockchain/"
        }
    ];

    return (
        <div className="partners">
            {partners.map((item, idx) => (
                <div className="partners__partner desktop-view" key={`partner-${idx}`}>
                    <a href={item.link} target="_blank" rel="noreferrer noopener">
                        <img className="logo" src={item.logoURL} alt={t(`${TRANSLATE}.alts.0.alt`)} />
                    </a>
                </div>
            ))}
            {partners.slice(0, renderAdvantageCount).map((item, idx) => (
                <div className="partners__partner mobile-view" key={`partner-${idx}`}>
                    <a href={item.link} target="_blank" rel="noreferrer noopener">
                        <img className="logo" src={item.logoURL} alt={t(`${TRANSLATE}.alts.0.alt`)} />
                    </a>
                </div>
            ))}
            <div className="partners__load-more" ref={showMoreMobileRef} onClick={showMoreButtonClick}>
                {t("global.showMore")}
                <span className="icon" />
            </div>
        </div>
    );
};

export default Partners;
