import { Container, TilingSprite, useApp } from '@inlet/react-pixi'
import React, { FC, useEffect, useState } from 'react'

import { viewWidth, viewHeight, backgroundSpeed } from '../../../configs/index'
import Background from '../../../assets/background_0.png'

type Callback = () => void
const Map: FC = () => {
  const speed = backgroundSpeed
  const [mapY1, setMapY1] = useState(0)
  const { ticker } = useApp()

  useEffect((): void | Callback => {
    const tick = (delta: number) => {
      setMapY1(i => i + speed)
    }
    ticker.add(tick)
    return () => ticker.remove(tick)
  }, [ticker])

  return (
    <Container>
      <TilingSprite
        x={0}
        y={0}
        tilePosition={{
          x: 0,
          y: mapY1
        }}
        width={viewWidth}
        height={viewHeight}
        image={Background}
      />
    </Container>
  )
}

export default Map
