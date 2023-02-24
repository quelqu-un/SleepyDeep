import React, {createContext, useState} from "react";

export const LangContext = createContext({});

function LangProvider({children}) {
    const [language, setLanguage] = useState(0);

    return (
        <LangContext.Provider value={{ language , setLanguage }}>
            {children}
        </LangContext.Provider>
    );
}

export default LangProvider;