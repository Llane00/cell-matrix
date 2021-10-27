import { Container, Sprite, useApp } from "@inlet/react-pixi";
import React, { useEffect, useState } from "react"

import { viewWidth, viewHeight, backgroundSpeed } from "../../configs/index"
import Background from "../../assets/background_1.png";

type Callback = () => void;
const Map: React.FC = () => {
  const speed = backgroundSpeed;
  const [mapY1, setMapY1] = useState(0);
  const [mapY2, setMapY2] = useState(-viewHeight);

  const { ticker } = useApp();

  useEffect((): void | Callback => {
    const tick = (delta: number) => {
      setMapY1(i => i + speed)
      setMapY1(i => {
        if (i >= viewHeight - speed) {
          return -viewHeight;
        } else {
          return i
        }
      })
      setMapY2(i => i + speed)
      setMapY2(i => {
        if (i >= viewHeight - speed) {
          return -viewHeight;
        } else {
          return i
        }
      })
    }
    ticker.add(tick)
    return () => ticker.remove(tick)
  }, [ticker])

  return (
    <Container>
      <Sprite
        x={0}
        y={mapY1}
        width={viewWidth}
        height={viewHeight}
        image={Background}
      />
      <Sprite
        x={0}
        y={mapY2}
        width={viewWidth}
        height={viewHeight}
        image={Background}
      />
    </Container>
  )
}

export default Map;