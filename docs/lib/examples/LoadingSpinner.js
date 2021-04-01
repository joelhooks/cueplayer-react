import React from 'react';
import { Player, LoadingSpinner } from 'cueplayer-react';

export default props => {
  return (
    <Player src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4">
      <LoadingSpinner />
    </Player>
  );
};
