import withRoot from '../../withRoot';
// --- Post bootstrap -----
import React from 'react';
//import ProductCategories from '../ProductCategories';
//import AppFooter from '../../components/Footer/AppFooter';
import MainHero from './MainHero';
//import ProductValues from '../ProductValues';

function Home() {
  return (
    <React.Fragment>
      <MainHero />
      {/*<ProductValues />
      <ProductCategories />*/}
    </React.Fragment>
  );
}

export default withRoot(Home);
