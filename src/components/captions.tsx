import * as React from 'react'
import {usePlayerStore} from './player'

const Captions: React.FC = () => {
  const currentCaption: any = usePlayerStore((state) => state.currentCaption)
  return (
    <div
      style={{
        padding: '1em',
        fontSize: '1.25em',
        fontWeight: 'bold',
      }}
    >
      {currentCaption}
    </div>
  )
}

export default Captions
