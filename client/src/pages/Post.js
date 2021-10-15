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
      .post(
        "/comments",
        {
          commentBody: newComment,
          postId: id,
        },
        {
          headers: {
            apiKey: sessionStorage.getItem("apiKey"),
          },
        }
      )
      .then((resp) => {
        // necessário verificar se nao retornou erro para poder criar a gravação de visualização temporária
        // caso essa tratativa não seja feita, o js irá criar a visualização do comentário mesmo assim
        // e irá apagar após o refresh de página
        if (resp.data.error) {
          alert("Por favor, faça o login para comentar");
        } else {
          // Adiciona comentário criado no objeto para visualização rápida após a criação, sem a necessidade de recarregar a página
          const newCommentBody = {
            commentBody: newComment,
          };
          setComment([...comment, newCommentBody]);
          setNewComment("");
        }
      });
  };

  return (
    <>
      <div>
        <h3>{post?.title}</h3>
        <p>{post?.postText}</p>
        {post?.user.username && (
          <p>
            {" "}
            <strong>Created by: {post?.user.username}</strong>
          </p>
        )}
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
              <p>{item.user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
