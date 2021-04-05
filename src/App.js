import withRoot from "./withRoot";
// --- Post bootstrap -----
import React from "react";
import { Switch, Route } from "react-router-dom";
//import AppFooter from '../../components/Footer/AppFooter';
import Home from "./views/Home/Home";
import Photography from "./views/Photography";
import Blog from "./views/Blog";
import Videos from "./views/Videos";
import AppBar from "./components/AppBar";

function App() {
  return (
    <React.Fragment>
      <AppBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/photography" component={Photography} />
        <Route path="/blog" component={Blog} />
        <Route path="/videos" component={Videos} />
      </Switch>
    </React.Fragment>
  );
}

export default withRoot(App);
