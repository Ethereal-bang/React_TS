import React, { useState } from "react"

interface AppStateValue {
    username: string,
    shoppingCart: { items: {id: number, name: string}[] }
}

const defaultContextValue : AppStateValue = {
    username: '阿莱克斯',
    shoppingCart: { items: [] } // 是一个对象包含列表 items
}

export const appContext = React.createContext(defaultContextValue);
export const appSetStateContext = React.createContext<
    React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined);

export const AppStateProvider: React.FC = (props) => {
    const [state, setState] = useState(defaultContextValue);    // 实现全局的更新


    return <appContext.Provider value={state}>  
        <appSetStateContext.Provider value={setState}>
            {props.children}
        </appSetStateContext.Provider>
        
    </appContext.Provider>
}