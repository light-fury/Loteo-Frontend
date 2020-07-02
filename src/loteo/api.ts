import {callApi, callGAApi, CancelablePromise} from "common/api";
import {PaymentInfo, TicketCart, CoinPaymentInfo} from "loteo/types";

export const getWallet = () => callApi("/wallet");

export const getNews = () => callApi("/news");

export const subscribeToNews = (emailAddress: string) => callApi("/news/subscribe", "POST", {emailAddress});

export const getWeeklyLotteryInfo = () => callApi("/lottery/weekly");

export const getConversionRates = () => callApi("/conversion-rates");

export const getLastWinners = () => callApi("/lottery/winners");

export const getPaymentInfo = (cart: TicketCart): CancelablePromise<PaymentInfo> =>
    callApi("/payment-info", "POST", cart);

export const payWithEthereum = (cart: TicketCart): CancelablePromise<PaymentInfo> =>
    callApi("/payment-eth", "POST", cart);

export const payFromWallet = (cart: TicketCart, method: String): CancelablePromise<PaymentInfo> =>
    callApi("/payment/buy?method=" + method, "POST", cart);

export const getCoinPaymentsAddress = (cart: TicketCart): CancelablePromise<CoinPaymentInfo> =>
    callApi("/payment-coin-payments", "POST", cart);

export const withdrawEthereum = (address: string, amount: number) =>
    callApi("/wallet/withdraw-eth", "POST", {
        address,
        amount
    });

export const withdrawLoteu = (address: string, amount: number) =>
    callApi("/wallet/withdraw-loteu", "POST", {
        address,
        amount
    });

export const withdrawBitcoin = (address: string, amount: number) =>
    callApi("/wallet/withdraw-btc", "POST", {
        address,
        amount
    });

export const readCoinbackNotification = () => callApi("/wallet/read-coinback", "POST", {});

export const getLotteryChance = (tickets: number, loteu: number) =>
    callApi("/lottery/chance", "POST", {
        tickets,
        loteu
    });

export const enterWeeklyLottery = (tickets: number, loteu: number) =>
    callApi("/lottery/enter", "POST", {
        tickets,
        loteu
    });

export const getMyAffiliate = () => callApi("/affiliate");

export const getMOFSettings = () => callApi("/mof/settings");

export const depositToGameWallet = (amount: number) => callApi("/game-wallet/deposit", "POST", {amount});
export const withdrawFromGameWallet = (amount: number) => callApi("/game-wallet/withdraw", "POST", {amount});
export const getGameWalletBalance = () => callApi("/game-wallet/balance");

export const playMOF = (betAmount: number, risk: string, segmentsAmount: string) =>
    callApi("/mof/play", "POST", {betAmount, risk, segmentsAmount});

export const shareMOF = (network: string) => callApi("/mof/share", "POST", {network});

export const getMyBets = (filter: string) => callApi("/mof/mybets", "POST", {filter});

export const getMofStats = (filter: string) => callApi("/mof/stats", "POST", {filter});

// export const getLeaderboardStats = (filter: string) => callApi("/leaderboard", "POST", {filter});

export const getLeaderboardWeeklyStats = (weeksBefore: number) => callApi("/leaderboard/week?weeksBefore=" + weeksBefore);

export const getTotalStats = () => callApi("/leaderboard/total-stats");

export const getLeaderboardStats = (filter: string) => callApi("/leaderboard", "POST", {filter});

export const getApolloDailyLotteryInfo = () => callApi("/lottery/daily");

export const enterApolloDailyLottery = (loteu: number) =>
    callApi("/lottery/daily/enter", "POST", {
        tickets: 0,
        loteu
    });

export const getMOF24HVolume = () => callApi("/mof/dailyVolume");

export const getBonusStatus = () => callApi("/user/bonus");

export const getStatisticsUser = async (category) => {
    const users = await callApi(`/statistics/user?filter=${category}`);
    const gaData = await callGAApi(category);
    
    if(gaData && gaData["bounces"]) {
        users["bounces"] = gaData["bounces"];
    }
    
    return users;
};

export const getStatisticsProduct = (category) => callApi(`/statistics/product?filter=${category}`);

export const getStatisticsLotteryTarget = (category) => callApi(`/statistics/lottery-target?filter=${category}`);

export const getStatisticsAffiliateSpace = (category) => callApi(`/statistics/affiliate-space?filter=${category}`);

export const getStatisticsAffiliateCharity = (category) => callApi(`/statistics/affiliate-charity?filter=${category}`);

export const getStatisticsLoteu = () => callApi("/statistics/loteu");

export const getTwitterUsers = () => {
    fetch('https://cors-anywhere.herokuapp.com/https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=loteomission')
        .then(function(response) {
            if (response.statusText === "OK") {
                console.log(response)
                return response["followers_count"];
            }
            return null;
        })
}

export const getStatisticsWebVistors = async (category) => {
    const data = await callGAApi(category);
    return data;
}