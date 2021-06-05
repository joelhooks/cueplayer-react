import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import {useCue} from './use-cue'

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

  const noteTracks = activeMetadataTracks.filter(track => {
    return track.label === 'notes'
  })

  const noteCues = noteTracks.reduce((acc, track) => {
    return [...acc, ...Array.from(track.cues || [])]
  }, [])

  disableCompletely = disableCompletely || isEmpty(noteCues)

  return disableCompletely ? null : (
    <div
      className={classNames(
        'cueplayer-react-cue-bar',
        {'cueplayer-react-cue-bar-auto-hide': autoHide},
        className,
      )}
    >
      {noteCues.map(noteCue => {
        return (
          <NoteCue
            key={noteCue.text}
            cue={noteCue}
            duration={duration}
            player={player}
            actions={actions}
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

const CuePopup = ({cue, active}) => {
  const note = JSON.parse(cue.text)
  return active ? (
    <div className="cueplayer-react-cue-popup">{note?.title}</div>
  ) : null
}

const NoteCue = ({cue, duration, className, actions, player}) => {
  const setActive = useCue(cue, actions)
  const [persist, setPersist] = React.useState(false)
  const active = cue === player.activeMetadataTrackCue
  const startPosition = `${(cue.startTime / duration) * 100}%`

  return (
    <div
      className={classNames(
        'cueplayer-react-cue-note',
        {
          'cueplayer-react-cue-note-active': active,
          'cueplayer-react-cue-note-inactive': !active,
        },
        className,
      )}
      style={{left: startPosition}}
      onClick={() => {
        if (active && !persist) {
          setPersist(true)
        } else if (active) {
          setActive(false)
          setPersist(false)
        } else {
          setActive(true)
          setPersist(true)
        }
      }}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => !persist && setActive(false)}
    >
      <CuePopup cue={cue} active={active} />
    </div>
  )
}
