import PropTypes from 'prop-types'
import React, {Component} from 'react'
import classNames from 'classnames'
import fullscreen from '../../utils/fullscreen'

const propTypes = {
  actions: PropTypes.object,
  player: PropTypes.object,
  className: PropTypes.string,
  fullscreenElement: PropTypes.any,
  onFullscreenChange: PropTypes.func,
}

export default class FullscreenToggle extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this)
  }

  componentDidMount() {
    fullscreen.addEventListener(this.handleFullScreenChange)
  }

  componentWillUnmount() {
    fullscreen.removeEventListener(this.handleFullScreenChange)
  }

  handleFullScreenChange(event) {
    const {fullscreenElement, actions, onFullscreenChange} = this.props

    if (event.target === fullscreenElement) {
      actions.handleFullscreenChange(fullscreen.isFullscreen)
    }

    if (onFullscreenChange) {
      onFullscreenChange(fullscreen.isFullscreen)
    }
  }

  handleClick() {
    const {player, actions, fullscreenElement} = this.props

    actions.toggleFullscreen(player, fullscreenElement)
  }

  render() {
    const {player, className} = this.props
    return (
      <button
        className={classNames(
          className,
          {
            'cueplayer-react-icon-fullscreen-exit': player.isFullscreen,
            'cueplayer-react-icon-fullscreen': !player.isFullscreen,
          },
          'cueplayer-react-fullscreen-control cueplayer-react-control cueplayer-react-button cueplayer-react-icon',
        )}
        ref={c => {
          this.button = c
        }}
        type="button"
        tabIndex="0"
        onClick={this.handleClick}
      >
        <span className="cueplayer-react-control-text">Non-Fullscreen</span>
      </button>
    )
  }
}

FullscreenToggle.propTypes = propTypes
FullscreenToggle.displayName = 'FullscreenToggle'
