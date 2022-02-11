import React, { useEffect } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

import Films from '../pages/Films';
import Planets from '../pages/Planets';
import PlanetDetails from '../pages/PlanetDetails';
import Residents from '../pages/Residents';
import NotFoundPage from '../pages/NotFound';
import Header from '../components/Header';
import PlanetModal from '../components/PlanetModal';
import { useAppDispatch, useAppSelector } from '../hooks';
import { modalActions } from '../slices/modal';

const REQUEST_MESSAGES = {
  idle: '',
  error: "An error has happened and we couldn't update the Planet info",
  success: 'Planet details updated successfully',
};

const Router = () => {
  const dispatch = useAppDispatch();

  const isModalVisible = useAppSelector((state) => state.modal.isVisible);
  const modalRequestStatus = useAppSelector(
    (state) => state.modal.requestStatus,
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (modalRequestStatus !== 'idle') {
      timeout = setTimeout(() => dispatch(modalActions.clearData()), 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [dispatch, modalRequestStatus]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Planets} />
        <Route exact path="/planets/:planetId" component={PlanetDetails} />
        <Route exact path="/planets/:planetId/films" component={Films} />
        <Route
          exact
          path="/planets/:planetId/residents"
          component={Residents}
        />
        <Route component={NotFoundPage} />
      </Switch>

      {isModalVisible && <PlanetModal />}

      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <Toast isOpen={modalRequestStatus !== 'idle'}>
          <ToastHeader>Star Wars API</ToastHeader>
          <ToastBody className="text-start">
            {REQUEST_MESSAGES[modalRequestStatus]}
          </ToastBody>
        </Toast>
      </div>
    </BrowserRouter>
  );
};

export default Router;
