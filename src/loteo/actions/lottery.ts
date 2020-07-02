import {Dispatch} from "redux";

import * as types from "loteo/actionTypes";

import {WeeklyLotteryInfo, ApolloDailyLotteryInfo, LeaderboardWeeklyStats} from "loteo/types";
import {
    getConversionRates,
    getLastWinners,
    getWeeklyLotteryInfo,
    getApolloDailyLotteryInfo,
    getTotalStats,
    getStatisticsUser,
    getStatisticsWebVistors,
    getStatisticsProduct,
    getStatisticsAffiliateSpace,
    getStatisticsAffiliateCharity,
    getStatisticsLotteryTarget,
    getStatisticsLoteu,
    getLeaderboardWeeklyStats
} from "loteo/api";
import {handleError} from "app/actions";
import {delay, getRandomRange} from "common/utils";

const NO_WINNER_STRING = "0x0000000000000000000000000000000000000000";

const toLotteryWeeklyInfo = (response: any): WeeklyLotteryInfo => ({
    ...response,
    startsAt: new Date(response.startsAt),
    lastWinner: response.lastWinner === NO_WINNER_STRING ? "" : response.lastWinner
});

const toApolloDailyInfo = (response: any): ApolloDailyLotteryInfo => ({
    ...response,
    startsAt: response.startsAt ? new Date(response.startsAt) : null,
    lastWinner: response.lastWinner === NO_WINNER_STRING ? "" : response.lastWinner
});

export const loadWeeklyLotteryInfo = (ensureGameIndex?: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.LOAD_WEEKLY_LOTTERY_INFO
    });

    try {
        let response = await getWeeklyLotteryInfo();

        let retryCount = 3;
        while (ensureGameIndex !== undefined && response.gameIndex !== ensureGameIndex && retryCount-- > 0) {
            window.logger.debug("WeeklyLottery responded with old game => retrying", response);
            await delay(getRandomRange(3000, 5000)); // delay between 3-5s to distribute load
            response = await getWeeklyLotteryInfo();
        }

        dispatch({
            type: types.SET_WEEKLY_LOTTERY_INFO,
            info: toLotteryWeeklyInfo(response)
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadApolloDailyLotteryInfo = (ensureGameIndex?: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.LOAD_APOLLO_DAILY_LOTTERY_INFO
    });

    try {
        let response = await getApolloDailyLotteryInfo();

        let retryCount = 3;
        while (ensureGameIndex !== undefined && response.gameIndex !== ensureGameIndex && retryCount-- > 0) {
            window.logger.debug("ApolloDailyLottery responded with old game => retrying", response);
            await delay(getRandomRange(3000, 5000)); // delay between 3-5s to distribute load
            response = await getApolloDailyLotteryInfo();
        }

        dispatch({
            type: types.SET_APOLLO_DAILY_LOTTERY_INFO,
            info: toApolloDailyInfo(response)
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadConversionRates = () => async (dispatch: Dispatch) => {
    try {
        const rates = await getConversionRates();

        dispatch({
            type: types.SET_CONVERSION_RATES,
            rates
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadLastWinners = () => async (dispatch: Dispatch) => {
    dispatch({
        type: types.LOAD_LAST_WINNERS
    });

    try {
        const winners = await getLastWinners();

        dispatch({
            type: types.SET_LAST_WINNERS,
            winners
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadLeaderboardWeeklyStats = () => async (dispatch: Dispatch) => {
    dispatch({
        type: types.LOAD_WEEKLY_LEADERBOARD
    });

    try {
        var weeksBefore = 0;
        var totalWeeks = 1;
        do {
            const weeklyStats: LeaderboardWeeklyStats = await getLeaderboardWeeklyStats(weeksBefore);
            totalWeeks = weeklyStats.totalWeeks;
            if (weeksBefore === 0) {
                dispatch({
                    type: types.SET_WEEKLY_LEADERBOARD,
                    weeklyLeaderboardStats: [weeklyStats]
                });
            } else {
                dispatch({
                    type: types.ADD_WEEKLY_LEADERBOARD,
                    weeklyLeaderboardStats: weeklyStats
                });
            }
            weeksBefore += 1;
        } while (weeksBefore < totalWeeks);
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadTotalStats = () => async (dispatch: Dispatch) => {
    try {
        const totalStats = await getTotalStats();
        console.log("totalStats", totalStats)
        dispatch({
            type: types.SET_TOTAL_STATS,
            totalStats
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadStatisticsUsers = (category) => async (dispatch: Dispatch) => {
    try {
        const statisticsUsers = await getStatisticsUser(category);

        dispatch({
            type: types.LOAD_STATISTICS_USER,
            statisticsUsers
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadWebVistors = (category) => async (dispatch: Dispatch) => {
    try {
        const statisticsWebVistors = await getStatisticsWebVistors(category);

        dispatch({
            type: types.LOAD_STATISTICS_WEBVISITOR,
            statisticsWebVistors
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadStatisticsProduct = (category) => async (dispatch: Dispatch) => {
    try {
        const statisticsProduct = await getStatisticsProduct(category);

        dispatch({
            type: types.LOAD_STATISTICS_PRODUCT,
            statisticsProduct
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadStatisticsLotteryTarget = (category) => async (dispatch: Dispatch) => {
    try {
        const statisticsLotteryTarget = await getStatisticsLotteryTarget(category);

        dispatch({
            type: types.LOAD_STATISTICS_LOTTERY_TARGET,
            statisticsLotteryTarget
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadStatisticsAffiliateSpace = (category) => async (dispatch: Dispatch) => {
    try {
        const statisticsAffiliateSpace = await getStatisticsAffiliateSpace(category);

        dispatch({
            type: types.LOAD_STATISTICS_AFFILIATE_SPACE,
            statisticsAffiliateSpace
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadStatisticsAffiliateCharity = (category) => async (dispatch: Dispatch) => {
    try {
        const statisticsAffiliateCharitye = await getStatisticsAffiliateCharity(category);

        dispatch({
            type: types.LOAD_STATISTICS_AFFILIATE_CHARITY,
            statisticsAffiliateCharitye
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadStatisticsLoteu = () => async (dispatch: Dispatch) => {
    try {
        const statisticsStatisticsLoteu = await getStatisticsLoteu();

        dispatch({
            type: types.LOAD_STATISTICS_LOTEU,
            statisticsStatisticsLoteu
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};
