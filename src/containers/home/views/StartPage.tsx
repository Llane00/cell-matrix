import React, { FC, useContext } from 'react'
import { Container, Sprite } from '@inlet/react-pixi'
import { AppContext } from '../context/appContext'

import StartImg from '../assets/start.png'

const StartPage: FC = () => {
  const { setPageName } = useContext(AppContext)

  const startGameClickHandle = () => {
    setPageName('GamePage')
  }

  return (
    <Container position={[0, 0]}>
      <Sprite
        image={StartImg}
        x={0}
        y={200}
        width={375}
        height={187.5}
        interactive={true}
        pointerdown={startGameClickHandle}
      />
    </Container>
  )
}

export {
  StartPage
}
