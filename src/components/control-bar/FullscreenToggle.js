import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const propTypes = {
  actions: PropTypes.object,
  player: PropTypes.object,
  className: PropTypes.string
};

export default class FullscreenToggle extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { player, actions } = this.props;
    actions.toggleFullscreen(player);
  }

  render() {
    const { player, className } = this.props;
    return (
      <button
        className={classNames(
          className,
          {
            'cueplayer-react-icon-fullscreen-exit': player.isFullscreen,
            'cueplayer-react-icon-fullscreen': !player.isFullscreen
          },
          'cueplayer-react-fullscreen-control cueplayer-react-control cueplayer-react-button cueplayer-react-icon'
        )}
        ref={c => {
          this.button = c;
        }}
        type="button"
        tabIndex="0"
        onClick={this.handleClick}
      >
        <span className="cueplayer-react-control-text">Non-Fullscreen</span>
      </button>
    );
  }
}

FullscreenToggle.propTypes = propTypes;
FullscreenToggle.displayName = 'FullscreenToggle';
