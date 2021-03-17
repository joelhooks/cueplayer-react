import * as React from 'react'
import Hls from 'hls.js'

export const useVideo = (videoOptions: any) => {
  const videoNode = React.useRef<HTMLMediaElement>()
  const [ready, setReady] = React.useState(false)
  const changedKey = JSON.stringify(videoOptions)

  React.useEffect(() => {
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
    const hls = videoNode.current && initPlayer(videoNode.current)

    return () => {
      if (hls != null) {
        hls.destroy()
      }
    }
  }, [videoOptions, videoNode])

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
