import React from "react";
import {useTranslation, Trans} from "react-i18next";

import {Grid} from "ui/components";
import {BackgroundTexture} from "loteo/components";

import {BenefitImage, BonusLabel} from "./components";

const SharePlayerBenefits = () => {
    const {t} = useTranslation();
    const TRANSLATE = "share.playerBenefits";

    const bonuses = [
        {
            theme: "red",
            image: {
                image: "images/share/benefits/redbg.png",
                icon: "images/share/benefits/ticket.svg",
                title: <Trans i18nKey={`${TRANSLATE}.bonuses.0.image.title`} />,
                price: t(`${TRANSLATE}.bonuses.0.image.price`)
            },
            title: <Trans i18nKey={`${TRANSLATE}.bonuses.0.title`} />,
            bonuses: [
                {
                    label: t(`${TRANSLATE}.bonuses.0.bonuses.0.label`),
                    text: t(`${TRANSLATE}.bonuses.0.bonuses.0.text`)
                }
            ]
        },
        {
            theme: "red",
            image: {
                image: "images/share/benefits/redbg.png",
                icon: "images/share/benefits/maxx.svg",
                title: <Trans i18nKey={`${TRANSLATE}.bonuses.1.image.title`} />,
                price: t(`${TRANSLATE}.bonuses.1.image.price`)
            },
            title: <Trans i18nKey={`${TRANSLATE}.bonuses.1.title`} />,
            bonuses: [
                {
                    label: t(`${TRANSLATE}.bonuses.1.bonuses.0.label`),
                    text: t(`${TRANSLATE}.bonuses.1.bonuses.0.text`)
                },
                {
                    label: t(`${TRANSLATE}.bonuses.1.bonuses.1.label`),
                    text: t(`${TRANSLATE}.bonuses.1.bonuses.1.text`)
                },
                {
                    label: t(`${TRANSLATE}.bonuses.1.bonuses.2.label`),
                    text: t(`${TRANSLATE}.bonuses.1.bonuses.2.text`)
                },
                {
                    label: t(`${TRANSLATE}.bonuses.1.bonuses.3.label`),
                    text: t(`${TRANSLATE}.bonuses.1.bonuses.3.text`)
                }
            ]
        },
        {
            theme: "yellow",
            image: {
                image: "images/share/benefits/yellowbg.png",
                icon: "images/share/benefits/pass.svg",
                title: <Trans i18nKey={`${TRANSLATE}.bonuses.2.image.title`} />,
                price: t(`${TRANSLATE}.bonuses.2.image.price`)
            },
            title: <Trans i18nKey={`${TRANSLATE}.bonuses.2.title`} />,
            bonuses: [
                {
                    label: t(`${TRANSLATE}.bonuses.2.bonuses.0.label`),
                    text: t(`${TRANSLATE}.bonuses.2.bonuses.0.text`)
                },
                {
                    label: t(`${TRANSLATE}.bonuses.2.bonuses.1.label`),
                    text: t(`${TRANSLATE}.bonuses.2.bonuses.1.text`)
                },
                {
                    label: t(`${TRANSLATE}.bonuses.2.bonuses.2.label`),
                    text: t(`${TRANSLATE}.bonuses.2.bonuses.2.text`)
                },
                {
                    label: t(`${TRANSLATE}.bonuses.2.bonuses.3.label`),
                    text: t(`${TRANSLATE}.bonuses.2.bonuses.3.text`)
                }
            ]
        }
    ];

    return (
        <>
            <Grid container wrap className="share__playerBenefits">
                <BackgroundTexture />
                {/* Title */}
                <h3 className="red">
                    <Trans i18nKey={`${TRANSLATE}.title`} />
                </h3>

                {/* Bonuses */}
                {bonuses.map((item, idx) => (
                    <Grid
                        key={`share-playerBenefits-${idx}`}
                        align="center"
                        direction="column"
                        className="col-xs-12 share__playerBenefits__item"
                        noPadding
                    >
                        <BenefitImage
                            image={item.image.image}
                            icon={item.image.icon}
                            title={item.image.title}
                            price={item.image.price}
                        />
                        <div className={`share__playerBenefits__item__title ${item.theme}`}>{item.title}</div>
                        <Grid wrap justify="center" className="share__playerBenefits__item__bonuses">
                            {item.bonuses.map((bonus, idx2) => (
                                <Grid
                                    key={`share-playerBenefits-${idx}-${idx2}`}
                                    direction="column"
                                    align="center"
                                    className="col-xs-6 col-sm-3 share__playerBenefits__item__bonuses__item"
                                >
                                    <BonusLabel label={bonus.label} theme={item.theme} />
                                    <div className="share__playerBenefits__item__bonuses__item__description">
                                        {bonus.text}
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            {/* Coinback program */}
            <Grid className="share__playerBenefits__coinback">
                <img
                    src="images/background-end.svg"
                    alt={t("background.alts.2.alt")}
                    className="share__playerBenefits__coinback__cutout"
                />
                <Grid container direction="column" align="center" className="share__playerBenefits__coinback__inner">
                    <img src="images/share/benefits/coinback.svg" alt={t(`${TRANSLATE}.coinback.title`)} />
                    <div className="share__playerBenefits__coinback__inner__title">
                        {t(`${TRANSLATE}.coinback.title`)}
                    </div>
                    <div className="share__playerBenefits__coinback__inner__text">
                        {t(`${TRANSLATE}.coinback.text`)}
                    </div>
                    <BonusLabel label={t(`${TRANSLATE}.coinback.example`)} />
                </Grid>
            </Grid>
        </>
    );
};

export default SharePlayerBenefits;
