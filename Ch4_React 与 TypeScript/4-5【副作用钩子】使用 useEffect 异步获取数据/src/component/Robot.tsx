import React from "react"
import styles from "./Robot.module.css";

interface RobotProps {  // 定义父组件需要给当前组件传入的数据
    id: number,
    name: string,
    email: string,
}

const Robot : React.FC<RobotProps> = ({ id, name, email }) => {
    return (
        <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`} />
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    );
};

export default Robot;