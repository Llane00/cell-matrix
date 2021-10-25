import { Container, Sprite, useApp } from "@inlet/react-pixi";
import React, { useEffect, useState } from "react"

import Background from "../../assets/background_1.jpeg";

type Callback = () => void;
const Map: React.FC = () => {
  const viewHeight = 812;
  const speed = 5;
  const [mapY1, setMapY1] = useState(0);
  const [mapY2, setMapY2] = useState(-viewHeight);

  const { ticker } = useApp();

  useEffect((): void | Callback => {
    const tick = (delta: number) => {
      setMapY1(i => i + speed)
      setMapY1(i => {
        if (i >= viewHeight-speed) {
          return -viewHeight;
        } else {
          return i
        }
      })
      setMapY2(i => i + speed)
      setMapY2(i => {
        if (i >= viewHeight -speed) {
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
        width={375}
        height={viewHeight}
        image={Background}
      />
      <Sprite
        x={0}
        y={mapY2}
        width={375}
        height={viewHeight}
        image={Background}
      />
    </Container>
  )
}

export default Map;