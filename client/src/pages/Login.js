import React, { useState } from "react";
import api from "../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "../helpers/AuthContext";

function Login() {
  let history = useHistory();
  const [logMessage, setLogMessage] = useState();
  const { authState, setAuthState } = useAuth();

  const onSubmit = (data) => {
    api.post("/users/login", data).then((resp) => {
      if (resp.data.error) {
        setLogMessage(resp.data);
      } else {
        localStorage.setItem("apiKey", resp.data.apiKey);
        setAuthState({
          username: resp.data.username,
          id: resp.data.id,
          status: true,
        });
        history.push("/");
      }
    });
  };

  // formik properties
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required("you must input your username"),
    password: Yup.string().required("You must input a post description"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div>
      <h3>Faça seu login</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Username: </label>
          <ErrorMessage name="username" component="small" />
          {logMessage && <small> {logMessage?.error}</small>}
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

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
