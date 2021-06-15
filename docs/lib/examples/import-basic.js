import React from 'react'
import {
  Player,
  BigPlayButton,
  ControlBar,
  ReplayControl,
  ClosedCaptionButton,
  PlayToggle,
  ForwardControl,
  VolumeMenuButton,
  CurrentTimeDisplay,
  TimeDivider,
  DurationDisplay,
  ProgressControl,
  RemainingTimeDisplay,
  PlaybackRateMenuButton,
  FullscreenToggle,
  PlayerProvider,
  usePlayer,
} from 'cueplayer-react'
import CueBar from '../Components/cue-bar/CueBar'

export default () => {
  const container = React.useRef()
  return (
    <PlayerProvider>
      <div ref={container} style={{display: 'flex'}}>
        <Player
          autoPlay
          muted
          src="https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4"
          crossOrigin="anonymous"
        >
          <track
            id="notes"
            src="https://gist.githubusercontent.com/joelhooks/bd3c1d68cb5a67adfcd6c035200d1fde/raw/aa7060f584e04db26c5fa6b464bf2058ed6f6e93/notes.vtt"
            kind="metadata"
            label="notes"
          />
          <ControlBar disableDefaultControls autoHide={false}>
            <PlayToggle key="play-toggle" order={1} />
            <ReplayControl key="replay-control" order={2} />
            <ForwardControl key="forward-control" order={3} />
            <VolumeMenuButton key="volume-menu-button" order={4} />
            <CurrentTimeDisplay key="current-time-display" order={5} />
            <TimeDivider key="time-divider" order={6} />
            <DurationDisplay key="duration-display" order={7} />
            <RemainingTimeDisplay key="remaining-time-display" order={9} />
            <PlaybackRateMenuButton
              rates={[1, 1.25, 1.5, 2]}
              key="playback-rate"
              order={10}
            />
            <ClosedCaptionButton order={11} />
            <FullscreenToggle
              key="fullscreen-toggle"
              fullscreenElement={container.current}
              order={12}
            />
          </ControlBar>
          <CueBar />
        </Player>
      </div>
    </PlayerProvider>
  )
}
