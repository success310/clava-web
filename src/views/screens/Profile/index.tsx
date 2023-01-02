import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Modal,
  Row,
} from 'reactstrap';
import { ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserCircle } from '@fortawesome/pro-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import { ClavaContext } from '../../../config/contexts';
import { translate } from '../../../config/translator';
import { connector } from './redux';
import {
  isAdmin,
  isInsider,
  isRegistered,
  isTeamInsider,
} from '../../../config/utils';

const DeleteFadeTrans = {
  timeout: 250,
  baseClass: 'delete-account',
};
const Profile: React.FC<ConnectedProps<typeof connector>> = ({
  changeUsernameStatus,
  changeUsername,
  logout,
  deleteAccount,
}) => {
  const { l, user } = useContext(ClavaContext);
  const isPremium = useMemo(() => user.premium, [user]);
  const insider = useMemo(() => isInsider(user, undefined, true), [user]);
  const teamInsider = useMemo(() => isTeamInsider(user), [user]);
  const [username, setUsername] = useState<string>(user.username);
  const registered = useMemo(() => isRegistered(user), [user]);
  const [deleteAccountModal, setDeleteAccount] = useState<boolean>(false);
  const onChangeUsername = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setUsername(e.target.value);
    },
    [],
  );
  const onSubmitUsername = useCallback(() => {
    changeUsername(username);
  }, [username, changeUsername]);
  const onDeleteAccount = useCallback(() => {
    setDeleteAccount(true);
  }, []);
  const onCancelDeleteAccount = useCallback(() => {
    setDeleteAccount(false);
  }, []);
  return (
    <div className="container">
      <div className="profile">
        <div className="profile-header">
          {teamInsider ? (
            <h6 className="text-primary">{translate('teamInsider', l)}</h6>
          ) : insider ? (
            <h6 className="text-primary">{translate('insider', l)}</h6>
          ) : null}
          {isPremium && (
            <span className="text-primary">{translate('premium', l)}</span>
          )}

          <FontAwesomeIcon icon={faUserCircle} size="5x" />
          <FormGroup>
            {changeUsernameStatus === 'usernameGiven' && (
              <span className="text-danger">
                {translate(changeUsernameStatus, l)}
              </span>
            )}
            <InputGroup className="only-focus">
              <Input
                onChange={onChangeUsername}
                value={username}
                name="username"
              />
              <button
                type="button"
                className="input-group-addon"
                onClick={onSubmitUsername}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </InputGroup>
          </FormGroup>
        </div>
        <div className="profile-content">
          {isAdmin(user) && (
            <div className="mt-2 text-center">
              <NavLink to="/backoffice">
                <h5>Backoffice</h5>
              </NavLink>
            </div>
          )}
          {!user.emailConfirmed && (
            <div className="mt-2">
              <NavLink to="/confirm" className="btn btn-primary">
                {translate(user.email ? 'confirmMailShort' : 'register', l)}
              </NavLink>
              {!registered && (
                <div>
                  <NavLink
                    to="/login"
                    className="text-decoration-underline text-muted">
                    <span>{`${translate('alreadyRegistered', l)} ${translate(
                      'login',
                      l,
                    )}`}</span>
                  </NavLink>
                </div>
              )}
            </div>
          )}
          <span>Clava Sports &copy; 2022</span>
          {registered && (
            <div className="mt-2">
              <Button onClick={logout} color="secondary">
                <span>{translate('logout', l)}</span>
              </Button>
            </div>
          )}
          {registered && (
            <div className="mt-2">
              <Button color="secondary" onClick={onDeleteAccount}>
                <span>{translate('deleteAccount', l)}</span>
              </Button>
            </div>
          )}
        </div>
        <Modal
          isOpen={deleteAccountModal}
          modalTransition={DeleteFadeTrans}
          backdrop
          unmountOnClose={false}>
          <div className="default-modal-content">
            <h3>{translate('deleteAccount', l)}</h3>
            <p>{translate('deleteAccountCont', l)}</p>
            <Row>
              <Col xs={12} md={6}>
                <Button color="secondary" onClick={deleteAccount}>
                  <span>{translate('yes', l)}</span>
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <Button color="primary" onClick={onCancelDeleteAccount}>
                  <span>{translate('no', l)}</span>
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default connector(Profile);
// reloa  d
