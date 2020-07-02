import React, {useState, useEffect, useContext} from "react";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

import {withAuthorization} from "auth/hoc";
import {playMOF, shareMOF, getMofStats, getMyBets} from "loteo/api";
import {loadWallet, loadMOFSettings} from "loteo/actions";
import {loadUser} from "auth/actions";
import {getWallet, getMOFSettings} from "loteo/selectors";
import {getUser} from "auth/selectors";
import {useReduxLoad, useReduxActions, useNumberInputState, useBooleanState, useDidUpdateEffect} from "hooks";
import {Wallet, TransactionState, MOFWheel, MOFStat, Spin} from "loteo/types";
import {MessageContext, NavigationContext} from "app/contexts";
import {MESSAGE_WALLET_HAS_PENDING_TRANSACTION} from "loteo/constants";
import {User} from "auth/types";
import {Background, Header, Footer, GameWallet} from "loteo/components";
import {Grid, Button, ButtonStyle} from "ui/components";

import {Controls, Wheel, ShareDialog, Leaderboard, MyBets} from "./components";

import "./moonOfFortune.scss";

const segmentColors = {
    "0.0": "#410500",
    "1.1": "#E43317",
    "1.2": "#E46317",
    "1.5": "#E67C70",
    "1.6": "#E46317",
    "1.7": "#E46317",
    "1.8": "#E46317",
    "1.9": "#E46317",
    "2.0": "#DA2814",
    "3.0": "#FECF0F",
    "4.0": "#00C9AE",
    "5.0": "#148CDA",
    "9.9": "#FECF0F",
    "19.8": "#FECF0F",
    "29.7": "#FECF0F",
    "39.6": "#FECF0F",
    "49.5": "#FECF0F",
    "9.7": "#FECF0F",
    "19.4": "#FECF0F",
    "29.1": "#FECF0F",
    "38.8": "#FECF0F",
    "48.5": "#FECF0F"
};

enum TimeFilter {
    Weekly = "weekly",
    Monthly = "monthly",
    AllTime = "allTime"
}

