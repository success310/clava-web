import { ConnectedProps } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ClavaContext } from '../../../../config/contexts';
import { connector } from './redux';

const AdminpanelUser: React.FC<ConnectedProps<typeof connector>> = ({
  user,
  users,
  patchUser,
  getUser,
  aois,
  getAois,
  deleteUser,
  status,
  searching,
  searchUser,
}) => {
  const { l } = useContext(ClavaContext);
  const { adminMethod, adminElemId } = useParams();
  const [method, setMethod] = useState<string>(adminMethod ?? 'search');
  useEffect(() => {
    if (aois.length === 0) getAois();
  }, [aois]);

  return (
    <div>
      <fieldset className={`form ${method === 'search' ? 'open' : 'close'}`}>
        <span>Nothing here jet</span>
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelUser);
// rel
