import React from "react";
import styles from "../style/authForm.module.css";
import FormInput from "../components/elements/formInput";
import Button from "../components/elements/button";
import { Formik, Form } from "formik";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import * as Yup from "yup";
import { useHistory } from "react-router";

export default function Login() {
  const usersCollectionRef = collection(db, "users");
  async function getUser(values) {
    const q = query(
      usersCollectionRef,
      where("username", "==", values.username)
    );
    const usersSnapshot = await getDocs(q);
    if (usersSnapshot.length !== 0) {
      usersSnapshot.forEach((user) => {
        if (user.data().password === values.password) {
          localStorage.setItem("userActive", user.data().token);
          handleRedirect();
        } else {
          alert("Your password is wrong");
        }
      });
    } else {
      alert("Do you really have an account??");
    }
  }
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/home");
  };
  return (
    <div>
      <div className={styles.title}>
        <h2>Welcome back!</h2>
      </div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          password: Yup.string()
            .required("Please Enter your password")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must Contain 8 characters, Uppercase, Lowercase, Number and One Special Case"
            ),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            getUser(values);
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
      >
        <Form>
          <FormInput
            label="Username"
            placeholder="anaaremere"
            type="text"
            name="username"
          />
          <FormInput
            label="Password"
            placeholder="Ana_are2"
            type="password"
            name="password"
          />
          <div className={styles.centeredButton}>
            <Button text="Login" type="submit" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
