import { useEffect } from 'react';

import Router from './routers';
import Header from './components/Header';
import PlanetModal from './components/PlanetModal';
import { useAppDispatch, useAppSelector } from './hooks';
import { modalActions } from './slices/modal';
import AppToast from './components/AppToast';

const REQUEST_MESSAGES = {
  idle: '',
  error: "An error has happened and we couldn't update the Planet info",
  success: 'Planet details updated successfully',
};

const App = () => {
  const dispatch = useAppDispatch();

  const isModalVisible = useAppSelector((state) => state.modal.isVisible);
  const formData = useAppSelector((state) => state.modal.formData);
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
    <>
      <Header />
      <Router />

      {isModalVisible && (
        <PlanetModal
          defaultValues={formData}
          onClose={() => dispatch(modalActions.clearData())}
          onSubmit={(data) => dispatch(modalActions.submitData(data))}
        />
      )}

      <AppToast
        open={modalRequestStatus !== 'idle'}
        headerText="Star Wars API"
        bodyText={REQUEST_MESSAGES[modalRequestStatus]}
      />
    </>
  );
};

export default App;
