import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder/BurgerBuilder';
import CheckoutPage from './containers/Checkout/checkoutPage';
import { Route } from "react-router-dom";
class App extends Component {
  render () {
    return (
      <div>
        <Layout>
            <Route path = "/" exact component = {BurgerBuilder}/>
            <Route path = '/checkout' component={CheckoutPage}/>
        </Layout>
      </div>
    );
  }
}

export default App;
