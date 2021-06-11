import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {useCue} from './use-cue'

const CuePopupPropTypes = {
  cue: PropTypes.object,
  active: PropTypes.bool,
}

const cuePopupDefaultProps = {
  cue: {},
  active: false,
}

export const CuePopup = ({cue, active, refCueBar}) => {
  const refPopup = React.useRef()
  const note = JSON.parse(cue.text)
  return active ? (
    <div ref={refPopup} className="cueplayer-react-cue-popup">
      {note?.title}
    </div>
  ) : null
}

CuePopup.propTypes = CuePopupPropTypes
CuePopup.defaultProps = cuePopupDefaultProps
CuePopup.displayName = 'CuePopup'

const CueNote = ({cue, duration, className, actions, player, refCueBar}) => {
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
      <CuePopup cue={cue} active={active} refCueBar={refCueBar} />
    </div>
  )
}

export default CueNote
