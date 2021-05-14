import React from 'react';
import { Player, CueBar } from 'cueplayer-react';

export default props => {
  return (
    <Player
      autoPlay
      src="https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4"
      crossOrigin="anonymous"
    >
      <track
        id="notes"
        src="//gist.githubusercontent.com/joelhooks/bd3c1d68cb5a67adfcd6c035200d1fde/raw/c046617f8ec6b20efe2a163aa4f447a7b166b3fa/notes.vtt"
        kind="metadata"
        label="notes"
      />
      <CueBar>Hello</CueBar>
    </Player>
  );
};
