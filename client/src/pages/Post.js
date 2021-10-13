import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    api.get(`/posts/${id}`).then((resp) => {
      setPost(resp.data);
    });
  }, []);

  return (
    <div>
      <h3>{post?.title}</h3>
      <p>{post?.postText}</p>
      <p>{post?.username}</p>
    </div>
  );
}

export default Post;
