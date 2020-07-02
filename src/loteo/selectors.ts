import {StoreState} from "loteo/types";

export const getNews = (state: StoreState) => state.loteo.news;

export const getNewsLoading = (state: StoreState) => state.loteo.newsLoading;

export const getWeeklyLotteryInfo = (state: StoreState) => state.loteo.weeklyLotteryInfo;

export const getWeeklyLotteryInfoLoading = (state: StoreState) => state.loteo.weeklyLotteryInfoLoading;

export const getConversionRates = (state: StoreState) => state.loteo.conversionRates;

export const getLastWinners = (state: StoreState) => state.loteo.lastWinners;

export const getTotalStats = (state: StoreState) => state.loteo.totalStats;

export const getLastWinnersLoading = (state: StoreState) => state.loteo.lastWinnersLoading;

export const getLeaderboardWeeklyStats = (state: StoreState) => state.loteo.weeklyLeaderboardStats;

export const getWallet = (state: StoreState) => state.loteo.wallet;

export const getWalletLoading = (state: StoreState) => state.loteo.walletLoading;

export const getMyAffiliate = (state: StoreState) => state.loteo.myAffiliate;

export const getMyAffiliateLoading = (state: StoreState) => state.loteo.myAffiliateLoading;

export const getMOFSettings = (state: StoreState) => state.loteo.MOFSettings;

export const getMOF24HVolume = (state: StoreState) => state.loteo.MOF24HVolume;

export const getApolloDailyLotteryInfo = (state: StoreState) => state.loteo.apolloDailyLotteryInfo;

export const getApolloDailyLotteryInfoLoading = (state: StoreState) => state.loteo.apolloDailyLotteryInfoLoading;

export const getStatisticsUsers = (state: StoreState) => state.loteo.statisticsUsers;

export const getStatisticsWebVistors = (state: StoreState) => state.loteo.statisticsWebVistors;

export const getStatisticsProduct = (state: StoreState) => state.loteo.statisticsProduct;

export const getStatisticsLotteryTarget = (state: StoreState) => state.loteo.statisticsLotteryTarget;

export const getStatisticsAffiliateSpace = (state: StoreState) => state.loteo.statisticsAffiliateSpace;

export const getStatisticsAffiliateCharity = (state: StoreState) => state.loteo.statisticsAffiliateCharity;

export const getStatisticsLoteu = (state: StoreState) => state.loteo.statisticsLoteu;


