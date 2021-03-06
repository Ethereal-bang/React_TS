import React, { useContext } from "react"
import styles from "./Robot.module.css";
import { appContext } from '../index';

interface RobotProps {  // 定义父组件需要给当前组件传入的数据
    id: number,
    name: string,
    email: string,
}

const Robot : React.FC<RobotProps> = ({ id, name, email }) => {
    const value = useContext(appContext);
    
    return (
        <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`} />
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
        </div>
    );
};

export default Robot;