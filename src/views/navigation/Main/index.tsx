import { ConnectedProps } from 'react-redux';
import React, { useCallback, useContext } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { connector } from './redux';
import { ClavaRootContext } from '../../../config/contexts';

import suedtirol from '../../../assets/images/south-tyrol-white.png';
import trentino from '../../../assets/images/trentino-white.png';

const Main: React.FC<ConnectedProps<typeof connector>> = ({ user, setAoi }) => {
  const { l, aoi } = useContext(ClavaRootContext);

  const onSelectSued = useCallback(() => {
    setAoi(1);
  }, [setAoi]);
  const onSelectTrient = useCallback(() => {
    setAoi(2);
  }, [setAoi]);
  if (aoi === -2) {
    return (
      <div className="main align-content-center justify-content-center">
        <ButtonGroup>
          <Button color="primary" outline onClick={onSelectSued}>
            <img src={suedtirol} className="aoi-icon" alt="Südtirol" />
            <h4>Südtirol</h4>
          </Button>
          <Button color="primary" outline onClick={onSelectTrient}>
            <img src={trentino} className="aoi-icon" alt="Trentino" />
            <h4>Trentino</h4>
          </Button>
        </ButtonGroup>
      </div>
    );
  }
  return (
    <div className="main">
      <span>{l}</span>
      <span>{aoi}</span>
      <span>{JSON.stringify(user)}</span>
      <a href="https://www.google.com">Hi</a>
    </div>
  );
};

export default connector(Main);
