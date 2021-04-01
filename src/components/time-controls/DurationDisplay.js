import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { formatTime } from '../../utils';

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

function DurationDisplay({ player: { duration }, className }) {
  const formattedTime = formatTime(duration);
  return (
    <div
      className={classNames(
        className,
        'cueplayer-react-duration cueplayer-react-time-control cueplayer-react-control'
      )}
    >
      <div className="cueplayer-react-duration-display" aria-live="off">
        <span className="cueplayer-react-control-text">Duration Time </span>
        {formattedTime}
      </div>
    </div>
  );
}

DurationDisplay.propTypes = propTypes;
DurationDisplay.displayName = 'DurationDisplay';

export default DurationDisplay;
