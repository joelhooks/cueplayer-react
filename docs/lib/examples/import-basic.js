import React from 'react'
import {Player} from 'cueplayer-react'
import {PlayerProvider} from 'cueplayer-react/context/player-context'
import SidePanel from '../Components/side-panel/SidePanel'
import CueBar from '../Components/cue-bar/CueBar'

export default props => {
  return (
    <PlayerProvider>
      {/* <div style={{display: 'flex'}}>
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
        </Player>
        <SidePanel />
      </div> */}
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
        <CueBar />
      </Player>
    </PlayerProvider>
  )
}
