import React from "react";
import styles from '../style/autenthication.module.css';
import classToCenter from '../style/centered.module.css';
import loginImage from '../components/images/analytics.png';
import Register from "./register";
import { useState } from "react";
import LinkToChangeAuth from "../components/autenthication/linkToChangeAuth";
import Login from "./login";
function Autenthication (){
    const [autenthication, setAutenthication] = useState('register');
    function triggerAuthChange(){
        setAutenthication('login');
    }
    return (
    <div className={styles.container}>
        <div className={styles.box}>
            <div className={classToCenter.container}>
            <img src={loginImage} alt="LoginImage"/>
            </div>
            {autenthication ==='register' && <Register/>}
            {autenthication === 'login' && <Login/>}
            {autenthication==='register' && <LinkToChangeAuth changeAuth={triggerAuthChange}/>}
        </div>
    </div>)
}
export default Autenthication;