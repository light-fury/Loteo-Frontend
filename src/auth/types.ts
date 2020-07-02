export interface State {
    user: User | null;
    userLoading: boolean;
}

export interface StoreState {
    auth: State;
}

export interface User {
    affiliateStatus: string;
    avatar: string;
    country: string;
    email: string;
    id: string;
    premiumTickets: number | null;
    referralCode: string;
    telegramUsername: string | null;
    upline: string | null;
    useMFA: boolean;
    username: string;
    vipStatus: string | null;
    vipStatuses: VIPStatus[];
    whitelisted: boolean;
    spaceProgramSoldTickets: number;
    spaceProgramLevels: number[];
}

export interface VIPStatus {
    level: number;
    lotesBonus: number | null;
    name: string;
    tickets: number;
}
