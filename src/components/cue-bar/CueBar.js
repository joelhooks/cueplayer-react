import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.any,
  player: PropTypes.object,
  autoHide: PropTypes.bool,
  autoHideTime: PropTypes.number, // used in Player
  disableDefaultControls: PropTypes.bool,
  disableCompletely: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {
  autoHide: true,
  disableCompletely: false
};

export default class CueBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    const { player } = this.props;

    console.log(player.textTracks);

    const { textTracks = [] } = player;
    if (textTracks.length > 0) {
      Array.from(textTracks).forEach(textTrack => {
        console.log(textTrack);
      });
    }
  }

  render() {
    const { className, disableCompletely, children, player } = this.props;

    return disableCompletely ? null : (
      <div className={classNames('cueplayer-react-cue-bar', className)}>
        {children}
      </div>
    );
  }
}

CueBar.propTypes = propTypes;
CueBar.defaultProps = defaultProps;
CueBar.displayName = 'CueBar';
