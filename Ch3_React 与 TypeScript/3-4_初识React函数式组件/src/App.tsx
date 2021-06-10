import React from 'react';
import './App.css';
import robots from './mockdata/robots.json';
import Robot from "./component/Robot";

function App() {
    return (
        <ul>
            {robots.map((r, index) => (    // 此处的 () 是为了包裹 jsx 标签，可省略
                <Robot key={index} id={r.id} email={r.email} name={r.name} />   // 添加 key 是为了解决 Warning: Each child in a list should have a unique “key” prop 的 warning
            ))}
        </ul>
    );
}

export default App;
