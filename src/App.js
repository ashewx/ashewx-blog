import withRoot from './withRoot';
// --- Post bootstrap -----
import React from 'react';
//import AppFooter from '../../components/Footer/AppFooter';
import Home from './views/Home/Home';
import AppBar from './components/AppBar/AppBar';

function App() {
  return (
    <React.Fragment>
      <AppBar />
      <Home />
      {/*<AppFooter />*/}
    </React.Fragment>
  );
}

export default withRoot(App);
