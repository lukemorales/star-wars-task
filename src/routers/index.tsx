import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from '../components/App';
import Films from '../components/Films';
import Residents from '../components/Residents';
import NotFoundPage from '../components/NotFoundPage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/planet/:planetId/films" component={Films} />
      <Route exact path="/planet/:planetId/residents" component={Residents} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
