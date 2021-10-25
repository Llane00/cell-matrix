import { Container } from "@inlet/react-pixi";
import React, { useEffect, useState } from "react"

import Map from './components/Map'
import Hero from './components/Hero'

const GamePage: React.FC = () => {
  const { heroInfo } = useHeroPlane()

  //游戏页初次渲染
  useEffect(() => {
    
    return () => {}
  }, [])

  return (
    <Container>
      <Map />
      <Hero x={heroInfo.x} y={heroInfo.y} />
    </Container>
  )
}

function useHeroPlane() {
  const speed = 25;
  const [heroInfo, setHeroInfo] = useState({
    x: 100,
    y: 700
  });

  const handleKeyEvent = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowUp":
        setHeroInfo(i => {
          return {
            ...i,
            y: i.y - speed
          }
        })
        break;
      case "ArrowDown":
        setHeroInfo(i => {
          return {
            ...i,
            y: i.y + speed
          }
        })
        break;
      case "ArrowLeft":
        setHeroInfo(i => {
          return {
            ...i,
            x: i.x - speed
          }
        })
        break;
      case "ArrowRight":
        setHeroInfo(i => {
          return {
            ...i,
            x: i.x + speed
          }
        })  
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent)
 
    return () => {
      window.removeEventListener("keydown", handleKeyEvent)     
    }
  }, [])

  return {
    heroInfo,
    setHeroInfo
  }
}

export {
  GamePage
}