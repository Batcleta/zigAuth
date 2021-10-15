import React from "react";
import api from "../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

function CreatePost() {
  let history = useHistory();

  const onSubmit = (data) => {
    api
      .post("/posts", data, {
        headers: {
          apiKey: sessionStorage.getItem("apiKey"),
        },
      })
      .then((resp) => {
        if (resp.data.error) {
          alert("Por favor, faça o login para comentar");
        } else {
          history.push("/");
        }
      });
  };

  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required("You must input a post description"),
  });

  return (
    <div className="createPostContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Title: </label>
          <ErrorMessage name="title" component="small" />
          <Field
            // autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(ex: title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="small" />
          <Field
            // autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(ex: post...)"
          />

          <button type="submit">Create a post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
