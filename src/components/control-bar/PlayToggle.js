import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const propTypes = {
  actions: PropTypes.object,
  player: PropTypes.object,
  className: PropTypes.string
};

export default class PlayToggle extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { actions, player } = this.props;
    if (player.paused) {
      actions.play();
    } else {
      actions.pause();
    }
  }

  render() {
    const { player, className } = this.props;
    const controlText = player.paused ? 'Play' : 'Pause';

    return (
      <button
        ref={c => {
          this.button = c;
        }}
        className={classNames(className, {
          'cueplayer-react-play-control': true,
          'cueplayer-react-control': true,
          'cueplayer-react-button': true,
          'cueplayer-react-paused': player.paused,
          'cueplayer-react-playing': !player.paused
        })}
        type="button"
        tabIndex="0"
        onClick={this.handleClick}
      >
        <span className="cueplayer-react-control-text">{controlText}</span>
      </button>
    );
  }
}

PlayToggle.propTypes = propTypes;
PlayToggle.displayName = 'PlayToggle';
