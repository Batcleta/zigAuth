import React, { useState } from "react";
import api from "../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

function Registration() {
  let history = useHistory();

  const onSubmit = (data) => {
    api.post("/users", data).then((resp) => {
      // console.log(resp);
      history.push("/login");
    });
  };

  // formik properties
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required("you must input your username"),
    password: Yup.string().min(4).max(20).required("You must input a password"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div>
      <h3>Crie sua conta </h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Username: </label>
          <ErrorMessage name="username" component="small" />

          <Field
            // autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(ex: Washington...)"
          />

          <label>password: </label>
          <ErrorMessage name="password" component="small" />
          <Field
            // autocomplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="(ex: 123456...)"
          />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
