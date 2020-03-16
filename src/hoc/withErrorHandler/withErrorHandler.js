import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Uxi from '../Uxi/Uxi';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Uxi>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Uxi>
    );
  };
};

export default withErrorHandler;
