import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createpost">Create a post </Link>
        <br />
        <Link to="/">Go to homepage </Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createpost" component={CreatePost} />
          <Route path="/post/:id" component={CreatePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
