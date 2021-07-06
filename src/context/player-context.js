import * as React from 'react'
import {atom, useAtom} from 'jotai'
import {initialState} from '../reducers/player'

const defaultPlayerContext = {
  manager: {},
  setManager: () => {},
  setPlayer: () => initialState,
}

export const playerAtom = atom(initialState)

export const PlayerContext = React.createContext(defaultPlayerContext)

export function usePlayer() {
  return React.useContext(PlayerContext)
}

export const PlayerProvider = ({children}) => {
  const [manager, setManager] = React.useState()
  const [player, setPlayer] = useAtom(playerAtom)

  return (
    <PlayerContext.Provider value={{player, manager, setPlayer, setManager}}>
      {children}
    </PlayerContext.Provider>
  )
}
