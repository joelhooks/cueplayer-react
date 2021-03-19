import React from 'react'
import {useVideo} from './components/player'

import Controls from './components/controls'
import {usePlayerStore} from './components/player'

//see: https://github.com/video-dev/hls.js/blob/master/docs/API.md

// interesting for API reference https://github.com/delphiki/Playr/blob/master/playr.js

const video = {
  poster:
    'https://dcv19h61vib2d.cloudfront.net/thumbs/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL.jpg',
  hls_url:
    'https://d2c5owlt6rorc3.cloudfront.net/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL/hls/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL.m3u8',
  subtitlesUrl:
    'https://app.egghead.io/api/v1/lessons/react-use-jsx-effectively-with-react/subtitles',
}

export default function App() {
  const containerRef = React.createRef<any>()

  const {Video, player} = useVideo({
    url: video.hls_url,
  })

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        maxWidth: '600px',
      }}
    >
      <Video poster={video.poster} playsInline>
        <track
          src={video.subtitlesUrl}
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
      </Video>
      {player && <Controls player={player} fullscreenElemRef={containerRef} />}
    </div>
  )
}
