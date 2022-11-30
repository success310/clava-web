import React, { useEffect, useState } from 'react';

const MatchScoreDisplay: React.FC<{
  goal1: number;
  goal2?: number;
  className: string;
}> = ({ goal1, goal2, className }) => {
  const [doAnim, setDoAnim] = useState(false);
  useEffect(() => {
    setDoAnim(true);
    setTimeout(() => {
      setDoAnim(false);
    }, 1000);
  }, [goal1, goal2]);

  return (
    <div className={`match-score${doAnim ? ' bumb' : ''}`}>
      <span className={className}>
        {goal1 + (goal2 !== undefined ? ` - ${goal2}` : '')}
      </span>
    </div>
  );
};

MatchScoreDisplay.defaultProps = {
  goal2: undefined,
};

export default MatchScoreDisplay;
