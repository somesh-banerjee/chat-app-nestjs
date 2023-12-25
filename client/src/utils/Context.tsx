import { createContext, useContext, useState } from "react";
import { Socket } from "socket.io-client";

interface User {
    id: string;
    username: string;
    email: string;
}

interface Token {
    accessToken: string;
    refreshToken: string;
}

interface GlobalState {
    user?: User;
    tokens?: Token;
    socket?: Socket
}

const initialState: GlobalState = {
    user: undefined,
    tokens: undefined,
    socket: undefined,
};

const GlobalStateContext = createContext<
    GlobalState & { updateGlobalState: (newState: Partial<GlobalState>) => void }
>({
    ...initialState,
    updateGlobalState: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalStateContext = () => useContext(GlobalStateContext);

export const GlobalStateProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [state, setState] = useState<GlobalState>(initialState);

    const updateGlobalState = (newState: Partial<GlobalState>) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    return (
        <GlobalStateContext.Provider value={{ ...state, updateGlobalState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

