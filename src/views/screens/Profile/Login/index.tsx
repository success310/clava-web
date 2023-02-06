import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from 'reactstrap';
import { ConnectedProps } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { faEnvelope, faEye } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClavaContext } from '../../../../config/contexts';
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import { isRegistered } from '../../../../config/utils';

const Login: React.FC<ConnectedProps<typeof connector>> = ({
  reset,
  login,
  pwForgot,
  loginStatus,
  user,
}) => {
  const { l } = useContext(ClavaContext);
  const { redirectAfter } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const pwInput = useRef<HTMLInputElement>(null);
  const [pwVisible, setPwVisible] = useState<boolean>(false);
  const mailValid = useMemo(
    () => loginStatus !== 'mailGiven' && loginStatus !== 'mailInvalid',
    [loginStatus],
  );
  useEffect(() => {
    reset();
  }, [reset]);
  useEffect(() => {
    if (isRegistered(user) && user?.email === email) {
      setTimeout(() => {
        navigate(redirectAfter || '/profile');
      }, 2000);
    }
  }, [user, email]);
  const onLogin = useCallback(() => {
    login(email, password);
  }, [email, password]);
  const onSubmitEmail = useCallback(() => {
    if (pwInput.current) pwInput.current.focus();
  }, []);
  const onChangeEmail = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setEmail(e.target.value);
    },
    [],
  );
  const onChangePw = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPassword(e.target.value);
  }, []);
  const onTogglePWVisible = useCallback(() => {
    setPwVisible((v) => !v);
  }, []);
  return (
    <div className="container">
      <div className="auth">
        <div className="auth-header">
          <h5>{translate('login', l)}</h5>
          {loginStatus !== 'ok' && (
            <span className="text-danger bold">
              {translate(loginStatus, l)}
            </span>
          )}
          {user && isRegistered(user) && user.email === email && (
            <span className="text-success bold">
              {translate('logInSuccess', l)}
            </span>
          )}
        </div>
        <fieldset className="form">
          {loginStatus === 'pwWrong' && (
            <Row className="mb-2">
              <Col xs={12} md={6}>
                <span className="text-muted">{`${translate(
                  'pwForgot',
                  l,
                )} `}</span>
              </Col>
              <Col xs={12} md={6}>
                <Button
                  size="small"
                  type="button"
                  color="secondary"
                  onClick={() => {
                    pwForgot(email);
                    navigate('/confirm/login/forgot');
                  }}>
                  <span>{`${translate('resetPw', l)}`}</span>
                </Button>
              </Col>
            </Row>
          )}

          <FormGroup>
            <Label htmlFor="email">{translate('mailAddress', l)}</Label>

            <InputGroup>
              <Input
                type="text"
                name="email"
                id="email"
                onSubmit={onSubmitEmail}
                className={mailValid ? '' : 'invalid'}
                value={email}
                autoComplete="email-address"
                onChange={onChangeEmail}
                tabIndex={0}
                placeholder="info@clava-sports.com"
              />

              <div className="input-group-addon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password"> {translate('password', l)}</Label>

            <InputGroup>
              <Input
                type={pwVisible ? 'text' : 'password'}
                name="password"
                id="password"
                autoComplete="password"
                value={password}
                innerRef={pwInput}
                onSubmit={onLogin}
                className={loginStatus === 'failed' ? 'invalid' : ''}
                onChange={onChangePw}
                tabIndex={0}
                placeholder="********"
              />
              <button
                className={`input-group-addon${pwVisible ? ' active' : ''}`}
                onClick={onTogglePWVisible}
                type="button">
                <FontAwesomeIcon icon={faEye} />
              </button>
            </InputGroup>
          </FormGroup>
          <Row className="mt-2">
            <Col xs={12} md={6}>
              <Button
                color="primary"
                type="button"
                tabIndex={0}
                onClick={onLogin}>
                <span>{translate('login', l)}</span>
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <NavLink to="/register" className="text-decoration-underline">
                <span>{`${translate('not_registered', l)}? ${translate(
                  'registerNow',
                  l,
                )}`}</span>
              </NavLink>
            </Col>
          </Row>
        </fieldset>
      </div>
    </div>
  );
};

export default connector(Login);
// rel o ad
