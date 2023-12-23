import { createContext, useContext, useState } from "react";

interface GlobalState {
}

const initialState: GlobalState = {
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

