import React, {useState, useEffect} from 'react';
import logo from "./assets/images/logo.svg";
import Robot from "./component/Robot";
import RobotDiscount from './component/RobotDiscount';
import styles from "./App.module.css";
import ShoppingCart from './component/ShoppingCart';

const App : React.FC = (props)=> {
    const [count, setCount] = useState<number>(0);
    const [robotGallery, setRobotGallery] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>();

    useEffect(() => {
        document.title = `点击${count}次`
    }, [count])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  
            try {
                const response =  await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                ); 
                const data = await response.json(); 
                setRobotGallery(data);
                setLoading(false);
            }   catch(e) {
                setError(e.message)
            }
        };
        fetchData();
    }, [])

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
            {error && (<div>网站出错：{error}</div>)}  
            {!loading ? (
                <div className={styles.robotList}>
                    {robotGallery.map((r, index) => 
                        index % 2 === 0 ? (  // 双数的商品打折
                            <RobotDiscount key={index} id={r.id} email={r.email} name={r.name} />    
                        ) : (
                            <Robot key={index} id={r.id} email={r.email} name={r.name} />
                        )    
                    )}
                </div>
            ) : (
                <h2>loading 加载中</h2>
            )}
        </div>
    );
}

export default App;
