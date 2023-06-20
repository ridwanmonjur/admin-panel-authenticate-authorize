import { createContext, useContext, } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const gbValue = "none";
    // const gbValue = useAuth();

    return (
        <GlobalContext.Provider value={gbValue}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalCtx = () => useContext(GlobalContext);
