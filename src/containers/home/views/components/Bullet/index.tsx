import { Container, Sprite } from '@inlet/react-pixi'
import React, { FC } from 'react'

import normalBulletImg from '../../../assets/bullet_normal.png'
import laserBulletImg from '../../../assets/bullet_laser.png'

export const bulletInfo = {
  normal: {
    width: 6,
    height: 14,
    speed: 10,
    img: normalBulletImg
  },
  laser: {
    width: 14.5,
    height: 26.5,
    speed: 10,
    img: laserBulletImg
  }
}

export interface Iprops {
  type: string,
  x: number,
  y: number,
}

export const Bullet: FC<Iprops> = (props) => {
  return (
    <Container
      x={props.x}
      y={props.y}
    >
      <Sprite
        width={bulletInfo[props.type].width}
        height={bulletInfo[props.type].height}
        image={bulletInfo[props.type].img}
      ></Sprite>
    </Container>
  )
}

Bullet.defaultProps = {
  type: 'normal'
}
