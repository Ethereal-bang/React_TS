import React from 'react';
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage, SignInpage, RegisterPage, DetailPage } from './pages';

function App() {
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/signIn' component={SignInpage} />
                    <Route path='/signIn' component={RegisterPage} />
                    <Route path='/detail/:touristRouteId' component={DetailPage} />
                    <Route render={() => <h1>404 not found 页面去火星了！</h1>} />
                </Switch>

            </BrowserRouter>
        </div>
    );
}

export default App;