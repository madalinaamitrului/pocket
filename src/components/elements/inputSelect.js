import React from "react";
import { useField } from "formik";
import styles from '../../style/formInput.module.css';
const InputSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label className={styles.formLabel} htmlFor={props.name}>{label}</label>
        <select className={styles.formInput} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error}</div>
        ) : null}
      </div>
    );
  };
export default InputSelect;