import { createContext, useState } from "react";

const StoreContext = createContext()

export const StoreProvider = ({children}) => { 
    const [options , setOptions] = useState(null)
    const [cast , setCast] = useState(null)

return(
    <StoreContext.Provider value={{
        options,
        setOptions,
        cast,
        setCast

    }}>
        {children}
    </StoreContext.Provider>
    )
}

export default StoreContext