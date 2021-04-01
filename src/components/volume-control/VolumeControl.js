import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import VolumeBar from './VolumeBar';

const propTypes = {
  className: PropTypes.string
};

export default function VolumeControl({ className, ...rest }) {
  return (
    <div
      className={classNames(
        className,
        'cueplayer-react-volume-control cueplayer-react-control'
      )}
    >
      <VolumeBar {...rest} />
    </div>
  );
}

VolumeControl.propTypes = propTypes;
VolumeControl.displayName = 'VolumeControl';
