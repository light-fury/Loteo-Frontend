import React, {useContext} from "react";
import Joyride, {Step, ACTIONS, EVENTS, STATUS} from "react-joyride";
import {useTranslation} from "react-i18next";
import {WalletContext} from "app/contexts";

type Props = {
    run?: boolean;
    onTutorialFinished();
    onTargetNotFound?();
    onTutorialSkipped?();
};

const Tutorial = ({run = true, onTutorialFinished, onTargetNotFound, onTutorialSkipped}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "joyride";
    const {openWallet, closeWallet} = useContext(WalletContext);

    const tutorialSteps: Step[] = [
        // 1
        {
            target: ".userInfo .action:last-of-type",
            content: t("joyride.dashboard.text1"),
            disableBeacon: true
        },
        // 2
        {
            target: ".walletDetails",
            content: t("joyride.dashboard.text2"),
            disableBeacon: true
        },
        // 3
        {
            target: ".currencyCards .currencyCardSmall.eth",
            content: t("joyride.dashboard.text3"),
            disableBeacon: true
        },
        // 4
        {
            target: ".currencyCards .currencyCardSmall.loteu",
            content: (
                <>
                    {t("joyride.dashboard.text4.0")}
                    <a
                        href="https://medium.com/loteo/unique-token-structure-a356d43c6fe2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("joyride.dashboard.text4.1")}
                    </a>
                    {t("joyride.dashboard.text4.2")}
                    <a
                        href="https://medium.com/loteo/where-you-could-get-loteu-in-the-past-and-where-to-get-it-in-the-future-530ad66ea31e"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("joyride.dashboard.text4.3")}
                    </a>
                </>
            ),
            disableBeacon: true
        },
        // 5
        {
            target: ".currencyCards .currencyCardSmall.lotes",
            content: (
                <>
                    {t("joyride.dashboard.text5.0")}
                    <a
                        href="https://medium.com/@playloteo/why-invest-in-loteo-20c3be195b3c"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("joyride.dashboard.text5.1")}
                    </a>
                    {t("joyride.dashboard.text5.2")}
                </>
            ),
            disableBeacon: true
        },
        // 6
        {
            target: ".tickets",
            content: t("joyride.dashboard.text6"),
            placement: "top",
            disableBeacon: true
        },
        // 7
        {
            target: ".weeklyLottery .playNowButtonWrapper",
            content: t("joyride.dashboard.text7"),
            disableBeacon: true
        },
        // 8
        {
            target: ".walletPanel .expandWalletButton",
            content: t("joyride.dashboard.text8"),
            disableBeacon: true
        },
        // 9
        {
            target: "#header",
            content: t("joyride.dashboard.text9"),
            placement: "bottom",
            disableBeacon: true
        },
        // 10
        {
            target: ".walletPanel .currencyCards .currencyCardFull .actions .button.default",
            content: t("joyride.dashboard.text10"),
            placement: "top",
            disableBeacon: true
        },
        // 11
        {
            target: ".lotteryInfo .weeklyLottery",
            content: (
                <>
                    {t("joyride.dashboard.text11.0")}
                    <br />
                    <code>{t("joyride.dashboard.text11.1")}</code>
                    {t("joyride.dashboard.text11.2")}
                </>
            ),
            placement: "bottom",
            disableBeacon: true
        },
        // 12
        {
            target: ".lotteryInfo .ticketSummaryCards .loteopassTicketSummaryCard",
            content: (
                <>
                    {t("joyride.dashboard.text12.0")}
                    <a
                        href="https://medium.com/loteo/what-loteo-the-1st-transparent-blockchain-lottery-offers-you-with-the-loteopass-ticket-394e17c1f72e"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("joyride.dashboard.text12.1")}
                    </a>
                    {t("joyride.dashboard.text12.2")}
                </>
            ),
            placement: "top",
            disableBeacon: true
        },
        // 13
        {
            target: ".lotteryInfo .ticketSummaryCards .loteomaxxTicketSummaryCard",
            content: (
                <>
                    {t("joyride.dashboard.text13.0")}
                    <a
                        href="https://medium.com/loteo/what-loteo-the-1st-transparent-blockchain-lottery-offers-you-with-the-loteopass-ticket-394e17c1f72e"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("joyride.dashboard.text13.1")}
                    </a>
                </>
            ),
            placement: "top",
            disableBeacon: true
        },
        // 14
        {
            target: ".lotteryInfo .ticketSummaryCards .ticketSummaryCards__mof",
            content: (
                <>
                    {t("joyride.dashboard.text14.0")}
                    <a
                        href="https://medium.com/loteo/claim-your-loteu-and-play-for-more-in-the-moon-of-fortune-8bc252e98ff9"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("joyride.dashboard.text14.1")}
                    </a>
                    {t("joyride.dashboard.text14.2")}
                </>
            ),
            placement: "top",
            disableBeacon: true
        },
        // 15
        {
            target: ".inviteFriendsSection",
            content: (
                <>
                    {t("joyride.dashboard.text15.0")}
                    <a
                        href="https://medium.com/loteo/claim-your-loteu-and-play-for-more-in-the-moon-of-fortune-8bc252e98ff9"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("joyride.dashboard.text15.1")}
                    </a>
                </>
            ),
            placement: "top",
            disableBeacon: true
        },
        // 16
        {
            target: ".moonVisitors > .title",
            content: t("joyride.dashboard.text16"),
            placement: "top",
            disableBeacon: true
        },
        // 17
        {
            target: "#header > div.topSection.spaceBetween > div.actions > div:nth-child(4)",
            content: t("joyride.dashboard.text17"),
            placement: "bottom",
            disableBeacon: true
        }
    ];

    const handleTutorialStepChange = (step: number) => {
        if (step === 8) {
            openWallet();
        } else if (step === 10) {
            closeWallet();
        }
    };

    const handleCallback = data => {
        const {action, index, status, type} = data;

        if (type === EVENTS.TARGET_NOT_FOUND) {
            onTargetNotFound && onTargetNotFound();
            handleTutorialStepChange(index + (action === ACTIONS.PREV ? -1 : 1));
        } else if (type === EVENTS.STEP_AFTER) {
            handleTutorialStepChange(index + (action === ACTIONS.PREV ? -1 : 1));
        } else if (status === STATUS.FINISHED) {
            onTutorialFinished();
        } else if (status === STATUS.SKIPPED && onTutorialSkipped) {
            onTutorialSkipped();
        }
    };

    return (
        <Joyride
            steps={tutorialSteps}
            continuous
            disableCloseOnEsc
            disableOverlayClose
            showProgress
            scrollToFirstStep
            showSkipButton
            run={run}
            callback={handleCallback}
            hideBackButton
            styles={{
                buttonClose: {
                    display: "none"
                },
                tooltip: {
                    borderRadius: 8,
                    padding: "16px 24px",
                    width: "500px"
                },
                tooltipContainer: {
                    textAlign: "left"
                },
                tooltipTitle: {
                    margin: "8px 0 4px 0",
                    color: "#da2814",
                    fontSize: 20
                },
                tooltipContent: {
                    padding: "8px 0 0",
                    color: "#300300",
                    fontSize: 14,
                    lineHeight: "24px"
                },
                tooltipFooter: {
                    marginTop: 20
                },
                buttonSkip: {
                    padding: 0,
                    fontFamily: "'Lato', sans-serif",
                    color: "#B3ACAB",
                    fontWeight: 700
                },
                buttonBack: {
                    marginRight: 25,
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 14,
                    fontWeight: 700
                },
                buttonNext: {
                    padding: "10px 15px",
                    borderRadius: 16,
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 14,
                    fontWeight: 700
                }
            }}
            locale={{
                back: t(`${TRANSLATE}.locale.back`),
                close: t(`${TRANSLATE}.locale.close`),
                last: t(`${TRANSLATE}.locale.last`),
                next: t(`${TRANSLATE}.locale.next`),
                skip: t(`${TRANSLATE}.locale.skip`)
            }}
        />
    );
};

export default Tutorial;
