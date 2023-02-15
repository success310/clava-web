import React, { useContext, useEffect, useState } from 'react';

import {
  formatDate,
  getActualMatchMinute,
  matchStatusDate,
} from '../../../../config/utils';
import { ClavaContext } from '../../../../config/contexts';

const MatchStatusDisplay: React.FC<{
  startDate: number;
  hideLive?: boolean;
  matchLength: number;
  halftimeDuration: number;
}> = React.memo(
  ({ matchLength, halftimeDuration, startDate, hideLive }) => {
    const { l } = useContext(ClavaContext);
    const [status, setStatus] = useState(
      matchStatusDate(startDate, matchLength + halftimeDuration),
    );
    const [doAnim, setDoAnim] = useState(false);
    useEffect(() => {
      setDoAnim(true);
      setTimeout(() => {
        setDoAnim(false);
      }, 1000);
    }, [status]);
    useEffect(() => {
      const i = setInterval(() => {
        setStatus(matchStatusDate(startDate, matchLength + halftimeDuration));
      }, 10000);
      return () => {
        clearInterval(i);
      };
    }, [halftimeDuration, matchLength, startDate]);

    if (typeof status === 'number')
      return (
        <>
          {!hideLive && <strong className="live">LIVE</strong>}
          <div className={`match-status${doAnim ? ' bumb' : ''}`}>
            <strong className="live">
              {`${getActualMatchMinute(
                status,
                matchLength,
                halftimeDuration,
              ).toString(10)}'`}
            </strong>
          </div>
        </>
      );
    if (status) return <span>FT</span>;
    return <span>{formatDate(new Date(startDate), l, false, true)}</span>;
  },
  (prevProps, nextProps) => prevProps.startDate === nextProps.startDate,
);

MatchStatusDisplay.defaultProps = {
  hideLive: false,
};

export default MatchStatusDisplay;
