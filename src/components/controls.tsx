import * as React from 'react'

import {useAtom, atom} from 'jotai'
const testAtom = atom(33)

function VolumeSlider({
  initialVolume,
  onVolumeChange,
}: {
  initialVolume: number
  onVolumeChange: any
}) {
  const [volume, setVolume] = React.useState<number>(initialVolume)
  return (
    <input
      value={volume}
      type="range"
      min="0"
      max="100"
      onChange={(e) => {
        setVolume(Number(e.target.value))
        onVolumeChange(Number(e.target.value))
      }}
    />
  )
}

const Controls: React.FC<{player: any; fullscreenElem: any}> = ({
  player,
  fullscreenElem,
}) => {
  const percentComplete = React.useRef(0)
  const [test, setTest] = useAtom(testAtom)

  function onPlayerProgress(e: any) {
    console.log(e)
    const player = e.target as HTMLMediaElement
    console.log(player.currentTime / player.duration)
    const percent = player.currentTime / player.duration
    if (percent) setTest(percent * 100)
  }

  function onVolumeChange(e: any) {
    const player = e.target as HTMLMediaElement
    console.log(player.volume)
  }

  function onPlay(e: any) {
    const player = e.target as HTMLMediaElement
    console.log(player.duration)
  }

  function onPause(e: any) {
    const player = e.target as HTMLMediaElement
    console.log(player.currentTime / player.duration)
  }

  React.useEffect(() => {
    if (!player) return

    // subtitles on
    for (var i = 0; i < player.textTracks.length; i++) {
      player.textTracks[i].mode = 'showing'
    }

    player.addEventListener('timeupdate', onPlayerProgress)
    player.addEventListener('volumechange', onVolumeChange)
    player.addEventListener('pause', onPause)
    player.addEventListener('play', onPlay)
    return () => {
      player.removeEventListener('timeupdate', onPlayerProgress)
      player.removeEventListener('volumechange', onVolumeChange)
      player.removeEventListener('pause', onPause)
      player.removeEventListener('play', onPlay)
    }
  }, [player])

  // onPause,
  // onEnded,
  // onError,
  // onPlayerProgress,*
  // onSubtitleChange,
  // onVideoQualityChanged,
  // onMuted,
  // onViewModeChanged,
  // volumechanged*
  // stallstarted
  // stallended
  // unmuted
  // mute

  // onPlay
  // onReady

  // play
  // pause
  // isFullscreen
  // stop
  // seekTo
  // getCurrentTime
  // setVolume
  // setPlaybackRate
  // getDuration
  // getFractionPlayed
  // getFractionLoaded
  // getTimeToSeekSeconds
  //

  const percent = (player && player.currentTime / player.duration) || 0
  return (
    <div>
      <input
        value={test}
        type="range"
        min="0"
        max="100"
        readOnly
        style={{maxWidth: '600px'}}
      />
      <button onClick={() => player.play()}>play</button>
      <button onClick={() => player.pause()}>pause</button>
      <button onClick={() => fullscreenElem.requestFullscreen()}>
        full screen
      </button>
      <VolumeSlider
        initialVolume={80}
        onVolumeChange={(volume: number) => {
          player.volume = volume / 100
        }}
      />
    </div>
  )
}

export default Controls
