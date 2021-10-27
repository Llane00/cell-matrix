import React, { useEffect } from "react";
import { Container, Sprite } from "@inlet/react-pixi"
import heroImg from "../../assets/hero.png"

interface props {
  x: number,
  y: number,
  onAttack: () => void
}

export const heroInfo = {
  width: 107.5,
  height: 116,
  speed: 25,
}

export const Hero: React.FC<props> = (props) => {
  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      props.onAttack()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent)
    return () => {
      window.removeEventListener("keydown", handleKeyEvent)
    }
  }, [])

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