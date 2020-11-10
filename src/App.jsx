import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutPage from './containers/Checkout/checkoutPage';
import OrderDetail from "./containers/Orders/OrderDetail"
import { Route, Switch } from "react-router-dom";
class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
          <Route path = '/checkout'  component={CheckoutPage}/>
          <Route path = '/myOrders' exact component={OrderDetail}/>
          <Route path = "/" exact component = {BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
