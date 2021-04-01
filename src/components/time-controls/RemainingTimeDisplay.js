import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { formatTime } from '../../utils';

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

function RemainingTimeDisplay({
  player: { currentTime, duration },
  className
}) {
  const remainingTime = duration - currentTime;
  const formattedTime = formatTime(remainingTime);
  return (
    <div
      className={classNames(
        'cueplayer-react-remaining-time cueplayer-react-time-control cueplayer-react-control',
        className
      )}
    >
      <div className="cueplayer-react-remaining-time-display" aria-live="off">
        <span className="cueplayer-react-control-text">Remaining Time </span>
        {`-${formattedTime}`}
      </div>
    </div>
  );
}

RemainingTimeDisplay.propTypes = propTypes;
RemainingTimeDisplay.displayName = 'RemainingTimeDisplay';

export default RemainingTimeDisplay;
