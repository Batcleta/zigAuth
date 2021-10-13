import React from "react";
import api from "../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CreatePost() {
  const onSubmit = (data) => {
    api.post("/posts", data).then((resp) => console.log(resp));
  };

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required("You must input a post description"),
    username: Yup.string()
      .min(3)
      .max(15)
      .required("you must input your username"),
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
          <label>Username: </label>
          <ErrorMessage name="username" component="small" />
          <Field
            // autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(ex: Washington...)"
          />

          <button type="submit">Create a post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
