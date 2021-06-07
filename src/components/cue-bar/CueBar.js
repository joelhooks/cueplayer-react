import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import {useCue} from './use-cue'

import CueNote from './CueNote'

const propTypes = {
  autoHide: PropTypes.bool,
  autoHideTime: PropTypes.number, // used in Player
  disableDefaultControls: PropTypes.bool,
  disableCompletely: PropTypes.bool,
  className: PropTypes.string,
}

const defaultProps = {
  autoHide: true,
  disableCompletely: false,
}

const CueBar = ({className, disableCompletely, player, actions, autoHide}) => {
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
      className={classNames(
        'cueplayer-react-cue-bar',
        {'cueplayer-react-cue-bar-auto-hide': autoHide},
        className,
      )}
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
