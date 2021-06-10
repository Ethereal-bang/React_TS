import React from 'react';
import './App.css';
import robots from './mockdata/robots.json';
import Robot from "./component/Robot";

function App() {
    return (
        <ul>
            {robots.map((r, index) => (    // 此处的 () 是为了包裹 jsx 标签，可省略
                <Robot key={index} id={r.id} email={r.email} name={r.name} />
            ))}
        </ul>
    );
}

export default App;
