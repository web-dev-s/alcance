import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <div style={{}}>
        <Modal show={error} modalClosed={clearError} mobileStyle={{ display: 'flex', flexDirection: 'columne', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withErrorHandler;
