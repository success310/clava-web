import React, { useContext, useEffect, useState } from 'react';

import { formatDate, matchStatusDate } from '../../../../config/utils';
import { ClavaContext } from '../../../../config/contexts';

const MatchStatusDisplay: React.FC<{ startDate: number; hideLive?: boolean }> =
  React.memo(
    ({ startDate, hideLive }) => {
      const { l } = useContext(ClavaContext);
      const [status, setStatus] = useState(matchStatusDate(startDate));
      const [doAnim, setDoAnim] = useState(false);
      useEffect(() => {
        setDoAnim(true);
        setTimeout(() => {
          setDoAnim(false);
        }, 1000);
      }, [status]);
      useEffect(() => {
        const i = setInterval(() => {
          setStatus(matchStatusDate(startDate));
        }, 10000);
        return () => {
          clearInterval(i);
        };
      }, []);

      if (typeof status === 'number')
        return (
          <>
            {!hideLive && <strong className="live">LIVE</strong>}
            <div className={`match-status${doAnim ? ' bumb' : ''}`}>
              <strong className="live">
                {status > 45 && status < 60
                  ? "45'"
                  : status < 60
                  ? `${status.toString()}'`
                  : `${(status - 15).toString()}'`}
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
