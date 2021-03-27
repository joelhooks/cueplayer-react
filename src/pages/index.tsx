import React from 'react'
import Head from 'next/head'
import DarkModeToggle from '../components/dark-mode-toggle'
import {usePlayerStore, useVideo} from 'components/player'
import Controls from 'components/controls'
import {useVideoJS} from "../hooks/use-video-js"
import {isEmpty, first} from 'lodash'

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
    // const {Video, player} = useVideo({
    //     url: video.hls_url,
    // })

    const [metadataTrack, setMetadataTrack] = React.useState<any>()
    const [metadataCues, setMetadataCues] = React.useState<any>([])

    const dispatch: any = usePlayerStore(
        React.useCallback((state) => state.dispatch, []),
    )

    const cue: any = usePlayerStore((state) => state.cue)

    const {Video: VideoJS, player: playerjs, ready} = useVideoJS({
        poster: video.poster,
        sources: [{src: video.hls_url}],
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2],
        responsive: true,
    })

    React.useEffect(() => {
        function doStuff(e:any) {
            // playerjs.ads.startLinearAdMode();
            const activeCues: any = metadataTrack.activeCues
            const cues = Array.from(activeCues)
            if(!isEmpty(cues)) {
                const cue = JSON.parse(first<any>(cues).text)
                dispatch({type: 'SET_CUE', cue})
            } else {
                dispatch({type: 'CLEAR_CUE'})
            }
        }
        if(metadataTrack) {

            setTimeout(() => {

                setMetadataCues(Array.from(metadataTrack.cues))
            }, 750)

            metadataTrack.addEventListener('cuechange', doStuff);
        }

        return () => {
            metadataTrack?.removeEventListener('cuechange', doStuff);
        }
    }, metadataTrack)

    React.useEffect(() => {
        if(!playerjs) return
        var tracks = playerjs.textTracks();
        console.log('el', playerjs.el())


        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];

            // Find the metadata track that's labeled "ads".
            if (track.kind === 'metadata' && track.label === 'notes') {
                track.mode = 'hidden';

                // Store it for usage outside of the loop.
                setMetadataTrack(track)

            }
        }



    }, [playerjs])


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
            {/*<Video poster={video.poster} playsInline>*/}
            {/*    <track*/}
            {/*        src={video.subtitlesUrl}*/}
            {/*        kind="subtitles"*/}
            {/*        srcLang="en"*/}
            {/*        label="English"*/}
            {/*    />*/}
            {/*    <track*/}
            {/*        id="notes"*/}
            {/*        src="/notes.vtt"*/}
            {/*        kind="metadata"*/}
            {/*        label="notes"*/}
            {/*    />*/}
            {/*</Video>*/}
            {/*{player && <Controls player={player} fullscreenElemRef={containerRef} />}*/}
            <VideoJS poster={video.poster} playsInline muted>
                <track
                    src={video.subtitlesUrl}
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                />
                <track
                    id="notes"
                    src="/api/cues"
                    kind="metadata"
                    label="notes"
                />
            </VideoJS>
            {metadataCues.map((mcue: any) => {
                const cuejs = JSON.parse(mcue.text)
                console.log(cue, cuejs)
                return (<div className={cuejs.description === cue?.description ? 'text-blue-600' : ''} key={cuejs.description}>{cuejs.description}</div>)
            })}
        </div>
    </div>
  )
}
