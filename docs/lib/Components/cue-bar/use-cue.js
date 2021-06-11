import * as React from 'react'

export const useCue = (cue, actions) => {
  const setActive = React.useCallback(
    function setActive(active) {
      if (active) {
        actions.activateMetadataTrackCue(cue)
      } else {
        actions.activateMetadataTrackCue(null)
      }
    },
    [actions],
  )

  React.useEffect(() => {
    const enterCue = () => {
      setActive(true)
    }

    const exitCue = () => {
      setActive(false)
    }

    cue.addEventListener('enter', enterCue)
    cue.addEventListener('exit', exitCue)

    return () => {
      cue.removeEventListener('enter', enterCue)
      cue.removeEventListener('exit', exitCue)
    }
  }, [cue, setActive])

  return setActive
}
