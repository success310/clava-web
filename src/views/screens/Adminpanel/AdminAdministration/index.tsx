import { ConnectedProps } from 'react-redux';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ClavaContext } from '../../../../config/contexts';
import { translate } from '../../../../config/translator';
import { connector } from './redux';
import TextInput from '../TextInput';
import {
  CACHE_TASK,
  SQUAD_TASK,
  STATISTICS_TASK,
} from '../../../../store/actions/types';
import Loading from '../../../components/Loading';
import CheckboxInput from '../CheckboxInput';
import { AS_ADMIN_KEY } from '../../../../config/constants';

const AdminpanelAdministration: React.FC<ConnectedProps<typeof connector>> = ({
  createTask,
  status,
  error,
}) => {
  const { l } = useContext(ClavaContext);
  const [key, setKey] = useState(localStorage.getItem(AS_ADMIN_KEY) ?? '');
  const [saveKey, setSaveKey] = useState(false);
  const taskSend = useRef(false);
  const onClearCache = useCallback(() => {
    taskSend.current = true;
    if (saveKey) localStorage.setItem(AS_ADMIN_KEY, key);
    createTask(key, CACHE_TASK);
  }, [createTask, key, saveKey]);
  const onRecalculateSquad = useCallback(() => {
    taskSend.current = true;
    createTask(key, SQUAD_TASK);
    if (saveKey) localStorage.setItem(AS_ADMIN_KEY, key);
  }, [createTask, key, saveKey]);
  const onRecalculateStat = useCallback(() => {
    taskSend.current = true;
    createTask(key, STATISTICS_TASK);
    if (saveKey) localStorage.setItem(AS_ADMIN_KEY, key);
  }, [createTask, key, saveKey]);
  return (
    <div>
      <fieldset className="form open">
        <TextInput label="key" onChange={setKey} value={key} name="key" />
        <CheckboxInput
          label="saveKey"
          onChange={setSaveKey}
          name="saveKey"
          value={saveKey}
        />
        {taskSend.current && (
          <>
            {status === 'idle' && (
              <span className="text-success">
                {translate('taskCreateSuccess', l)}
              </span>
            )}
            {status === 'loading' && <Loading small />}
            {status === 'failed' && (
              <span className="text-danger">
                {translate('taskCreateFailed', l)}
                <br />
                {error}
              </span>
            )}
          </>
        )}

        <Row className="mt-2 text-center">
          <Col xs={12}>
            <Button
              color="primary"
              disabled={key === ''}
              onClick={onClearCache}>
              <span>{translate('clearCache', l)}</span>
            </Button>
          </Col>
        </Row>
        <Row className="mt-2 text-center">
          <Col xs={12}>
            <Button
              color="primary"
              disabled={key === ''}
              onClick={onRecalculateSquad}>
              <span>{translate('recalculateSqua', l)}</span>
            </Button>
          </Col>
        </Row>
        <Row className="mt-2 text-center">
          <Col xs={12}>
            <Button
              color="primary"
              disabled={key === ''}
              onClick={onRecalculateStat}>
              <span>{translate('recalculateStat', l)}</span>
            </Button>
          </Col>
        </Row>
      </fieldset>
    </div>
  );
};

export default connector(AdminpanelAdministration);
// rel
