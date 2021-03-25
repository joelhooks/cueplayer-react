import React from 'react'
import Head from 'next/head'
import DarkModeToggle from '../components/dark-mode-toggle'
import {useVideo} from '../../src/components/player'
import Controls from '../../src/components/controls'

const video = {
    poster:
        'https://dcv19h61vib2d.cloudfront.net/thumbs/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL.jpg',
    hls_url:
        'https://d2c5owlt6rorc3.cloudfront.net/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL/hls/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL.m3u8',
    subtitlesUrl:
        'https://app.egghead.io/api/v1/lessons/react-use-jsx-effectively-with-react/subtitles',
}

export default function Home() {
    const containerRef = React.createRef<any>()
    const {Video, player} = useVideo({
        url: video.hls_url,
    })

  return (
    <div className="dark:bg-gray-800">
      <Head>
        <title>Next.js, TypeScript, Tailwind, Jest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className=" text-3xl text-pink-500" css={{backgroundColor: 'teal'}}>
        Welcome to Your App
      </h1>
      <DarkModeToggle />
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
                />
                <track
                    id="notes"
                    src="/notes.vtt"
                    kind="metadata"
                    label="notes"
                />
            </Video>
            {player && <Controls player={player} fullscreenElemRef={containerRef} />}

        </div>
    </div>
  )
}
