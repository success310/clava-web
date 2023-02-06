import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ConnectedProps } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  NavLink,
  Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-regular-svg-icons';
import { connector } from './redux';
import { ClavaContext } from '../../../../config/contexts';
import { translate } from '../../../../config/translator';

const Register: React.FC<ConnectedProps<typeof connector>> = ({
  submit,
  registerStatus,
  user,
  reset,
}) => {
  const { l } = useContext(ClavaContext);
  const { redirectAfter } = useParams();
  const navigate = useNavigate();
  const [givenName, setGivenName] = useState<string>('');
  const [familyName, setFamilyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [newsletter, setNewsletter] = useState<boolean>(false);
  const [agbLevel, setAgbLevel] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [pwVisible, setPwVisible] = useState<boolean>(false);
  useEffect(() => {
    reset();
  }, [reset]);
  const mailValid = useMemo(
    () => registerStatus !== 'mailGiven' && registerStatus !== 'mailInvalid',
    [registerStatus],
  );
  const telValid = useMemo(
    () => registerStatus !== 'telGiven' && registerStatus !== 'telInvalid',
    [registerStatus],
  );
  const pwValid = useMemo(
    () => registerStatus !== 'pwNotSame' && registerStatus !== 'pwNotValid',
    [registerStatus],
  );
  const pwRepValid = useMemo(
    () => registerStatus !== 'pwNotSame',
    [registerStatus],
  );
  useEffect(() => {
    if (user && user.emailConfirmed)
      setTimeout(() => {
        navigate(redirectAfter || '/profile');
      }, 500);
    if (user && user.email)
      setTimeout(() => {
        navigate(`/confirm${redirectAfter ? `/${redirectAfter}` : ''}`);
      }, 500);
  }, [user, navigate, redirectAfter]);

  const onChangeEmail = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setEmail(e.target.value);
    },
    [],
  );
  const onChangeTel = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTel(e.target.value);
  }, []);
  const onChangePw = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangeGivenName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setGivenName(e.target.value);
    },
    [],
  );
  const onChangeFamilyName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setFamilyName(e.target.value);
    },
    [],
  );
  const onChangePwRepeat = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setPasswordRepeat(e.target.value);
    },
    [],
  );
  const onTogglePWVisible = useCallback(() => {
    setPwVisible((v) => !v);
  }, []);
  const onToggleAgb = useCallback(() => {
    setAgbLevel((a) => !a);
  }, []);
  const onToggleNewsletter = useCallback(() => {
    setNewsletter((a) => !a);
  }, []);
  const onSubmit = useCallback(() => {
    if (agbLevel)
      submit(
        givenName,
        familyName,
        email,
        password,
        passwordRepeat,
        tel,
        newsletter,
      );
  }, [
    agbLevel,
    submit,
    givenName,
    familyName,
    email,
    password,
    passwordRepeat,
    tel,
    newsletter,
  ]);
  return (
    <div className="container">
      <div className="auth">
        <div className="auth-header">
          <h5>{translate('register', l)}</h5>
          {registerStatus !== 'ok' && (
            <span className="text-danger bold">
              {translate(registerStatus, l)}
            </span>
          )}
          {registerStatus === 'mailGiven' && (
            <NavLink to="/register" className="text-decoration-underline">
              <span>{`${translate('alreadyRegistered', l)} ${translate(
                'login',
                l,
              )}`}</span>
            </NavLink>
          )}
        </div>
        <fieldset className="form">
          <FormGroup>
            <Label htmlFor="givenName">{translate('givenName', l)}</Label>
            <InputGroup>
              <Input
                type="text"
                name="givenName"
                id="givenName"
                autoComplete="name-given"
                value={givenName}
                onChange={onChangeGivenName}
                tabIndex={0}
                placeholder="Max"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="familyName">{translate('familyName', l)}</Label>
            <InputGroup>
              <Input
                type="text"
                name="familyName"
                id="familyName"
                autoComplete="name-family"
                value={familyName}
                onChange={onChangeFamilyName}
                tabIndex={0}
                placeholder="Mustermann"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">{translate('mailAddress', l)}</Label>
            <InputGroup>
              <Input
                type="text"
                name="email"
                id="email"
                className={mailValid ? '' : 'invalid'}
                autoComplete="email-address"
                value={email}
                onChange={onChangeEmail}
                tabIndex={0}
                placeholder="max@mustermann.com"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="tel">{translate('tel', l)}</Label>
            <InputGroup>
              <Input
                type="text"
                name="tel"
                id="tel"
                className={telValid ? '' : 'invalid'}
                autoComplete="tel"
                value={tel}
                onChange={onChangeTel}
                tabIndex={0}
                placeholder="+39 0123456789"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password"> {translate('password', l)}</Label>

            <InputGroup>
              <Input
                type={pwVisible ? 'text' : 'password'}
                name="password"
                autoComplete="password"
                value={password}
                className={pwValid ? '' : 'invalid'}
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
          <FormGroup>
            <Label htmlFor="passwordRepeat">
              {translate('passwordRepeat', l)}
            </Label>

            <InputGroup>
              <Input
                type={pwVisible ? 'text' : 'password'}
                name="passwordRepeat"
                id="passwordRepeat"
                value={passwordRepeat}
                className={pwRepValid ? '' : 'invalid'}
                onChange={onChangePwRepeat}
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
              <FormGroup>
                <Label htmlFor="agbLevel">
                  {translate('acceptAgb1', l)}
                  <a
                    href="https://www.clava-sports.com/tos.html"
                    className="nav-link">
                    {translate('tos', l)}
                  </a>
                  {translate('acceptAgb2', l)}
                  <a
                    href="https://www.clava-sports.com/privacy.html"
                    className="nav-link">
                    {translate('privacy', l)}
                  </a>
                  {translate('acceptAgb3', l)}
                </Label>
                <Input
                  type="checkbox"
                  onClick={onToggleAgb}
                  checked={agbLevel}
                  id="agbLevel"
                  name="agbLevel"
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="newsletter">
                  {translate('wantNewsletter', l)}
                </Label>
                <Input
                  type="checkbox"
                  onClick={onToggleNewsletter}
                  checked={newsletter}
                  id="newsletter"
                  name="newsletter"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xs={12} md={6}>
              <Button size="large" onClick={onSubmit}>
                <span>{translate('registerNow', l)}</span>
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <NavLink to="/register" className="text-decoration-underline">
                <span>{`${translate('alreadyRegistered', l)} ${translate(
                  'login',
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
export default connector(Register);
