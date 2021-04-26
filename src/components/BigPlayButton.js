import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const propTypes = {
  actions: PropTypes.object,
  player: PropTypes.object,
  position: PropTypes.string,
  className: PropTypes.string
};

const defaultProps = {
  position: 'left'
};

export default class BigPlayButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {}

  handleClick() {
    const { actions } = this.props;
    actions.play();
  }

  render() {
    const { player, position } = this.props;
    return (
      <button
        className={classNames(
          'cueplayer-react-button',
          'cueplayer-react-big-play-button',
          `cueplayer-react-big-play-button-${position}`,
          this.props.className,
          {
            'big-play-button-hide': player.hasStarted || !player.currentSrc
          }
        )}
        type="button"
        aria-live="polite"
        tabIndex="0"
        onClick={this.handleClick}
      >
        <span className="cueplayer-react-control-text">Play Video</span>
      </button>
    );
  }
}

BigPlayButton.propTypes = propTypes;
BigPlayButton.defaultProps = defaultProps;
BigPlayButton.displayName = 'BigPlayButton';
