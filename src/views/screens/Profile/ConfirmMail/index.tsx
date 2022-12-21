import { ConnectedProps } from 'react-redux/es/exports';
import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, FormGroup, Input, InputGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-regular-svg-icons';
import { connector } from './redux';
import { ClavaContext } from '../../../../config/contexts';
import { translate } from '../../../../config/translator';
import { generatePW } from '../../../../config/utils';

const ConfirmMail: React.FC<ConnectedProps<typeof connector>> = ({
  user,
  confirmMail,
  pwReset,
  registerStatus,
}) => {
  const { l } = useContext(ClavaContext);
  const { redirectAfter, pwForgot } = useParams();
  const [code, setCode] = useState<string[]>(Array(5).fill(''));
  const [curIdx, setCurIdx] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [userID, setUserId] = useState(user?.id ?? -1);
  const passInput = useRef<HTMLInputElement>();
  const inputs = useRef<HTMLInputElement[]>([]);
  const [pwVisible, setPwVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const pwValid = useMemo(
    () => registerStatus !== 'pwNotSame' && registerStatus !== 'pwNotValid',
    [registerStatus],
  );
  const pwRepValid = useMemo(
    () => registerStatus !== 'pwNotSame',
    [registerStatus],
  );
  useEffect(() => {
    if (user) setUserId(user.id);
  }, [user]);
  const onChange = useMemo<ChangeEventHandler<HTMLInputElement>>(
    () => (e) => {
      const val = parseInt(e.target.value, 10);
      if (Number.isNaN(val)) return;
      code[curIdx] = e.target.value.trim();
      const newCode = code.map((st: string, i) =>
        i === curIdx ? e.target.value : st,
      );
      setCode(newCode);
      if (e.target.value === '') {
        setCurIdx(curIdx - 1);
      } else {
        setCurIdx(curIdx + 1);
        if (curIdx + 1 >= 5) {
          if (!pwForgot) confirmMail(newCode.join(''));
          else {
            passInput.current?.focus();
          }
        } else {
          inputs.current[curIdx + 1].focus();
        }
      }
    },
    [pwForgot, code, confirmMail, curIdx],
  );
  useEffect(() => {
    if (
      (user && user.emailConfirmed && !pwForgot) ||
      (pwForgot && user && userID !== user.id)
    )
      setTimeout(() => {
        navigate(redirectAfter || '/profile');
      }, 500);
  }, [user, navigate, redirectAfter, pwForgot, userID]);

  const onChangePw = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangePwRepeat = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setPasswordRepeat(e.target.value);
    },
    [],
  );
  const onTogglePWVisible = useCallback(() => {
    setPwVisible((v) => !v);
  }, []);
  const codeKeys = useMemo(
    () => [
      generatePW(12),
      generatePW(12),
      generatePW(12),
      generatePW(12),
      generatePW(12),
    ],
    [],
  );
  return (
    <div className="container">
      <div className="auth">
        <div className="auth-header">
          <h5>{translate(pwForgot ? 'confirmMail' : 'pwForgotMail', l)}</h5>
          {registerStatus !== 'ok' && (
            <span className="text-danger">{translate('codeInvalid', l)}</span>
          )}
        </div>
        <fieldset className="form">
          <FormGroup className="code-container">
            <Label>{translate('code', l)}</Label>
            <div className="code">
              {codeKeys.map((key, index) => (
                <input
                  key={`text-input-${key}`}
                  onFocus={() => {
                    setCurIdx(index);
                    setCode(
                      code.map((st: string, i) => (i === index ? '' : st)),
                    );
                  }}
                  value={code[index]}
                  maxLength={1}
                  ref={(el) => {
                    if (el) inputs.current[index] = el;
                  }}
                  autoComplete="off"
                  onChange={onChange}
                />
              ))}
            </div>
          </FormGroup>
          {pwForgot && (
            <>
              <FormGroup>
                <Label htmlFor="password"> {translate('password', l)}</Label>

                <InputGroup>
                  <Input
                    type={pwVisible ? 'text' : 'password'}
                    name="password"
                    autoComplete="password"
                    value={password}
                    innerRef={(r) => {
                      if (r) passInput.current = r as HTMLInputElement;
                    }}
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
            </>
          )}
          <Button
            color="primary"
            onPress={() => {
              if (pwForgot) pwReset(password, passwordRepeat, code.join(''));
              else confirmMail(code.join(''));
            }}
            size="large">
            <span>{translate('submit', l)}</span>
          </Button>
        </fieldset>
      </div>
    </div>
  );
};
export default connector(ConfirmMail);
// reload
