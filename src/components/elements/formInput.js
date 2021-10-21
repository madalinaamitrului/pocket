import React from "react";
import styles from '../../style/formInput.module.css';
import { useField } from "formik";
function FormInput({label,...props}) {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className={styles.formLabel} htmlFor={props.name}>{label}</label>
      <input className={styles.formInput} {...field} {...props}/>
      {meta.touched && meta.error ? (
         <div className={styles.error}>{meta.error}</div>
       ) : null}
    </div>
  );
}
export default FormInput;
