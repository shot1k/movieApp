import "./App.css";
import { Button } from "@material-ui/core";
import Layout from "./components/layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MoviesLists from "./components/moviesList";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route  path="/">
              <Layout />
            </Route>
            {/* <Route path="/genre/:id/:name">
            <MoviesLists />
          </Route> */}
            {/* <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
