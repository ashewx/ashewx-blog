import withRoot from "../../withRoot";
// --- Post bootstrap -----
import React from "react";
import MainHero from "./MainHero";


class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MainHero />
      </React.Fragment>
    );
  }
}

export default withRoot(Home);
