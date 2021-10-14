import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState();

  useEffect(() => {
    api.get(`/posts/${id}`).then((resp) => {
      setPost(resp.data);
    });

    api.get(`/comments/${id}`).then((resp) => {
      setComment(resp.data);
    });
  }, []);

  const onSubmit = (data) => {
    api
      .post("/comments", {
        commentBody: newComment,
        postId: id,
        username: "washington F",
      })
      .then((resp) => {
        const newCommentBody = {
          commentBody: newComment,
          username: "washington.f",
        };
        setComment([...comment, newCommentBody]);
        setNewComment("");
      });
  };

  return (
    <>
      <div>
        <h3>{post?.title}</h3>
        <p>{post?.postText}</p>
        <p>{post?.username}</p>
      </div>
      <div>
        <div>
          <input
            type="text"
            value={newComment}
            placeholder="comment..."
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" onClick={onSubmit}>
            Enviar
          </button>
        </div>
        <div>
          {comment.map((item, key) => (
            <div key={key}>
              <h4>{item.commentBody}</h4>
              <p>{item.username}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
