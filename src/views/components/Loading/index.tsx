import React from 'react';

type LoadingProps = {
  small?: boolean;
};

const Loading: React.FC<LoadingProps> = ({ small }) => (
  <div className={`loading ${small ? 'small' : ''}`}>
    <span>Loading</span>
  </div>
);

Loading.defaultProps = {
  small: false,
};

export default Loading;
