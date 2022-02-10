import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Films from '../pages/Films';
import Planets from '../pages/Planets';
import PlanetDetails from '../pages/PlanetDetails';
import Residents from '../pages/Residents';
import NotFoundPage from '../pages/NotFound';
import Header from '../components/Header';

const Router = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Planets} />
      <Route exact path="/planets/:planetId" component={PlanetDetails} />
      <Route exact path="/planets/:planetId/films" component={Films} />
      <Route exact path="/planets/:planetId/residents" component={Residents} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
