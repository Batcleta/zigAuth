import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createpost">Create a post </Link>
        <br />
        <Link to="/">Go to homepage </Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/registration">Registration</Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createpost" component={CreatePost} />
          <Route path="/post/:id" component={Post} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
