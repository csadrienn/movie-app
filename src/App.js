import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/nav-components/Navbar";
import { ScrollToTop } from "./components/general-components";
import { Home, Shows, SingleShow, ErrorPage, SinglePerson } from "./pages";

const App = () => {
  return (
    <Router>
      <ScrollToTop>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path={["/movies", "/series"]}>
            <Shows />
          </Route>
          <Route path={["/movie/:id", "/series/:id"]}>
            <SingleShow />
          </Route>
          <Route path="/person/:id">
            <SinglePerson />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;
