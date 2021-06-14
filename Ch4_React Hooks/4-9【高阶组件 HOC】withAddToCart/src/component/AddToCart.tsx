import React, { useContext } from "react";
import { appSetStateContext  } from "../AppState";
import { RobotProps } from "./Robot";

export const withAddToCart = (ChildComponent: React.ComponentType<RobotProps>) => {
    // return class extends React.Component {} // 返回类式组件
    return (props) => { // 返回函数式组件
        const setState = useContext(appSetStateContext);
        const addToCart = (id, name) => {
            if (setState) { 
                setState((state) => {
                    return {
                        ...state,       
                        shoppingCart: {
                            items: [...state.shoppingCart.items, {id, name}],   
                        },
                    };
                });
            }
        }
        return <ChildComponent {...props} addToCart={addToCart} />  
    }
}