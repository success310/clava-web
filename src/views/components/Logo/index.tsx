import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { ClavaRootContext } from '../../../config/contexts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPng = require('../../../assets/images/logo-app.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPngVertical = require('../../../assets/images/logo-app-big-white.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPngWhite = require('../../../assets/images/logo-app-white.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPngVerticalWhite = require('../../../assets/images/logo-app-big.png');

type LogoProps = {
  onPress?: () => void;
  vertical?: boolean;
};
const Logo: React.FC<LogoProps> = ({ vertical, onPress }) => {
  const { theme } = useContext(ClavaRootContext);
  if (!onPress)
    return (
      <div className={vertical ? 'logo-vertical' : 'logo'}>
        <img
          src={
            vertical
              ? theme === 'dark'
                ? logoPngVertical
                : logoPngVerticalWhite
              : theme === 'dark'
              ? logoPng
              : logoPngWhite
          }
          className={vertical ? 'logo-img-vertical' : 'logo-img'}
          alt="Clava-Sports Logo"
          title="Clava-Sports"
        />
      </div>
    );
  return (
    <div className={vertical ? 'logo-vertical' : 'logo'}>
      <Button onClick={onPress} color="transparent">
        <img
          src={
            vertical
              ? theme === 'dark'
                ? logoPngVertical
                : logoPngVerticalWhite
              : theme === 'dark'
              ? logoPng
              : logoPngWhite
          }
          className={vertical ? 'logo-img-vertical' : 'logo-img'}
          alt="Clava-Sports Logo"
          title="Clava-Sports"
        />
      </Button>
    </div>
  );
};

Logo.defaultProps = {
  onPress: undefined,
  vertical: false,
};
// rel oad
export default Logo;
