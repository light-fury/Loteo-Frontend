import React, {createContext} from "react";

interface <%= contextName %>Type {
}

const <%= contextName %> = createContext<<%= contextName %>Type>({
});
export default <%= contextName %>;

type Props = {
    children: React.ReactNode;
}

export const <%= contextName %>Provider = ({children}: Props) => {
    const value = {};

    return (
        <<%= contextName %>.Provider value={value}>
            {children}
        </<%= contextName %>.Provider>
    );
};
