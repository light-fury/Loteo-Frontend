import Web3 from "web3";

// abis
import weeklyLotteryContractABI from "./contracts/weeklyLotteryABI.json";
import dailyLotteryContractABI from "./contracts/dailyLotteryABI.json";

// web3 initialization
const web3 = new Web3(process.env.WEB3_PROVIDER_URL as string);

// contracts
const WeeklyLotteryContract = new web3.eth.Contract(
    // @ts-ignore
    weeklyLotteryContractABI,
    process.env.WEEKLY_LOTTERY_CONTRACT_ADDRESS
);
// @ts-ignore
const DailyLotteryContract = new web3.eth.Contract(dailyLotteryContractABI, process.env.DAILY_LOTTERY_CONTRACT_ADDRESS);

// events
const WEEKLY_LOTTERY_RESOLVED = "weekly-lottery-resolved";
const DAILY_LOTTERY_RESOLVED = "daily-lottery-resolved";
type GameResolvedListener = () => void;

const listenToGameResolved = () => {
    WeeklyLotteryContract.events.GameResolved({}, () => {
        window.dispatchEvent(new CustomEvent(WEEKLY_LOTTERY_RESOLVED));
    });
    DailyLotteryContract.events.GameResolved({}, () => {
        window.dispatchEvent(new CustomEvent(DAILY_LOTTERY_RESOLVED));
    });
};

export const addWeeklyLotteryResolvedListener = (listener: GameResolvedListener) => {
    window.addEventListener(WEEKLY_LOTTERY_RESOLVED, listener);
    window.logger.debug("Weekly Lottery GameResolved listener added");
};

export const removeWeeklyLotteryResolvedListener = (listener: GameResolvedListener) => {
    window.removeEventListener(WEEKLY_LOTTERY_RESOLVED, listener);
    window.logger.debug("Weekly Lottery GameResolved removed");
};

export const addDailyLotteryResolvedListener = (listener: GameResolvedListener) => {
    window.addEventListener(DAILY_LOTTERY_RESOLVED, listener);
    window.logger.debug("Daily Lottery GameResolved listener added");
};

export const removeDailyLotteryResolvedListener = (listener: GameResolvedListener) => {
    window.removeEventListener(DAILY_LOTTERY_RESOLVED, listener);
    window.logger.debug("Daily Lottery GameResolved removed");
};

// initialization
listenToGameResolved();
