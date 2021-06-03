import * as React from 'react'
import {initialState} from '../reducers/player'

const defaultPlayerContext = {
  player: {},
  setPlayer: () => {},
}

export const PlayerContext = React.createContext(defaultPlayerContext)

export function usePlayer() {
  return React.useContext(PlayerContext)
}

export const PlayerProvider = ({children}) => {
  const [player, setPlayer] = React.useState(initialState)
  const values = {player, setPlayer}

  return (
    <PlayerContext.Provider value={{...values}}>
      {children}
    </PlayerContext.Provider>
  )
}
