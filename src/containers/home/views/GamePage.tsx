import { Container, useApp } from "@inlet/react-pixi";
import React, { useContext, useEffect, useRef, useState } from "react"

import Map from './components/Map'
import Hero from './components/Hero'
import Enemy from "./components/Enemy";

import { hitTestObject } from '../utils/index'
import { AppContext } from "../context/appContext";

const GamePage: React.FC = () => {
  const { ticker } = useApp()
  const update = useState(0)[1]
  
  const { setPageName } = useContext(AppContext)
  const { heroInfo } = useHeroPlane()
  const { enemyList, setEnemyList } = useEnemyPlane();

  const mainGameTick = (delta: number) => {
    update(delta)
    
    enemyList.current.forEach((enemyInfo, enemyIndex) => {
      //敌人移动
      setEnemyList(enemyIndex, 'y', enemyInfo.y+1)
      //敌机碰撞检测
      if (hitTestObject(enemyInfo, heroInfo.current)) {
        setPageName("EndPage")
      }
    })
  }
  
  //游戏页渲染
  useEffect(() => {
    ticker.add(mainGameTick)
    return () => {
      ticker.remove(mainGameTick)
    }
  }, [ticker])

  return (
    <Container>
      <Map />
      <Hero
        x={heroInfo.current.x}
        y={heroInfo.current.y}
      />
      {enemyList.current.map(
        (enemyInfo) =>
          (
            <Enemy
              x={enemyInfo.x}
              y={enemyInfo.y}
            key={enemyInfo.id} />
          )
      )}
    </Container>
  )
}

function useHeroPlane() {
  const speed = 25;
  const heroInfo = useRef({
    x: 100,
    y: 700,
    width: 430/4,
    height: 464/4,
  });

  const handleKeyEvent = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowUp":
        heroInfo.current.y -= speed;
        break;
      case "ArrowDown":
        heroInfo.current.y += speed;
        break;
      case "ArrowLeft":
        heroInfo.current.x -= speed;
        break;
      case "ArrowRight":
        heroInfo.current.x += speed;
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
    heroInfo
  }
}

function useEnemyPlane() {
  type enemyInfoType = {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
  }

  //创建敌方飞机
  const enemyList = useRef([
    {
      id: 1,
      x: 25,
      y: 0,
      width: 102.5,
      height: 104,
    },
    {
      id: 2,
      x: 200,
      y: 50,
      width: 102.5,
      height: 104,
    },
    {
      id: 3,
      x: 325,
      y: 0,
      width: 102.5,
      height: 104,
    },
    {
      id: 4,
      x: 400,
      y: 200,
      width: 102.5,
      height: 104,
    },
    {
      id: 5,
      x: 525,
      y: 100,
      width: 102.5,
      height: 104,
    },
  ])

  const setEnemyList = (index: number, key: string, value: string | number | object) => {
    const result = enemyList.current.map((item:enemyInfoType, _index: number) => {
      return (_index == index) ? {
        ...item,
        [key]: value
      } : item
    })
    
    enemyList.current = result
  }

  return { enemyList, setEnemyList }
}

export {
  GamePage
}