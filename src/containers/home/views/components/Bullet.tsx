import { Container, Sprite } from '@inlet/react-pixi'
import React from 'react'

import bulletImg from "../../assets/bullet_laser.png"

export interface props {
  x: number,
  y: number
}

export const bulletInfo = {
  width: 14.5,
  height: 26.5,
  speed: 10
}

export const Bullet: React.FC<props> = (props) => {
  return (
    <Container
      x={props.x}
      y={props.y}
    >
      <Sprite
        width={bulletInfo.width}
        height={bulletInfo.height}
        image={bulletImg}
      ></Sprite>
    </Container>
  )
}
