import React from 'react';
import { Player } from 'cueplayer-react';

export default props => {
  return (
    <Player
      playsInline
      poster="/assets/poster.png"
      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    />
  );
};
