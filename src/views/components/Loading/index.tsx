import React from 'react';
import { Spinner } from 'reactstrap';

type LoadingProps = {
  small?: boolean;
};

const Loading: React.FC<LoadingProps> = ({ small }) => (
  <div className={`loading ${small ? 'small' : ''} mb-3 text-center`}>
    <Spinner
      color="primary"
      style={{
        height: '3rem',
        width: '3rem'
      }}
    >
      Loading...
    </Spinner>

  </div>
);

Loading.defaultProps = {
  small: false,
};

export default Loading;