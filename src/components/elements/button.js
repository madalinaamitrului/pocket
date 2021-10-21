import React from "react";
import styles from '../../style/button.module.css';
function Button(props){
    return(
        <button type={props.type} className={styles.button}>{props.text}</button>
    )
}
export default Button;