const MoonOfFortune = () => {
    const {t} = useTranslation();

    const [wallet, user, settings]: [Wallet | null, User | null, MOFWheel[] | null] = useReduxLoad(
        [loadWallet(), loadUser(), loadMOFSettings()],
        [getWallet, getUser, getMOFSettings]
    );
    const [refreshWallet] = useReduxActions([loadWallet]);
    const {navigateTo} = useContext(NavigationContext);
    const {showError} = useContext(MessageContext);
    const [betAmount, setBetAmount, setBetAmountDirectly] = useNumberInputState(0);
    const [risk, setRisk] = useState<string>("Medium");
    const [segmentsAmount, setSegmentsAmount] = useState<string>("30");
    const [availableSegments, setAvailableSegments] = useState<object>({});
    const [segments, setSegments] = useState<string[]>([]);
    const [result, setResult] = useState<number>(-1);
    const [started, setStarted, setFinished] = useBooleanState(false);
    const [winVisible, showWin, hideWin] = useBooleanState(false);
    const pendingTransactions =
        (wallet && wallet.transactions.filter(tx => tx.state === TransactionState.PENDING)) || [];
    const hasPendingTransactions = pendingTransactions.length > 0;
    const [walletAmount, setWalletAmount] = useState(-1);
    const [shareMofVisible, showShareMof, hideShareMof] = useBooleanState(false);
    const [leaderboardSelected, showLeaderboard, showMyBet] = useBooleanState(true);
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.AllTime);
    const [myBets, setMyBets] = useState<Spin[]>([]);
    const [mofStats, setMofStats] = useState<MOFStat[]>([]);

    const SPIN_TIME = 10000;
    const WIN_TIME = 2000;

    useEffect(() => {
        if (settings) {
            const selectedWheel = settings.find(o => o.riskLevelName === risk && o.segmentsAmount === segmentsAmount);

            if (selectedWheel) {
                setSegments(selectedWheel.segments);
            }
        }
    }, [settings, risk, segmentsAmount]);

    useEffect(() => {
        getMyBets(timeFilter.toString()).then(bets => {
            if (started && result !== -1) {
                bets.shift();
            }
            setMyBets(bets);
        });
        getMofStats(timeFilter.toString()).then(stats => setMofStats(stats));
    }, [started, timeFilter]);

    useDidUpdateEffect(() => {
        const availableValues = [...new Set(segments)];
        const formatted = {};

        availableValues.forEach(item => (formatted[item] = segmentColors[item]));
        setAvailableSegments(formatted);
    }, [segments]);

    const handleGameStart = () => {
        if (hasPendingTransactions) {
            showError(MESSAGE_WALLET_HAS_PENDING_TRANSACTION);
        } else {
            setStarted();
            playMOF(betAmount, risk, segmentsAmount)
                .then(response => {
                    setResult(response.winningIndex);
                    setTimeout(() => {
                        showWin();
                        setTimeout(() => {
                            hideWin();
                            setFinished();
                            setResult(-1);
                        }, WIN_TIME);
                    }, SPIN_TIME);
                })
                .catch(error => {
                    console.error(error);
                    setFinished();
                    setResult(-1);
                });
        }
    };

    return (
        <div className="mof">
            <Helmet>
                <meta property="og:title" content="LOTEO - Moon of Fortune" data-react-helmet="true" />
                <meta
                    property="og:description"
                    content="LOTEO - Play the game Moon of Fortune and win Loteu tokens."
                    data-react-helmet="true"
                />
                <meta
                    property="og:image"
                    content="https://www.playloteo.com/images/mof/share.png"
                    data-react-helmet="true"
                />
                <meta property="twitter:title" content="LOTEO - Moon of Fortune" data-react-helmet="true" />
                <meta
                    property="twitter:description"
                    content="LOTEO - Play the game Moon of Fortune and win Loteu tokens."
                    data-react-helmet="true"
                />
                <meta
                    property="twitter:image"
                    content="https://www.playloteo.com/images/mof/share.png"
                    data-react-helmet="true"
                />
            </Helmet>
            <Background hideBackgroundEnd>
                <Header />
                <Grid justify="space-between" direction="row-reverse" className="mof__header">
                    <Grid align="center" justify="center" className="mof__header__wallet" noWidth>
                        <span className="mof__header__wallet__title">{t("gameWallet.myBalance")}</span>
                        <GameWallet
                            wallet={wallet}
                            refreshWallet={refreshWallet}
                            walletAmount={walletAmount}
                            setWalletAmount={setWalletAmount}
                            winVisible={winVisible}
                        />
                        <img
                            className="mof__header__wallet__close"
                            src="icons/close.svg"
                            alt="close"
                            onClick={showShareMof}
                        />
                    </Grid>
                </Grid>
                <div className="mof__inner">
                    <Grid className="mof__inner__game">
                        <Controls
                            betAmount={betAmount}
                            setBetAmount={setBetAmount}
                            setBetAmountDirectly={setBetAmountDirectly}
                            maxBet={walletAmount}
                            risk={risk}
                            onRiskChange={setRisk}
                            segmentsAmount={segmentsAmount}
                            onSegmentsAmountChange={setSegmentsAmount}
                            onStartClicked={handleGameStart}
                            gameStarted={started}
                        />
                        <Wheel
                            segments={segments}
                            availableSegments={availableSegments}
                            gameStarted={started}
                            result={result}
                            spinTime={SPIN_TIME}
                            winVisible={winVisible}
                        />
                    </Grid>
                </div>
                <div className="mof__inner">
                    <div className="mof__inner__board__header">
                        <div className="mof__inner__board__header__type">
                            <Button
                                text={t("board.leaderboard")}
                                style={ButtonStyle.None}
                                className={`mof__inner__board__header__type__button ${
                                    leaderboardSelected ? "active" : ""
                                }`}
                                onClick={showLeaderboard}
                            />
                            <Button
                                text={t("board.myBets")}
                                style={ButtonStyle.None}
                                className={`mof__inner__board__header__type__button ${
                                    !leaderboardSelected ? "active" : ""
                                }`}
                                onClick={showMyBet}
                            />
                        </div>
                        <div className="mof__inner__board__header__filter">
                            <Button
                                text={t("board.weekly")}
                                style={ButtonStyle.None}
                                className={`mof__inner__board__header__filter__button ${
                                    timeFilter == TimeFilter.Weekly ? "active" : ""
                                }`}
                                onClick={() => setTimeFilter(TimeFilter.Weekly)}
                            />
                            <Button
                                text={t("board.monthly")}
                                style={ButtonStyle.None}
                                className={`mof__inner__board__header__filter__button ${
                                    timeFilter == TimeFilter.Monthly ? "active" : ""
                                }`}
                                onClick={() => setTimeFilter(TimeFilter.Monthly)}
                            />
                            <Button
                                text={t("board.allTime")}
                                style={ButtonStyle.None}
                                className={`mof__inner__board__header__filter__button ${
                                    timeFilter == TimeFilter.AllTime ? "active" : ""
                                }`}
                                onClick={() => setTimeFilter(TimeFilter.AllTime)}
                            />
                        </div>
                    </div>
                    {leaderboardSelected && <Leaderboard stats={mofStats} user={user} />}
                    {!leaderboardSelected && <MyBets bets={myBets} />}
                </div>
                {shareMofVisible && (
                    <ShareDialog
                        onClose={hideShareMof}
                        onQuit={() => navigateTo("/dashboard")}
                        onShareFacebook={() => shareMOF("facebook")}
                        onShareTwitter={() => shareMOF("twitter")}
                    />
                )}
            </Background>
            <Footer />
        </div>
    );
};

export default withAuthorization(MoonOfFortune);
