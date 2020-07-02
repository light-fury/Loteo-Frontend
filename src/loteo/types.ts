import {User} from "auth/types";
import { string } from "prop-types";
import { isEmailValid } from "common/utils";

export interface State {
    news: string[] | null;
    newsLoading: boolean;
    weeklyLotteryInfo: WeeklyLotteryInfo | null;
    weeklyLotteryInfoLoading: boolean;
    apolloDailyLotteryInfo: ApolloDailyLotteryInfo | null;
    apolloDailyLotteryInfoLoading: boolean;
    conversionRates: ConversionRates | null;
    lastWinners: Winner[] | null;
    totalStats: TotalStats | null;
    lastWinnersLoading: boolean;
    wallet: Wallet | null;
    walletLoading: boolean;
    myAffiliate: MyAffiliate | null;
    myAffiliateLoading: boolean;
    MOFSettings: MOFWheel[] | null;
    MOF24HVolume: MofDailyVolume | null;
    MOFSettingsLoading: boolean;
    weeklyLeaderboardStats: LeaderboardWeeklyStats[] | null;
    statisticsUsers: StatisticsUsers | null;
    statisticsWebVistors: StatisticsWebVistors | null;
    statisticsProduct: StatisticsProduct | null;
    statisticsLotteryTarget: StatisticsLotteryTarget | null;
    statisticsAffiliateSpace: StatisticsAffiliateSpace[] | null;
    statisticsAffiliateCharity: StatisticsAffiliateCharity | null;
    statisticsLoteu: StatisticsLoteu | null;
}

export interface StoreState {
    loteo: State;
}

export interface LoteoPass {
    remaining: number;
    total: number;
    validUntil: Date;
}

export interface Wallet {
    weeklyLotteryTickets: number;
    weeklyLotteryTicketsInGame: number;
    apollo11LotteryTicketsInGame: number;
    loteoPasses: LoteoPass[];
    loteoPassesInGame: number;
    ethereum: number;
    loteu: number;
    lotes: number;
    bitcoin: number;
    ethDepositAddress: string;
    btcDepositAddress: string;
    transactions: Transaction[];
    coinbackTransferred: number;
    ticketsUsedInCoinback: number;
    lotesProfit: LotesProfit;
}

export interface LotesProfit {
    eth: number;
    nextPayoutEth: number;
    loteu: number;
    nextPayoutLoteu: number;
}

export interface WeeklyLotteryInfo {
    gameIndex: number;
    startsAt: Date;
    prizeEUR: number;
    prizeBTC: number;
    prizeETH: number;
    chanceToWin: number;
    lastWinner: string | null;
    lastPrizeETH: number;
    totalTickets: number;
    remainingTickets: number;
    contractAddress: string;
    userInfo: User | null;
}

export interface WeeklyLotteryBonus {
    title?: string;
    href?: string;
    description?: string;
}

export interface ConversionRates {
    eth: number;
    btc: number;
    loteu: number;
    loteuBuy: number;
    loteuBtc: number;
    loteuEth: number;
    loteuUsdt: number;
    weeklyTicketPrice: number;
    loteoMaxx10Price: number;
    loteoMaxx20Price: number;
    loteoMaxx50Price: number;
    loteoMaxx100Price: number;
    loteoPassPrice: number;
}

export interface Winner {
    username: string;
    lottery: string;
    prize: string;
    etherscanURL: string;
}

export interface TicketCart {
    tickets?: number;
    loteoPass?: number;
    loteoMaxx10?: number;
    loteoMaxx20?: number;
    loteoMaxx50?: number;
    loteoMaxx100?: number;
    loteu?: number;
}

export interface PaymentInfo {
    totalEUR: number;
    totalETH: number;
    totalBTC: number;
}

export interface CoinPaymentInfo {
    address: string;
    amountToPay: string;
    qrCode: string;
}

export enum TransactionState {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export enum TabList {
    Apollo = 0,
    Weekly = 1,
    Daily = 2,
    Rekt = 3,
    MoF = 4,
    Fomo = 5,
    Jacks = 6,
    Dice = 7
}

export const StatisticsFilter = [
    { name: "daily", key: 0 },
    { name: "weekly", key: 1 },
    { name: "monthly", key: 2 },
    { name: "total", key: 3 }
]

export interface Transaction {
    state: TransactionState;
    hash: string;
    network: string;
}

export interface MyAffiliate {
    stats: MyAffiliateStatistics;
    spaceProgramStats: MyAffiliateSpaceProgramStats;
    partners: MyAffiliatePartner[];
}

export interface MyAffiliateSpaceProgramStats {
    levelData: MyAffiliateSpaceProgramStatsLevel[];
    paidOutLastMonth: number;
    paidOutTotal: number;
}

export interface MyAffiliateSpaceProgramStatsLevel {
    eth: number;
    ethPerUser: number;
    level: number;
    ticketCount: number;
    usersCount: number;
}

export interface MyAffiliateStatistics {
    totalUsers: number;
    activeUsers: number;
    thisWeekPlayUsers: number;
    totalTickets: number;
    thisWeekUsedTickets: number;
    spaceProgramSoldTickets: number;
    spaceProgramLevels: number[];
    downlinesUsers: number;
    profit: MyAffiliateStatisticsProfit;
}

export interface MyAffiliateStatisticsProfit {
    eth: number;
    nextPayoutEth: number;
    loteu: number;
}

export interface MyAffiliatePartner {
    nickname: string;
    country: string;
    partners: MyAffiliateSubpartner[];
    spaceProgram: number;
    thisWeekUsed: number;
    totalTickets: number;
    totalEth: number;
}

export interface MyAffiliateSubpartner {
    nickname: string;
    country: string;
    partnersCount: number;
    spaceProgram: number;
    thisWeekUsed: number;
    totalTickets: number;
    totalEth: number;
}

export interface MOFWheel {
    riskLevelName: string;
    segments: string[];
    segmentsAmount: string;
}

export interface MOFStat {
    id: number;
    userName: string;
    totalBets: number;
}

export interface Spin {
    id: number;
    created: string;

