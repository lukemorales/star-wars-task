import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from '../components/App';
import Films from '../components/Films';
import Planet from '../components/Planet';
import Residents from '../components/Residents';
import NotFoundPage from '../components/NotFoundPage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/planets/:planetId" component={Planet} />
      <Route exact path="/planets/:planetId/films" component={Films} />
      <Route exact path="/planets/:planetId/residents" component={Residents} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
