import React, { FC } from 'react'
import { Container, Sprite } from '@inlet/react-pixi'
import enemyImg from '../../../assets/enemy_0.png'

export const enemyInfo = {
  width: 102.5 / 2,
  height: 104 / 2,
  speed: 1
}

interface Iprops {
  x: number,
  y: number
}

export const Enemy: FC<Iprops> = (props) => {
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
