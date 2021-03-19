import * as React from 'react'
import ReactSlider from 'react-slider'
import {formatTime} from '../utils/format-time'
import Captions from './captions'

// this was just a small experiment but the overall player should have some
// "store" concept

import {usePlayerStore} from './player'

function VolumeSlider({
  initialVolume,
  onVolumeChange,
}: {
  initialVolume: number
  onVolumeChange: any
}) {
  const [volume, setVolume] = React.useState<number>(initialVolume)
  return (
    <label>
      volume
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
    </label>
  )
}

const Controls: React.FC<{player: any; fullscreenElemRef: any}> = ({
  player,
  fullscreenElemRef,
}) => {
  const [test, setTest] = React.useState(0)
  const [volume, setVolume] = React.useState(30)

  const currentTime: any = usePlayerStore((state) => state.currentTime)
  const duration: any = usePlayerStore((state) => state.duration)

  const dispatch: any = usePlayerStore((state) => state.dispatch)

  console.log(currentTime, duration)
  function getPercent() {
    const {currentTime, seekingTime, duration} = player
    const time = seekingTime || currentTime
    const percent = time / duration
    return percent >= 1 ? 1 : percent
  }

  function onPlayerProgress(e: any) {
    const player = e.target as HTMLMediaElement
    // console.log(player.currentTime / player.duration)
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
    console.log('VOLUME EFFECT')
    player.volume = volume / 100
  }, [player, volume])

  React.useEffect(() => {
    if (!player) return

    // subtitles on
    for (var i = 0; i < player.textTracks.length; i++) {
      player.textTracks[i].mode = 'hidden'
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        maxWidth: '600px',
      }}
    >
      <Captions />
      {/* styled via global CSS */}
      <ReactSlider
        max={duration}
        value={currentTime}
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        onAfterChange={(value) => {
          dispatch({type: 'TIME_CHANGE', currentTime: value})
          player.currentTime = value
        }}
        onChange={(value) => {
          dispatch({type: 'TIME_CHANGE', currentTime: value})
          player.currentTime = value
        }}
        renderThumb={(props, state) => (
          <div {...props}>{formatTime(state.valueNow)}</div>
        )}
      />

      <button onClick={() => player.play()}>play</button>
      <button onClick={() => player.pause()}>pause</button>
      <button onClick={() => fullscreenElemRef.current.requestFullscreen()}>
        full screen
      </button>
      <VolumeSlider
        initialVolume={volume}
        onVolumeChange={(volume: number) => {
          console.log(volume)
          setVolume(volume)
        }}
      />
    </div>
  )
}

export default Controls

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
