import React from "react"
import { Container, Sprite } from "@inlet/react-pixi"
import enemyImg from '../../assets/enemy_0.png'

interface props {
  x: number,
  y: number
}

const Enemy: React.FC<props> = (props) => {
  const width = 102.5 / 2;
  const height = 104 / 2;

  return (
    <Container
      x={props.x}
      y={props.y}
    >
      <Sprite
        width={width}
        height={height}
        image={enemyImg}
      ></Sprite>
    </Container>
  )
}

export default Enemy;