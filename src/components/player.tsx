import * as React from 'react'
import Hls from 'hls.js'
import create from 'zustand'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'TIME_CHANGE':
      return {...state, currentTime: action.currentTime}
    case 'PLAYER_UPDATE':
      return {...state, currentTime: action.player}
  }
}

export const usePlayerStore = create((set) => ({
  player: null,
  currentTime: 0,
  setPlayer: (player: any) =>
    set((state) => ({
      player,
    })),
  dispatch: (args: any) => set((state: any) => reducer(state, args)),
}))

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
    const player = videoNode.current
    const hlsConfig = {enableWorker: true}

    function initPlayer(video: HTMLMediaElement) {
      const hls = new Hls({
        ...hlsConfig,
      })

      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(videoOptions.url)
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          console.log(
            'manifest loaded, found ' + data.levels.length + ' quality level',
            data.levels,
          )

          setReady(true)
        })
      })

      hls.on(Hls.Events.ERROR, function (event, data) {
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

    if (Hls.isSupported()) {
      const hls = player && initPlayer(player)
      dispatch({type: 'PLAYER_UPDATE', player})
      player?.addEventListener('timeupdate', onPlayerProgress)

      return () => {
        if (hls != null) {
          hls.destroy()
        }
        player?.removeEventListener('timeupdate', onPlayerProgress)
      }
    } else if (player?.canPlayType('application/vnd.apple.mpegurl')) {
      console.log('ios')
      player.src = videoOptions.url
      setReady(true)
      player?.addEventListener('timeupdate', onPlayerProgress)

      return () => {
        player?.removeEventListener('timeupdate', onPlayerProgress)
      }
    }
  }, [videoOptions, videoNode, dispatch, onPlayerProgress])

  const Video = React.useCallback(
    ({children, ...props}) => {
      return (
        <video
          key={changedKey}
          ref={videoNode}
          crossOrigin="anonymous"
          {...props}
        >
          {children}
        </video>
      )
    },
    [changedKey],
  )
  return {Video, ready, player: videoNode.current}
}
