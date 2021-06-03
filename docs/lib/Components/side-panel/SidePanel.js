import * as React from 'react'
import classNames from 'classnames'
import {isEmpty} from 'lodash'
import {usePlayer} from 'cueplayer-react/context/player-context'

const SidePanel = ({className, disableCompletely}) => {
  const {player} = usePlayer()

  const {activeMetadataTracks = []} = player

  const noteTracks = activeMetadataTracks.filter(track => {
    return track.label === 'notes'
  })

  const noteCues = noteTracks.reduce((acc, track) => {
    return [...acc, ...Array.from(track.cues || [])]
  }, [])

  disableCompletely = disableCompletely || isEmpty(noteCues)

  return disableCompletely ? null : (
    <div className={classNames('cueplayer-react-side-panel', className)}>
      {noteCues.map(cue => {
        const note = JSON.parse(cue.text)
        const active = cue === player.activeMetadataTrackCue

        return (
          <section
            className={classNames(
              'cueplayer-react-cue-note',
              {
                'cueplayer-react-cue-note-active': active,
                'cueplayer-react-cue-note-inactive': !active,
              },
              className,
            )}
          >
            <h1 className="font-bold">{note.title}</h1>
            {note.description}
          </section>
        )
      })}
    </div>
  )
}

export default SidePanel
