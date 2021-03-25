import * as React from 'react'
import Hls from 'hls.js'
import create from 'zustand'
import {devtools} from 'zustand/middleware'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CAPTION':
      return {...state, currentCaption: action.text}
    case 'TIME_CHANGE':
      return {...state, currentTime: action.currentTime}
    case 'PLAYER_UPDATE':
      return {...state, player: action.player}
    case 'SET_DURATION':
      return {...state, duration: action.duration}
  }
}

export const usePlayerStore = create(
  devtools((set) => ({
    player: null,
    currentTime: 0,
    duration: 0,
    currentCaption: ' ',
    dispatch: (args: any) => set((state: any) => reducer(state, args)),
  })),
)

export const useVideo = (videoOptions: any) => {
  const videoNode = React.useRef<HTMLMediaElement>()
  const [ready, setReady] = React.useState(false)
  const changedKey = JSON.stringify(videoOptions)

  const dispatch: any = usePlayerStore(
    React.useCallback((state) => state.dispatch, []),
  )

  const onPlayerProgress = React.useCallback(
    (e: any) => {
      const player = e.target as HTMLMediaElement
      dispatch({type: 'TIME_CHANGE', currentTime: player.currentTime})
    },
    [dispatch],
  )

  React.useEffect(() => {
    fetch('/notes.vtt')
    videoNode.current?.addTextTrack('metadata', 'notes')
  }, [videoNode])

  React.useEffect(() => {
    const player: any = videoNode.current
    const hlsConfig = {enableWorker: true}

    function initPlayer(video: HTMLMediaElement) {
      const hls = new Hls({
        ...hlsConfig,
      })

      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(videoOptions.url)
        hls.on(Hls.Events.MANIFEST_PARSED, function (event:any, data:any) {
          console.log(
            'manifest loaded, found ' + data.levels.length + ' quality level',
            data.levels,
          )

          setReady(true)
        })
      })

      hls.on(Hls.Events.ERROR, function (event:any, data:any) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              break
            default:
              initPlayer(video)
              break
          }
        }
      })

      return hls
    }

    function onDurationChange() {
      dispatch({type: 'SET_DURATION', duration: player?.duration || 0})
    }

    function onMetadataLoaded() {
      const textTracks: any = player?.textTracks[0]
      textTracks.mode = 'hidden'
      const cues = textTracks.cues

      for (let index = 0; index < cues.length; index++) {
        var cue = cues[index]
        cue.onenter = (e: any) => {
          const cue = e.target
          dispatch({type: 'SET_CAPTION', text: cue.text})
        }
        // cue.onexit = cueExit
      }
    }

    function addEventListeners() {
      const tracks = player.textTracks
      tracks.onaddtrack = (e: any) => {
        const track = e.track
        track.oncuechange = (e: any) => {
          const activeCues = Array.from(e.currentTarget.activeCues)
          const cue: any = activeCues[0]

          if(!cue) return

          switch (track.kind) {
            case 'subtitles':

              track.mode = 'hidden'
              // if(cue) {
              //   dispatch({type: 'SET_CAPTION', text: cue.text})
              // } else {
              //   dispatch({type: 'SET_CAPTION', text: ''})
              // }
              break;
            case 'metadata':
              console.log(cue)
              console.log(cue.text)
              break;
          }

        }
      }

      player.addEventListener('timeupdate', onPlayerProgress)
      player.addEventListener('durationchange', onDurationChange)
      player?.addEventListener('loadedmetadata', onMetadataLoaded)
    }

    function removeEventListeners() {
      player?.removeEventListener('timeupdate', onPlayerProgress)
      player?.removeEventListener('durationchange', onDurationChange)
      player?.removeEventListener('loadedmetadata', onMetadataLoaded)
    }

    if (Hls.isSupported()) {
      const hls = player && initPlayer(player)
      dispatch({type: 'PLAYER_UPDATE', player})
      addEventListeners()

      return () => {
        if (hls != null) {
          hls.destroy()
        }
        removeEventListeners()
      }
    } else if (player?.canPlayType('application/vnd.apple.mpegurl')) {
      // we have to branch on ios because it plays hls natively
      // and requires a different approach 😭
      player.src = videoOptions.url
      setReady(true)
      addEventListeners()

      return () => {
        removeEventListeners()
      }
    }
  }, [videoOptions, videoNode, dispatch, onPlayerProgress])

  const Video = React.useCallback(
    ({children, ...rest}) => {
      function isVideoChild(c: any) {
        if (c.props && c.props.isVideoChild) {
          return true;
        }
        return c.type === 'source' || c.type === 'track';
      }

      function renderChildren() {
        const props = {
          ...rest,
          video: videoNode.current
        };

        // to make sure the children can get video property
        if (!videoNode.current) {
          return null;
        }

        // only keep <source />, <track />, <MyComponent isVideoChild /> elements
        return React.Children.toArray(children)
            .filter(isVideoChild)
            .map((c:any, index: number) => {
              let cprops;
              console.log(c)
              if (typeof c.type === 'string') {
                // add onError to <source />
                if (c.type === 'source') {
                  cprops = { ...c.props, ref: index };
                  const preOnError = cprops.onError;
                  cprops.onError = (...args: any[]) => {
                    if (preOnError) {
                      preOnError(...args);
                    }
                    console.error(args);
                  };
                }
              } else {
                cprops = {...props, ref: index};
              }
              return React.cloneElement(c, cprops);
            });
      }
      return (
        <video
          key={changedKey}
          ref={videoNode}
          crossOrigin="anonymous"
          {...rest}
        >
          {renderChildren()}
        </video>
      )
    },
    [changedKey],
  )
  return {Video, ready, player: videoNode.current}
}
