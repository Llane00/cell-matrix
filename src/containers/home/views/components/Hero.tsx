import React from "react";
import { Container, Sprite } from "@inlet/react-pixi"
import heroImg from "../../assets/hero.png"

interface props {
  x: number,
  y: number
}

const Hero: React.FC<props> = (props) => {
  const width = 430/4;
  const height = 464/4;
  console.log(width, height)

  return (
    <Container
      x={ props.x }
      y={ props.y }
    >
      <Sprite
        width={width}
        height={height}
        image={heroImg}
      >
      </Sprite>
    </Container>
  )  
}

export default Hero;