export const LOAD_START = 'cueplayer-react/LOAD_START';
export const CAN_PLAY = 'cueplayer-react/CAN_PLAY';
export const WAITING = 'cueplayer-react/WAITING';
export const CAN_PLAY_THROUGH = 'cueplayer-react/CAN_PLAY_THROUGH';
export const PLAYING = 'cueplayer-react/PLAYING';
export const PLAY = 'cueplayer-react/PLAY';
export const PAUSE = 'cueplayer-react/PAUSE';
export const END = 'cueplayer-react/END';
export const SEEKING = 'cueplayer-react/SEEKING';
export const SEEKED = 'cueplayer-react/SEEKED';
export const SEEKING_TIME = 'cueplayer-react/SEEKING_TIME';
export const END_SEEKING = 'cueplayer-react/END_SEEKING';
export const DURATION_CHANGE = 'cueplayer-react/DURATION_CHANGE';
export const TIME_UPDATE = 'cueplayer-react/TIME_UPDATE';
export const VOLUME_CHANGE = 'cueplayer-react/VOLUME_CHANGE';
export const PROGRESS_CHANGE = 'cueplayer-react/PROGRESS_CHANGE';
export const RATE_CHANGE = 'cueplayer-react/RATE_CHANGE';
export const SUSPEND = 'cueplayer-react/SUSPEND';
export const ABORT = 'cueplayer-react/ABORT';
export const EMPTIED = 'cueplayer-react/EMPTIED';
export const STALLED = 'cueplayer-react/STALLED';
export const LOADED_META_DATA = 'cueplayer-react/LOADED_META_DATA';
export const LOADED_DATA = 'cueplayer-react/LOADED_DATA';
export const RESIZE = 'cueplayer-react/RESIZE';
export const ERROR = 'cueplayer-react/ERROR';
export const ACTIVATE_TEXT_TRACK = 'cueplayer-react/ACTIVATE_TEXT_TRACK';
export const ACTIVATE_METADATA_TRACK =
  'cueplayer-react/ACTIVATE_METADATA_TRACK';

export function handleLoadStart(videoProps) {
  return {
    type: LOAD_START,
    videoProps
  };
}

export function handleCanPlay(videoProps) {
  return {
    type: CAN_PLAY,
    videoProps
  };
}

export function handleWaiting(videoProps) {
  return {
    type: WAITING,
    videoProps
  };
}

export function handleCanPlayThrough(videoProps) {
  return {
    type: CAN_PLAY_THROUGH,
    videoProps
  };
}

export function handlePlaying(videoProps) {
  return {
    type: PLAYING,
    videoProps
  };
}

export function handlePlay(videoProps) {
  return {
    type: PLAY,
    videoProps
  };
}

export function handlePause(videoProps) {
  return {
    type: PAUSE,
    videoProps
  };
}

export function handleEnd(videoProps) {
  return {
    type: END,
    videoProps
  };
}

export function handleSeeking(videoProps) {
  return {
    type: SEEKING,
    videoProps
  };
}

export function handleSeeked(videoProps) {
  return {
    type: SEEKED,
    videoProps
  };
}

export function handleDurationChange(videoProps) {
  return {
    type: DURATION_CHANGE,
    videoProps
  };
}

export function handleTimeUpdate(videoProps) {
  return {
    type: TIME_UPDATE,
    videoProps
  };
}

export function handleVolumeChange(videoProps) {
  return {
    type: VOLUME_CHANGE,
    videoProps
  };
}

export function handleProgressChange(videoProps) {
  return {
    type: PROGRESS_CHANGE,
    videoProps
  };
}

export function handleRateChange(videoProps) {
  return {
    type: RATE_CHANGE,
    videoProps
  };
}

export function handleSuspend(videoProps) {
  return {
    type: SUSPEND,
    videoProps
  };
}

export function handleAbort(videoProps) {
  return {
    type: ABORT,
    videoProps
  };
}

export function handleEmptied(videoProps) {
  return {
    type: EMPTIED,
    videoProps
  };
}

export function handleStalled(videoProps) {
  return {
    type: STALLED,
    videoProps
  };
}

export function handleLoadedMetaData(videoProps) {
  return {
    type: LOADED_META_DATA,
    videoProps
  };
}

export function handleLoadedData(videoProps) {
  return {
    type: LOADED_DATA,
    videoProps
  };
}

export function handleResize(videoProps) {
  return {
    type: RESIZE,
    videoProps
  };
}

export function handleError(videoProps) {
  return {
    type: ERROR,
    videoProps
  };
}

export function handleSeekingTime(time) {
  return {
    type: SEEKING_TIME,
    time
  };
}

export function handleEndSeeking(time) {
  return {
    type: END_SEEKING,
    time
  };
}

export function activateTextTrack(textTrack) {
  return {
    type: ACTIVATE_TEXT_TRACK,
    textTrack
  };
}

export function activateMetadataTrack(metadataTrack) {
  return {
    type: ACTIVATE_METADATA_TRACK,
    metadataTrack
  };
}
