import React, { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then((resp) => {
      setPosts(resp.data);
    });
  }, []);

  return (
    <div>
      {posts.map((item, index) => (
        <div
          key={index}
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
          <h3 style={{ fontWeight: "bold" }}>{item.title}</h3>
          <p style={{ color: "#4f4f4f", fontWeight: "normal" }}>
            {item.postText}
          </p>
          <h3 style={{ fontSize: ".8rem" }}> {item.username}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;
