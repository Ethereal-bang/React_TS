import React from 'react';
import robots from './mockdata/robots.json';
import Robot from "./component/Robot";
import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.app}>
            <div className={styles.robotList}>
                {robots.map((r, index) => (
                    <Robot key={index} id={r.id} email={r.email} name={r.name} />
                ))}
            </div>
        </div>
        
    );
}

export default App;
