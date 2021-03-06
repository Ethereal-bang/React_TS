import React, {useState} from 'react';
import logo from "./assets/images/logo.svg";
import Robot from "./component/Robot";
import styles from "./App.module.css";
import ShoppingCart from './component/ShoppingCart';

const App : React.FC = (props)=> {
    const [count, setCount] = useState<number>(0);
    return (
        <div className={styles.app}>
            <div className={styles.appHeader}>
                <img src={logo} className={styles.appLogo} alt="logo" />
                <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
            </div>
            <button onClick={() => {
                setCount(count+1);
            }}
            >Click</button>
            <span>count: {count}</span>
            <ShoppingCart />
        </div>
    );
}

export default App;
