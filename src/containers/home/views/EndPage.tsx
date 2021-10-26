import { Container, Sprite } from "@inlet/react-pixi"
import React, { useContext } from "react"
import { AppContext } from "../context/appContext"

import EndImg from "../assets/end.png";

const EndPage: React.FC = () => {
  const { setPageName } = useContext(AppContext)
  const startGameAgain = () => {
    setPageName('StartPage')
  }
  return (
    <Container>
      <Sprite
        image={EndImg}
        x={0}
        y={100}
        width={375}
        height={500}
        interactive={true}
        pointerdown={startGameAgain}
      />
    </Container>
  )
}

export {
  EndPage
}