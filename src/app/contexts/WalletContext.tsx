import React, {createContext} from "react";
import {useBooleanState} from "hooks";

interface WalletContextType {
    walletOpened: boolean;
    openWallet: () => void;
    closeWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
    walletOpened: false,
    openWallet: () => {},
    closeWallet: () => {}
});

type Props = {
    children: React.ReactNode;
};

export const WalletContextProvider = ({children}: Props) => {
    const [walletOpened, openWallet, closeWallet] = useBooleanState();
    return <WalletContext.Provider value={{walletOpened, openWallet, closeWallet}}>{children}</WalletContext.Provider>;
};

export default WalletContext;
