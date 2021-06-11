import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import CueNote from './CueNote'

const propTypes = {
  disableDefaultControls: PropTypes.bool,
  disableCompletely: PropTypes.bool,
  className: PropTypes.string,
}

const defaultProps = {
  disableCompletely: false,
}

const CueBar = ({className, disableCompletely, player, actions}) => {
  const {duration, activeMetadataTracks} = player
  const refCueBar = React.useRef()

  const noteTracks = activeMetadataTracks.filter(track => {
    return track.label === 'notes'
  })

  const noteCues = noteTracks.reduce((acc, track) => {
    return [...acc, ...Array.from(track.cues || [])]
  }, [])

  disableCompletely = disableCompletely || isEmpty(noteCues)

  return disableCompletely ? null : (
    <div
      ref={refCueBar}
      className={classNames('cueplayer-react-cue-bar', className)}
    >
      {noteCues.map(noteCue => {
        return (
          <CueNote
            key={noteCue.text}
            cue={noteCue}
            duration={duration}
            player={player}
            actions={actions}
            refCueBar={refCueBar}
          />
        )
      })}
    </div>
  )
}

export default CueBar

CueBar.propTypes = propTypes
CueBar.defaultProps = defaultProps
CueBar.displayName = 'CueBar'
