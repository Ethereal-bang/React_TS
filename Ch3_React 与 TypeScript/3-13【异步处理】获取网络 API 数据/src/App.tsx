import React from 'react';
import logo from "./assets/images/logo.svg";
import Robot from "./component/Robot";
import styles from "./App.module.css";
import ShoppingCart from './component/ShoppingCart';

interface Props {}
interface State {
    robotGallery: any[],
}

class App extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            robotGallery: [],
        }
    }
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users") // 返回一个 Promise
        .then(response => response.json())     // 返回 Promise
        .then(data => this.setState({ robotGallery: data }));
    }
    render() {
        return (
            <div className={styles.app}>
                <div className={styles.appHeader}>
                    <img src={logo} className={styles.appLogo} alt="logo" />
                    <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
                </div>
                <ShoppingCart />
                <div className={styles.robotList}>
                    {this.state.robotGallery.map((r, index) => (
                        <Robot key={index} id={r.id} email={r.email} name={r.name} />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
