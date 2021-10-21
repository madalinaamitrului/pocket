import React from "react";
import classToCenter from "../style/centered.module.css";
import styles from "../style/home.module.css";
import Input from "../components/elements/formInput";
import InputSelect from "../components/elements/inputSelect";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../components/elements/button";
import PieChart from "../components/elements/pieChart";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Grid from '@material-ui/core/Grid';

export default function Home() {
  var [total, setTotal] = useState(0);
  var [costs, setCosts] = useState({
    restaurant: 0,
    shopping: 0,
    transport: 0,
    divertisment: 0,
    health: 0,
    bills: 0,
    other: 0,
  });

  const usersCollectionRef = collection(db, "users");
  const expensesCollectionRef = collection(db, "expenses");
  let user = localStorage.getItem("user");
  let token = localStorage.getItem("userActive");

  useEffect(() => {
    const getExpensesFromDb = async () => {
      const queryExpenses = query(
        expensesCollectionRef,
        where("userId", "==", user)
      );
      const querySnapshotExpenses = await getDocs(queryExpenses);
      if (querySnapshotExpenses.length !== 0) {
        querySnapshotExpenses.forEach((doc) => {
          setCosts(doc.data().costs);
          setTotal(
            Object.values(doc.data().costs).reduce((prev, curr) => prev + curr)
          );
        });
      }
    };
    getExpensesFromDb();
  }, [setCosts]);

  useEffect(() => {
    const getUserWithToken = async () => {
      const q = query(usersCollectionRef, where("token", "==", token));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.length !== 0) {
        querySnapshot.forEach((doc) => {
          var user = doc.id;
          localStorage.setItem("user", user);
        });
      } else {
        alert("How did you got here?");
      }
    };
    getUserWithToken();
  });
  function addExpense(values) {
    switch (values.expenseCategory) {
      case "restaurant":
        let newCostsRestaurant = { ...costs };
        newCostsRestaurant.restaurant += values.price;
        setCosts(newCostsRestaurant);
        setTotal((total += values.price));
        break;
      case "shopping":
        let newCostsShopping = { ...costs };
        newCostsShopping.shopping += values.price;
        setCosts(newCostsShopping);
        setTotal((total += values.price));
        break;
      case "transport":
        let newCostsTransport = { ...costs };
        newCostsTransport.transport += values.price;
        setCosts(newCostsTransport);
        setTotal((total += values.price));
        break;
      case "divertisment":
        let newCostsDivertisment = { ...costs };
        newCostsDivertisment.divertisment += values.price;
        setCosts(newCostsDivertisment);
        setTotal((total += values.price));
        break;
      case "health":
        let newCostsHealth = { ...costs };
        newCostsHealth.health += values.price;
        setCosts(newCostsHealth);
        setTotal((total += values.price));
        break;
      case "bills":
        let newCostsBills = { ...costs };
        newCostsBills.bills += values.price;
        setCosts(newCostsBills);
        setTotal((total += values.price));
        break;
      case "other":
        let newCostsOther = { ...costs };
        newCostsOther.other += values.price;
        setCosts(newCostsOther);
        setTotal((total += values.price));
        break;
    }
  }
  const setUsersExpenses = async () => {
    const queryExpenses = query(
      expensesCollectionRef,
      where("userId", "==", user)
    );
    const querySnapshotExpenses = await getDocs(queryExpenses);
    if (querySnapshotExpenses.length !== undefined) {
      console.log(querySnapshotExpenses.length);
      querySnapshotExpenses.forEach((exp) => {
        const expensesDoc = doc(db, "expenses", exp.id);
        const newCosts = { ...costs };
        updateDoc(expensesDoc, { costs: newCosts });
      });
    } else {
      addExpensesToDb();
    }
  };
  const addExpensesToDb = async () => {
    await addDoc(expensesCollectionRef, { costs: costs, userId: user });
    console.log("what?");
  };

  const history = useHistory();
  function logOut() {
    setUsersExpenses();
    setTimeout(() => {
      localStorage.removeItem("userActive");
      localStorage.removeItem("user");
    }, 10000);
    history.push("/");
  }
  return (
    <div className={styles.container}>
      <button type="button" onClick={logOut}>
        Log out
      </button>
      <h1>My wallet</h1>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <div className={styles.card}>
          <h2>Add expense</h2>
          <Formik
            initialValues={{
              price: 0,
              expenseCategory: "",
            }}
            validationSchema={Yup.object({
              price: Yup.number()
                .positive("A positive number please :)")
                .integer("An integer please :)")
                .required("Required"),
              expenseCategory: Yup.string()
                .oneOf([
                  "restaurant",
                  "shopping",
                  "transport",
                  "divertisment",
                  "health",
                  "bills",
                  "other",
                ])
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                addExpense(values);
                setSubmitting(false);
                resetForm();
              }, 400);
            }}
          >
            <Form>
              <Input
                type="number"
                label="Price($)"
                name="price"
                placeholder="1"
              />
              <InputSelect label="Category" name="expenseCategory">
                <option value="">Category</option>
                <option value="restaurant">Restaurant</option>
                <option value="shopping">Shopping</option>
                <option value="transport">Transport</option>
                <option value="divertisment">Divertisment</option>
                <option value="health">Health</option>
                <option value="bills">Bills</option>
                <option value="other">Other</option>
              </InputSelect>
              <div
                className={classToCenter.container + " " + styles.paddingTop}
              >
                <Button type="submit" text="Add" />
              </div>
            </Form>
          </Formik>
        </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <div className={styles.pie}>
          <PieChart costs={costs} />
        </div>
        </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
      <div className={classToCenter.container}>
        <h2>{total}$</h2>
        {Object.entries(costs).map((cost, index) => (
          <div key={index}>
            {cost[0]} : {cost[1]} $
          </div>
        ))}
      </div>
      </Grid>
      </Grid>
    </div>
  );
}
