import React from "react"

interface RobotProps {  // 定义父组件需要给当前组件传入的数据
    id: number,
    name: string,
    email: string,
}

const Robot : React.FC<RobotProps> = ({ id, name, email }) => {
    return (
        <li>
            <img alt="robot" src={`https://robohash.org/${id}`} />
            <h2>{name}</h2>
            <p>{email}</p>
        </li>
    );
};

export default Robot;