import React, { Component } from 'react'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'

const video = {
    poster:
        'https://dcv19h61vib2d.cloudfront.net/thumbs/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL.jpg',
    hls_url:
        'https://d2c5owlt6rorc3.cloudfront.net/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL/hls/react-v2-04-use-jsx-effectively-with-react-SJrnCuUSL.m3u8',
    subtitlesUrl:
        'https://app.egghead.io/api/v1/lessons/react-use-jsx-effectively-with-react/subtitles',
}

import ReactPlayer from 'react-player'

class App extends Component {
    player: any
    container: any
    state = {
        url: null,
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        seeking: false
    }

    load = (url:string) => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        })
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleStop = () => {
        this.setState({ url: null, playing: false })
    }

    handleToggleControls = () => {
        this.setState({
            controls: !this.state.controls,
        }, () => this.load(video.hls_url))
    }

    handleToggleLight = () => {
        this.setState({ light: !this.state.light })
    }

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
    }

    handleVolumeChange = (e:any) => {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }

    handleSetPlaybackRate = (e:any) => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
    }

    handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
    }

    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    handleEnablePIP = () => {
        console.log('onEnablePIP')
        this.setState({ pip: true })
    }

    handleDisablePIP = () => {
        console.log('onDisablePIP')
        this.setState({ pip: false })
    }

    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    handleSeekMouseDown = (e:any) => {
        this.setState({ seeking: true })
    }

    handleSeekChange = (e:any) => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp = (e:any) => {
        this.setState({ seeking: false })
        if(this.player) {
            this.player.seekTo(parseFloat(e.target.value))
        }

    }

    handleProgress = (state:any) => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }

    handleDuration = (duration: any) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    handleClickFullscreen = () => {
        // @ts-ignore
        screenfull.request(findDOMNode(this.container))
    }

    ref = (player: any) => {
        this.player = player
    }

    containerRef = (container: any) => {
        this.container = container
    }

    render () {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
        const SEPARATOR = ' · '

        return (
            <div className='app'>
                <section className='section' ref={this.containerRef}>
                    <h1>ReactPlayer Demo</h1>
                    <div className='player-wrapper' >
                        <ReactPlayer
                            ref={this.ref}
                            className='react-player'
                            config={{ file: { attributes: {crossOrigin: 'anonymous'},tracks: [
                                        {kind: 'subtitles', src: video.subtitlesUrl, srcLang: 'en', label:'English', default: true}
                                    ]}}}
                            width='100%'
                            height='100%'
                            url={video.hls_url}
                            pip={pip}
                            playing={playing}
                            controls={controls}
                            light={light}
                            loop={loop}
                            playbackRate={playbackRate}
                            volume={volume}
                            muted={muted}
                            onReady={(e) => console.log('onReady', e)}
                            onStart={() => console.log('onStart')}
                            onPlay={this.handlePlay}
                            onEnablePIP={this.handleEnablePIP}
                            onDisablePIP={this.handleDisablePIP}
                            onPause={this.handlePause}
                            onBuffer={() => console.log('onBuffer')}
                            onSeek={e => console.log('onSeek', e)}
                            onEnded={this.handleEnded}
                            onError={e => console.log('onError', e)}
                            onProgress={this.handleProgress}
                            onDuration={this.handleDuration}
                        />
                    </div>

                    <table>
                        <tbody>
                        <tr>
                            <th>Controls</th>
                            <td>
                                <button onClick={this.handleStop}>Stop</button>
                                <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                                <button onClick={this.handleClickFullscreen}>Fullscreen</button>
                                {light &&
                                <button onClick={() => this.player.showPreview()}>Show preview</button>}

                            </td>
                        </tr>
                        <tr>
                            <th>Speed</th>
                            <td>
                                <button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                                <button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
                                <button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                            </td>
                        </tr>
                        <tr>
                            <th>Seek</th>
                            <td>
                                <input
                                    type='range' min={0} max={0.999999} step='any'
                                    value={played}
                                    onMouseDown={this.handleSeekMouseDown}
                                    onChange={this.handleSeekChange}
                                    onMouseUp={this.handleSeekMouseUp}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Volume</th>
                            <td>
                                <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='controls'>Controls</label>
                            </th>
                            <td>
                                <input id='controls' type='checkbox' checked={controls} onChange={this.handleToggleControls} />
                                <em>&nbsp; Requires player reload</em>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='muted'>Muted</label>
                            </th>
                            <td>
                                <input id='muted' type='checkbox' checked={muted} onChange={this.handleToggleMuted} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='loop'>Loop</label>
                            </th>
                            <td>
                                <input id='loop' type='checkbox' checked={loop} onChange={this.handleToggleLoop} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='light'>Light mode</label>
                            </th>
                            <td>
                                <input id='light' type='checkbox' checked={light} onChange={this.handleToggleLight} />
                            </td>
                        </tr>
                        <tr>
                            <th>Played</th>
                            <td><progress max={1} value={played} /></td>
                        </tr>
                        <tr>
                            <th>Loaded</th>
                            <td><progress max={1} value={loaded} /></td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <section className='section'>


                    <h2>State</h2>

                    <table>
                        <tbody>

                        <tr>
                            <th>playing</th>
                            <td>{playing ? 'true' : 'false'}</td>
                        </tr>
                        <tr>
                            <th>volume</th>
                            <td>{volume.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>played</th>
                            <td>{played.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>loaded</th>
                            <td>{loaded.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <th>duration</th>
                            <td><Duration seconds={duration} /></td>
                        </tr>
                        <tr>
                            <th>elapsed</th>
                            <td><Duration seconds={duration * played} /></td>
                        </tr>
                        <tr>
                            <th>remaining</th>
                            <td><Duration seconds={duration * (1 - played)} /></td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}

function Duration ({ className, seconds }:{className?: any, seconds:any} ) {
    return (
        <time dateTime={`P${Math.round(seconds)}S`} className={className}>
            {format(seconds)}
        </time>
    )
}

function format (seconds:number) {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}

function pad (string:number) {
    return ('0' + string).slice(-2)
}

export default App