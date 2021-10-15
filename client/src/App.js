import "./App.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import api from "./api";

import { useAuth } from "./helpers/AuthContext";

function App() {
  let history = useHistory();
  const { authState, setAuthState } = useAuth();

  const logOut = (e) => {
    localStorage.removeItem("apiKey");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    history.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("apiKey")) {
      api
        .get("/users/auth", {
          headers: {
            apiKey: localStorage.getItem("apiKey"),
          },
        })
        .then((resp) => {
          if (resp.data.error) {
            setAuthState({
              ...authState,
              status: false,
            });
            history.push("/login");
          } else {
            setAuthState({
              username: resp.data.username,
              id: resp.data.id,
              status: true,
            });
          }
        });
    }
  }, []);

  return (
    <div className="App">
      <Link to="/createpost">Create a post </Link>
      <br />
      <Link to="/">Go to homepage </Link>
      <br />
      {!authState.status ? (
        <>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/registration">Registration</Link>
          <br />
        </>
      ) : (
        <>
          <button onClick={(e) => logOut(e)}>log out</button>
          <h3>{authState.username}</h3>
        </>
      )}

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/post/:id" component={Post} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
