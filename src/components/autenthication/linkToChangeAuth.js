import React from "react";
import styles from '../../style/linkToChangeAuth.module.css';
function LinkToChangeAuth(props){
    return (<p className={styles.link} onClick={props.changeAuth}>Already registered? Click me to log in!</p>)
}
export default LinkToChangeAuth;