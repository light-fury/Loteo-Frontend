import * as types from "loteo/actionTypes";

import {State} from "loteo/types";

export const initialState = {
    weeklyLotteryInfo: null,
    weeklyLotteryInfoLoading: false,
    apolloDailyLotteryInfo: null,
    apolloDailyLotteryInfoLoading: false,
    conversionRates: null,
    lastWinners: null,
    lastWinnersLoading: false,
    totalStats: null,
    statisticsUsers: null,
    statisticsWebVistors: null,
    statisticsProduct: null,
    statisticsLotteryTarget: null,
    statisticsAffiliateSpace: null,
    statisticsAffiliateCharity: null,
    statisticsLoteu: null,
    weeklyLeaderboardStats: null,
};

export default (state: State, action: any): State => {
    const updateState = newValues => ({
        ...state,
        ...newValues
    });

    switch (action.type) {
        case types.LOAD_WEEKLY_LOTTERY_INFO:
            return updateState({
                weeklyLotteryInfoLoading: true
            });

        case types.SET_WEEKLY_LOTTERY_INFO:
            return updateState({
                weeklyLotteryInfoLoading: false,
                weeklyLotteryInfo: action.info
            });

        case types.LOAD_APOLLO_DAILY_LOTTERY_INFO:
            return updateState({
                apolloDailyLotteryInfoLoading: true
            });

        case types.SET_APOLLO_DAILY_LOTTERY_INFO:
            return updateState({
                apolloDailyLotteryInfoLoading: false,
                apolloDailyLotteryInfo: action.info
            });

        case types.SET_CONVERSION_RATES:
            return updateState({
                conversionRates: action.rates
            });

        case types.LOAD_LAST_WINNERS:
            return updateState({
                lastWinnersLoading: true
            });

        case types.SET_LAST_WINNERS:
            return updateState({
                lastWinnersLoading: false,
                lastWinners: action.winners
            });
            
        case types.SET_TOTAL_STATS:
            return updateState({
                totalStats: action.totalStats
            });
        
        case types.SET_WEEKLY_LEADERBOARD:
            return updateState({
                weeklyLeaderboardStats: action.weeklyLeaderboardStats
            });
        
        case types.ADD_WEEKLY_LEADERBOARD:
            return updateState({
                weeklyLeaderboardStats: state.weeklyLeaderboardStats !== null ? [...state.weeklyLeaderboardStats, action.weeklyLeaderboardStats] : [action.weeklyLeaderboardStats]
            });
        
        case types.LOAD_STATISTICS_USER:
            return updateState({
                statisticsUsers: action.statisticsUsers
            });
        
        case types.LOAD_STATISTICS_WEBVISITOR:
                return updateState({
                    statisticsWebVistors: action.statisticsWebVistors
                });
        
        case types.LOAD_STATISTICS_PRODUCT:
            return updateState({
                statisticsProduct: action.statisticsProduct
            });

        case types.LOAD_STATISTICS_LOTTERY_TARGET:
            return updateState({
                statisticsLotteryTarget: action.statisticsLotteryTarget
            });

        case types.LOAD_STATISTICS_AFFILIATE_SPACE:
                return updateState({
                    statisticsAffiliateSpace: action.statisticsAffiliateSpace
                });

        case types.LOAD_STATISTICS_AFFILIATE_CHARITY:
            return updateState({
                statisticsAffiliateCharity: action.statisticsAffiliateCharitye
            });

        case types.LOAD_STATISTICS_LOTEU:
            return updateState({
                statisticsLoteu: action.statisticsStatisticsLoteu
            });
        
        default:
            return state;
    }
};
