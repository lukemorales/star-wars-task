import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from '../components/App';
import NotFoundPage from '../components/NotFoundPage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
