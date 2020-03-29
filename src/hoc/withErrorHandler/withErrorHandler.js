import React from 'react';

import NewModal from '../../components/UI/Modal/BdModal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <div style={{}}>
        <NewModal show={error} modalClosed={clearError} mobileStyle={{ display: 'flex', flexDirection: 'columne', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center' }}>
          {error ? error.message : null}
        </NewModal>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withErrorHandler;
