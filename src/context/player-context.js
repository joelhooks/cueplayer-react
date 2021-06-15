import * as React from 'react'
import {initialState} from '../reducers/player'

const defaultPlayerContext = {
  manager: {},
  setManager: () => {},
  getPlayer: () => initialState,
}

export const PlayerContext = React.createContext(defaultPlayerContext)

export function usePlayer() {
  return React.useContext(PlayerContext)
}

export const PlayerProvider = ({children}) => {
  const [manager, setManager] = React.useState()
  const [player, setPlayer] = React.useState(initialState)

  return (
    <PlayerContext.Provider value={{player, manager, setPlayer, setManager}}>
      {children}
    </PlayerContext.Provider>
  )
}
