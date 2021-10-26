import React from "react";
import { Container, Sprite } from "@inlet/react-pixi"
import heroImg from "../../assets/hero.png"

interface props {
  x: number,
  y: number
}
export const heroInfo = {
  width: 107.5,
  height: 116,
  speed: 25,
}

export const Hero: React.FC<props> = (props) => {
  return (
    <Container
      x={props.x}
      y={props.y}
    >
      <Sprite
        width={heroInfo.width}
        height={heroInfo.height}
        image={heroImg}
      >
      </Sprite>
    </Container>
  )  
}