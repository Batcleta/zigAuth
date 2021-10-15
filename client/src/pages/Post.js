import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../helpers/AuthContext";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState();
  const { authState } = useAuth();

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
            apiKey: localStorage.getItem("apiKey"),
          },
        }
      )
      .then((resp) => {
        // necessário verificar se nao retornou erro para poder criar a gravação de visualização temporária
        // caso essa tratativa não seja feita, o js irá criar a visualização do comentário mesmo assim
        // e irá apagar após o refresh de página
        if (resp.data.error) {
          alert("Por favor, faça o login para comentar ");
        } else {
          // Adiciona comentário criado no objeto para visualização rápida após a criação, sem a necessidade de recarregar a página
          const newCommentBody = {
            commentBody: newComment,
            user: { username: resp.data.username },
          };
          setComment([...comment, newCommentBody]);
          setNewComment("");
        }
      });
  };

  const onDelete = (commentId) => {
    api
      .delete(`/comments/${commentId}`, {
        headers: {
          apiKey: localStorage.getItem("apiKey"),
        },
      })
      .then((resp) => {
        setComment(
          comment.filter((item) => {
            return item.id != commentId;
          })
        );
      });
  };

  return (
    <>
      <div
        style={{
          margin: "2rem auto",
          backgroundColor: "white",
          padding: "1rem",
          boxShadow: `
            -0.7px -2.5px 2.2px rgba(0, 0, 0, 0.02),
            -0.9px -3.3px 5.3px rgba(0, 0, 0, 0.028),
            -0.7px -2.5px 10px rgba(0, 0, 0, 0.035),
            -0.1px -0.3px 17.9px rgba(0, 0, 0, 0.042)`,
        }}
      >
        <h3>{post?.title}</h3>
        <p>{post?.postText}</p>
        <p>{post?.user.username}</p>
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
              <p>{item.user?.username}</p>
              {authState.status && (
                <button onClick={() => onDelete(item.id)}> X</button>
              )}
              {/* check if not a moderator or adm */}
              {authState.username === item.user.username && (
                <button onClick={() => onDelete(item.id)}> Xuser</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
