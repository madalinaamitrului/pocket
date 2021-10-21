import React from "react";
import Button from "../components/elements/button";
import styles from "../style/authForm.module.css";
import FormInput from "../components/elements/formInput";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";

function Register() {
  const usersCollectionRef = collection(db, "users");
  const createUser = async (values) => {
    let token = uuidv4();
    localStorage.setItem("userActive", token);
    await addDoc(usersCollectionRef, {
      username: values.username,
      email: values.email,
      password: values.password,
      token: token,
    });
  };
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/home");
  };
  return (
    <div>
      <div className={styles.title}>
        <h2>Welcome!</h2>
      </div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
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
            createUser(values);
            setSubmitting(false);
            handleRedirect();
            resetForm();
          }, 400);
        }}
      >
        <Form>
          <FormInput
            type="text"
            label="Username"
            name="username"
            placeholder="anaaremere"
          />
          <FormInput
            type="email"
            label="Email"
            name="email"
            placeholder="anaaremere@email.com"
          />

          <FormInput
            type="password"
            label="Password"
            name="password"
            placeholder="Ana_are2"
          />
          <div className={styles.centeredButton}>
            <Button text="Register" type="submit" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
export default Register;
