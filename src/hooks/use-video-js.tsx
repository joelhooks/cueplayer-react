import {useRef, useState, useEffect, useCallback} from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import * as React from 'react'
import {isFunction} from 'lodash'

videojs.registerPlugin('chapterMarkers', function() {
    var myPlayer = this,
        videoDuration,
        cuesAra = [],
        chapterStartTimesAra: any[] = [];
    myPlayer.on('loadedmetadata', function() {

        console.log('METADATA LOADED')
        // +++  Use the array filter function to retrieve data structure that contains chapter cue points +++
        const chapterTT: any = [].filter.call(myPlayer.textTracks(), function(tt:TextTrack) {
            return tt.kind === 'metadata' && tt.label === 'notes';
        });
        //  Retrieve actual array of chapter cue points
        cuesAra = chapterTT?.[0]?.cues;

        console.log(chapterTT[0].loaded_, chapterTT, myPlayer.duration())

        // +++ Loop over chapter cue points and get start time of each  +++
        for (var i = 0; i < cuesAra.length; i++) {
            console.log(cuesAra[i])
            chapterStartTimesAra[i] = cuesAra[i].startTime;
        }

        // +++ Call function to create marks in progress bar  +++
        // Get the video duration
        videoDuration = Math.floor(myPlayer.duration());
        // Call the function to add the marks in the progress control
        addMarkers(chapterStartTimesAra, videoDuration);
    });

    // +++ Add chapter markers +++
    function addMarkers(cuePointsAra: any, videoDuration: number) {
        let iMax = cuePointsAra.length,
            i: number,
            playheadWell: any = myPlayer.el().querySelector('.vjs-progress-holder');
        for (i = 0; i < iMax; i++) {
            console.log(cuePointsAra[i], videoDuration, Math.ceil((cuePointsAra[i] / videoDuration * 100)))
            var elem = document.createElement('div');
            elem.className = 'vjs-marker';
            elem.id = 'cp' + i;
            elem.style.left = (cuePointsAra[i] / videoDuration) * 100 + '%';
            console.log('elem.style.left', elem.style.left);
            playheadWell.appendChild(elem);
        }
    }
})

export const useVideoJS = (videoJsOptions: any) => {
  const videoNode = useRef(null)
  const [ready, setReady] = useState(false)
  const changedKey = JSON.stringify(videoJsOptions)
  const player = useRef<any>(null)

console.log(videojs.dom)

  // useEffect(() => {
  //     if(!isFunction(player?.current?.examplePlugin)) {
  //         videojs.registerPlugin('examplePlugin', ExamplePlugin);
  //     }
  //
  // }, [])


  useEffect(() => {
    player.current = videojs(videoNode.current, videoJsOptions)
      const markerDiv: any = videojs.dom.createEl('div', {}, {
          style: 'left: 50%; border-radius: 50%; width: 20px; height: 20px; background-color: blue; position: absolute; bottom: 0em;'
      })

      player.current.el().querySelector('.vjs-progress-holder')
          .appendChild(markerDiv);

    player.current.chapterMarkers();

    player.current.ready(() => {
      setReady(true)
    })
    return () => {
      player.current.dispose()
    }
  }, [changedKey])

  const Video = useCallback(
    ({children, subtitlesUrl}) => {
      return (
        <div data-vjs-player key={changedKey}>
          <video ref={videoNode} className="video-js">
            {children}
          </video>
        </div>
      )
    },
    [changedKey],
  )
  return {Video, ready, player: player.current}
}
