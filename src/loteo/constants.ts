export const NAME = "loteo";

export const TICKET_PRICES = {
    ticket: 10,
    loteoPass: 520,
    loteoMaxx10: 100,
    loteoMaxx20: 200,
    loteoMaxx50: 500,
    loteoMaxx100: 1000
};

export const LAST_GAME_INDEX = "last-game-index";
export const DRAW_VIDEO_COUNTDOWN = 30000; //millis

export const MESSAGE_WALLET_HAS_PENDING_TRANSACTION = {
    title: "Pending transaction",
    text:
        "Your wallet has a transaction in progress. You need to wait until the transaction finishes."
};

export const MESSAGE_TRANSACTION_FAILED = {
    title: "Transaction failed",
    text:
        "Your transaction has failed. Please try again later."
};

export const MESSAGE_PLAY_LOTTERY_FAILED = {
    title: "Failed",
    text:
        "Ticket transaction has failed due to the ethereum blockchain congestion.",
    cancelText: "Try again",
    className: "successTicketDialog"
};

export const WEEKLY_LOTTERY_LOCK_TIME: number = 30 * 60 * 1000; //30 minutes
export const APOLLO11_LOTTERY_LOCK_TIME: number = 30 * 60 * 1000; //30 minutes

export const NETWORKS = [
    {
        href: "https://t.me/loteomission",
        icon: "icons/networks/telegram.svg"
    },
    {
        href: "https://twitter.com/loteomission",
        icon: "icons/networks/twitter.svg"
    },
    {
        href: "https://www.instagram.com/loteomission/",
        icon: "icons/networks/instagram.svg"
    },
    {
        href: "https://www.linkedin.com/company/loteo-net",
        icon: "icons/networks/linkedin.svg"
    },
    {
        href: "https://www.facebook.com/LOTEO-1113157555523564",
        icon: "icons/networks/facebook.svg"
    },
    {
        href: "https://www.reddit.com/r/Loteo/",
        icon: "icons/networks/reddit.svg"
    },
    {
        href: "https://github.com/playloteo",
        icon: "icons/networks/github.svg"
    },
    {
        href: "https://www.youtube.com/channel/UCveQW_4wrc-ZYCo0sac6exQ",
        icon: "icons/networks/youtube.svg"
    },
    {
        href: "https://bitcointalk.org/index.php?topic=5116114",
        icon: "icons/networks/btc.svg"
    }
];