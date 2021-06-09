import PropTypes from 'prop-types'
import React, {Component} from 'react'
import classNames from 'classnames'

import * as Dom from '../../utils/dom'
import SeekBar from './SeekBar'

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string,
}

export default class ProgressControl extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseTime: {
        time: null,
        position: 0,
      },
    }

    this.handleMouseMoveThrottle = this.handleMouseMove.bind(this)
  }

  handleMouseMove(event) {
    if (!event.pageX) {
      return
    }
    const {
      player: {duration},
    } = this.props
    const node = this.seekBar
    const newTime = Dom.getPointerPosition(node, event).x * duration
    const position = event.pageX - Dom.findElPosition(node).left

    this.setState({
      mouseTime: {
        time: newTime,
        position,
      },
    })
  }

  render() {
    const {className} = this.props
    return (
      <div
        onMouseMove={this.handleMouseMoveThrottle}
        className={classNames(
          'cueplayer-react-progress-control cueplayer-react-control',
          className,
        )}
      >
        <SeekBar
          mouseTime={this.state.mouseTime}
          ref={c => {
            this.seekBar = c
          }}
          {...this.props}
        />
      </div>
    )
  }
}

ProgressControl.propTypes = propTypes
ProgressControl.displayName = 'ProgressControl'
