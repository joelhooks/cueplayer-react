import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { formatTime } from '../../utils';

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

function CurrentTimeDisplay({ player: { currentTime, duration }, className }) {
  const formattedTime = formatTime(currentTime, duration);
  return (
    <div
      className={classNames(
        'cueplayer-react-current-time cueplayer-react-time-control cueplayer-react-control',
        className
      )}
    >
      <div className="cueplayer-react-current-time-display" aria-live="off">
        <span className="cueplayer-react-control-text">Current Time </span>
        {formattedTime}
      </div>
    </div>
  );
}

CurrentTimeDisplay.propTypes = propTypes;
CurrentTimeDisplay.displayName = 'CurrentTimeDisplay';

export default CurrentTimeDisplay;
