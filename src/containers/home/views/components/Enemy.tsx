import React from "react"
import { Container, Sprite } from "@inlet/react-pixi"
import enemyImg from "../../assets/enemy_0.png"
interface props {
  x: number,
  y: number
}

export const enemyInfo = {
  width: 102.5 / 2,
  height: 104 / 2,
  speed: 1
}

export const Enemy: React.FC<props> = (props) => {

  return (
    <Container
      x={props.x}
      y={props.y}
    >
      <Sprite
        width={enemyInfo.width}
        height={enemyInfo.height}
        image={enemyImg}
      ></Sprite>
    </Container>
  )
}

export default Enemy;