    betAmount: number;
    multiplier: number;
    balanceAfter: number;
    userName: string;
    level: string;
}

export interface LeaderboardStats {
    type: string;
    users: number;
    totalAmount: number;
    winner: User;
    prize: number;
    userName: string;
}

export interface LeaderboardItemWeeklyStats {
    type: string;
    users: number;
    totalAmount: number;
    winner: User;
    prize: number;
}

export interface LeaderboardWeeklyStats {
    lotteries: LeaderboardItemWeeklyStats[];
    games: LeaderboardItemWeeklyStats[];
    totalWeeks: number;
}

export interface TotalStats {
    totalBets: number;
    totalDividendsETH: number;
    totalDividendsLoteu: number;
    totalPrizeETH: number;
    totalPrizeLoteu: number;
}

export interface ApolloDailyLotteryInfo {
    gameIndex: number;
    startsAt: Date;
    chanceToWin: number;
    lastPrizeLoteu: number;
    lastWinner: string;
    prizeLoteu: number;
    prizeETH: number;
    prizeBTC: number;
    inGame: boolean;
    contractAddress: string;
    userInfo: User | null;
}

export interface MofDailyVolume {
    profit: number | null;
    volume: number | null;
}

export interface LotteryStatusInfo {
    title: string;
    subTitle: string | "";
    value: string;
    isSmall?;
}

export interface BonusStatus {
    firstDeposit: boolean;
    firstTicket: boolean;
}

export interface LoteoSales {
    username: string;
    email: string;
    validUntil: string;
}

export interface StatisticsUserRegion {
    activeUsers: number | null;
    country: string | null;
    registeredUsers: number | null;
}

export interface StatisticsUsers {
    activeUsers: number | null;
    affiliateLoteo: number | null;
    affiliatePartners: number | null;
    registeredUsers: number | null;
    bounces: number | null;
    regionInfo: StatisticsUserRegion[] | null;
}

export interface StatisticsWebVistors {
    bounces: number | null;
    organic: number | null;
    webVistors: number | null;
    uniqueVistors: number | null;
    referral: number | null;
    direct: number | null;
}

export interface ProductTicket {
    username: string;
    email: string;
    created: string;
    amount: number;
    type: string;
}

export interface MoFVolumeDeatil {
    username: string;
    email: string;
    created: string;
    betAmount: number;
    multiplier: number;
}

export interface StatisticsProduct {
    dailyTicketsSales: ProductTicket[] | null;
    dailyTicketsSalesCount: number | null;
    loteoMaxx10Sales: ProductTicket[] | null;
    loteoMaxx10SalesCount: number | null;
    loteoMaxx20Sales: ProductTicket[] | null;
    loteoMaxx20SalesCount: number | null;
    loteoMaxx50Sales: ProductTicket[] | null;
    loteoMaxx50SalesCount: number | null;
    loteoMaxx100Sales: ProductTicket[] | null;
    loteoMaxx100SalesCount: number | null;
    loteoMaxxTotalSales: number | null;
    loteoPassSales: LoteoSales[];
    loteuSalesCount: number | null;
    loteuSales: ProductTicket[] | null;
    mofProfit: number | null;
    mofVolume: number | null;
    spinDetails: MoFVolumeDeatil[] | null;
    weeklyTicketsSales: ProductTicket[] | null;
    weeklyTicketsSalesCount: number | null;
}

export interface StatisticsLotteryTarget {
    apollo11LotteryPrize: number;
    apollo11LotteryTarget: number;
    lotesProfitEth: number;
    lotesProfitLoteu: number;
    weeklyLotteryPrize: number;
    weeklyLotteryTarget: number;
}

export interface StatisticsAffiliateSpace {
    percentage: number;
    rewardEth: number;
}

export interface StatisticsAffiliateCharity {
    affiliateProfit: number;
    charityProfit: number;
}

export interface StatisticsLoteu {
    circulatingSupply: number;
    nextBurning: number;
    totalBurned: number;
    usedLoteu: number;
    totalSupply: number;
}