

import React from 'react';
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton, PlayToggle,
    DurationDisplay,
    ProgressControl,
    RemainingTimeDisplay,
    FullscreenToggle
} from 'video-react';
import HLSSource from '../components/hls-source';
import "../../node_modules/video-react/dist/video-react.css"

const video = {
    poster:
        'https://dcv19h61vib2d.cloudfront.net/thumbs/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL.jpg',
    hls_url:
        'https://d2c5owlt6rorc3.cloudfront.net/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL/hls/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL.m3u8',
    subtitlesUrl:
        'https://app.egghead.io/api/v1/lessons/react-use-jsx-effectively-with-react/subtitles',
}

export default (props: any) => {
    return (
        <Player playsInline autoPlay={'false'}>
            <HLSSource
                isVideoChild
                src={video.hls_url}
            />
            <ControlBar disableDefaultControls>
                <PlayToggle key="play-toggle" order={1} />,
                <ReplayControl key="replay-control" order={2} />,
                <ForwardControl key="forward-control" order={3} />,
                <VolumeMenuButton key="volume-menu-button" order={4} />,
                <CurrentTimeDisplay key="current-time-display" order={5} />,
                <TimeDivider key="time-divider" order={6} />,
                <DurationDisplay key="duration-display" order={7} />,
                <ProgressControl key="progress-control" order={8} />,
                <RemainingTimeDisplay key="remaining-time-display" order={9} />,
                <PlaybackRateMenuButton
                    rates={[1, 1.25, 1.5, 2]}
                    key="playback-rate"
                    order={10}
                />,
                <FullscreenToggle key="fullscreen-toggle" order={11} />
            </ControlBar>
        </Player>
    );
};