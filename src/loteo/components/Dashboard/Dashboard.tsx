import React, {useContext, useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";

import {NavigationContext, WalletContextProvider} from "app/contexts";
import {loadLastWinners, loadWallet, loadWeeklyLotteryInfo, loadApolloDailyLotteryInfo} from "loteo/actions";
import {
    getWallet,
    getWeeklyLotteryInfo,
    getWeeklyLotteryInfoLoading,
    getApolloDailyLotteryInfo,
    getApolloDailyLotteryInfoLoading
} from "loteo/selectors";
import {
    Background,
    BackgroundTexture,
    DrawDialog,
    DrawVideo,
    Footer,
    Header,
    InviteFriends,
    LoteoGames,
    LoteuTokens,
    LotteryInfo,
    NetworksSidebar
} from "loteo/components";
import {DepositDialog} from "common/components";
import {BoardingDialog} from "common/components";
import {withAuthorization} from "auth/hoc";
import {useBooleanState, useReduxStore, useReduxActions, useReduxLoad, useLotteryDraw} from "hooks";
import {User} from "auth/types";
import {getUser} from "auth/selectors";
import {getETHString} from "common/utils";
import {Wallet, WeeklyLotteryInfo, ApolloDailyLotteryInfo} from "loteo/types";
import {
    addWeeklyLotteryResolvedListener,
    removeWeeklyLotteryResolvedListener,
    addDailyLotteryResolvedListener,
    removeDailyLotteryResolvedListener
} from "common/web3";
import ApolloDailyDrawVideo from "loteo/components/LotteryInfo/components/Apollo11Lottery/DrawVideo";

import LotteryLoteoUsers from "./LotteryLoteoUsers";

import "./dashboard.scss";

type Props = {
    location: Location;
};

const Dashboard = ({location}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "dashboard";
    const walletTranslate = "walletPanel";

    const ticketShopContainerRef = useRef<HTMLDivElement>(null);
    const [user]: [User | null] = useReduxStore([getUser]);
    const [ethDepositDialogVisible, showETHDepositDialog, hideETHDepositDialog] = useBooleanState();
    const {showShare, navigateTo} = useContext(NavigationContext);

    const showBoardingDialog = () => {
        if (user) {
            if (user.id === localStorage.nextBoarding || user.id === localStorage.currentBoarding) {
                return false;
            } else {
                return true;
            }
        }
    };

    const boardingDialog = showBoardingDialog();
    const [
        wallet,
        weeklyLotteryInfo,
        weeklyLotteryInfoLoading,
        apolloDailyLotteryInfo
    ]: [Wallet | null, WeeklyLotteryInfo | null, boolean, ApolloDailyLotteryInfo | null] = useReduxLoad(
        [loadWallet(), loadWeeklyLotteryInfo(), loadApolloDailyLotteryInfo()],
        [
            getWallet,
            getWeeklyLotteryInfo,
            getWeeklyLotteryInfoLoading,
            getApolloDailyLotteryInfo,
            getApolloDailyLotteryInfoLoading
        ]
    );
    const [
        refreshWeeklyLotteryInfo,
        refreshWallet,
        refreshLastWinners,
        refreshApolloDailyLotteryInfo
    ] = useReduxActions([loadWeeklyLotteryInfo, loadWallet, loadLastWinners, loadApolloDailyLotteryInfo]);
    const [nextMoonVisitorInfoVisible, showNextMoonVisitorInfo, hideNextMoonVisitorInfo] = useBooleanState();
    const [stickyWalletEnabled] = useBooleanState();
    const [
        weeklyDrawDialogVisible,
        weeklyDrawVideoVisible,
        weeklyDrawCountdownMillis,
        showWeeklyDrawVideo,
        hideWeeklyDrawVideo,
        weeklyDrawVideoSkippable,
        hideWeeklyDrawDialog
    ] = useLotteryDraw(
        weeklyLotteryInfo,
        addWeeklyLotteryResolvedListener,
        removeWeeklyLotteryResolvedListener,
        // "last-game-index",
        refreshWeeklyLotteryInfo
    );
    const [
        apolloDailyDrawDialogVisible,
        apolloDailyDrawVideoVisible,
        apolloDailyDrawCountdownMillis,
        showApolloDailyDrawVideo,
        hideApolloDailyDrawVideo,
        ,
        // apolloDailyDrawVideoSkippable,
        hideApolloDailyDrawDialog
    ] = useLotteryDraw(
        apolloDailyLotteryInfo,
        addDailyLotteryResolvedListener,
        removeDailyLotteryResolvedListener,
        // "apollo-daily-last-game-index",
        refreshApolloDailyLotteryInfo
    );

    const weeklyDrawVideoFinished = () => {
        showNextMoonVisitorInfo();
        refreshWeeklyLotteryInfo();
        refreshWallet();
        refreshLastWinners();
        hideWeeklyDrawDialog();
        hideWeeklyDrawVideo();
    };

    const apolloDailyDrawVideoFinished = () => {
        refreshApolloDailyLotteryInfo();
        refreshWallet();
        refreshLastWinners();
        hideApolloDailyDrawDialog();
        hideApolloDailyDrawVideo();
    };

    useEffect(() => {
        if (location.hash === "#buy") {
            scrollToTicketShop();
        }
    }, [location.hash]);

    const scrollToTicketShop = () => {
        const ticketShopContainer = ticketShopContainerRef.current;

        if (nextMoonVisitorInfoVisible) {
            hideNextMoonVisitorInfo();
        }

        if (ticketShopContainer) {
            ticketShopContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    const isSmallDisplay = window.outerWidth < 800;

    return (
        <WalletContextProvider>
            <NetworksSidebar />
            <div className="dashboard">
                <Background hideBackgroundEnd banners={true} className="background-height">
                    <Header
                        location={location}
                        wallet={wallet}
                        nextMoonVisitorInfoVisible={nextMoonVisitorInfoVisible}
                        hideNextMoonVisitorInfo={hideNextMoonVisitorInfo}
                        buy={scrollToTicketShop}
                        stickyDisabled={!stickyWalletEnabled}
                    />
                </Background>
                <div className="dashboard__content">
                    <LotteryInfo
                        info={weeklyLotteryInfo}
                        loading={weeklyLotteryInfoLoading}
                        buy={scrollToTicketShop}
                    />
                    <LoteoGames playMOF={() => navigateTo("/moon-of-fortune")}/>
                    <LoteuTokens />
                    <BackgroundTexture />
                    <InviteFriends showInviteFriends={showShare} />
                    <LotteryLoteoUsers />
                </div>
                <Footer />
                {weeklyDrawDialogVisible && weeklyLotteryInfo && !window.disabledDrawVideo && (
                    <>
                        <DrawDialog
                            countdownMillis={weeklyDrawCountdownMillis}
                            showInProgressText={weeklyDrawCountdownMillis === null}
                            showResults={showWeeklyDrawVideo}
                            winner={weeklyLotteryInfo.lastWinner || t(`${TRANSLATE}.unknown`)}
                            prizeETH={weeklyLotteryInfo.lastPrizeETH}
                            onFinish={hideWeeklyDrawDialog}
                        />
                        {!isSmallDisplay && (
                            <DrawVideo
                                winner={weeklyLotteryInfo.lastWinner || t(`${TRANSLATE}.unknown`)}
                                prizeETH={weeklyLotteryInfo.lastPrizeETH}
                                onFinish={weeklyDrawVideoFinished}
                                skippable={weeklyDrawVideoSkippable}
                                visible={weeklyDrawVideoVisible}
                            />
                        )}
                    </>
                )}
                {apolloDailyDrawDialogVisible && apolloDailyLotteryInfo && !window.disabledDrawVideo && (
                    <>
                        <DrawDialog
                            countdownMillis={apolloDailyDrawCountdownMillis}
                            showInProgressText={apolloDailyDrawCountdownMillis === null}
                            showResults={showApolloDailyDrawVideo}
                            winner={apolloDailyLotteryInfo.lastWinner || t(`${TRANSLATE}.unknown`)}
                            prizeETH={apolloDailyLotteryInfo.lastPrizeLoteu}
                            onFinish={hideApolloDailyDrawDialog}
                        />
                        {!isSmallDisplay && (
                            <ApolloDailyDrawVideo
                                winner={apolloDailyLotteryInfo.lastWinner || t(`${TRANSLATE}.unknown`)}
                                prizeLoteu={apolloDailyLotteryInfo.lastPrizeLoteu}
                                onFinish={apolloDailyDrawVideoFinished}
                                visible={apolloDailyDrawVideoVisible}
                            />
                        )}
                    </>
                )}
            </div>
            {(boardingDialog) && (<BoardingDialog showETHDepositDialog={showETHDepositDialog}/>)}
            {ethDepositDialogVisible && wallet && (
                <DepositDialog
                    title={t(`${walletTranslate}.dialog.0.title`)}
                    icon="icons/ethereum.svg"
                    name={t(`${walletTranslate}.dialog.0.name`)}
                    currency={t(`${walletTranslate}.eth`)}
                    balance={getETHString(wallet.ethereum)}
                    address={wallet.ethDepositAddress}
                    qrCode={`ethereum:${wallet.ethDepositAddress}`}
                    note={
                        <>
                            {t(`${walletTranslate}.dialog.0.note`)}&nbsp;
                            <a
                                href={`https://etherscan.io/address/${wallet.ethDepositAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                etherscan.io
                            </a>
                        </>
                    }
                    onClose={hideETHDepositDialog}
                />
            )}
        </WalletContextProvider>
    );
};

export default withAuthorization(Dashboard);
