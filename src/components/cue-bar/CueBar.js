import * as React from 'react'
import classNames from 'classnames'
import {useCue} from './use-cue'

const CueBar = ({className, disableCompletely, player, actions}) => {
  const {duration, activeMetadataTracks} = player

  const noteTracks = activeMetadataTracks.filter(track => {
    return track.label === 'notes'
  })

  const noteCues = noteTracks.reduce((acc, track) => {
    return [...acc, ...Array.from(track.cues || [])]
  }, [])

  return disableCompletely ? null : (
    <div className={classNames('cueplayer-react-cue-bar', className)}>
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
