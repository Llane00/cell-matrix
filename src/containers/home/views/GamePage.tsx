import { Container, useApp } from "@inlet/react-pixi";
import React, { useContext, useEffect, useRef, useState } from "react"

import Map from "./components/Map"
import { Hero, heroInfo as defaultHeroInfo } from "./components/Hero"
import { Enemy, enemyInfo } from "./components/Enemy";

import { hitTestObject } from "../utils/index"
import { AppContext } from "../context/appContext";
import { viewWidth, viewHeight } from "../configs";

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
      setEnemyList(enemyIndex, 'y', enemyInfo.y + enemyInfo.speed)
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
  const speed = defaultHeroInfo.speed;
  const heroInfo = useRef({
    x: viewWidth / 2 - defaultHeroInfo.width / 2,
    y: viewHeight - defaultHeroInfo.height - 20,
    width: defaultHeroInfo.width,
    height: defaultHeroInfo.height,
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
    speed: number
  }

  //创建敌方飞机
  const enemyList = useRef([
    {
      ...enemyInfo,
      id: 2,
      x: 200,
      y: 50,
    },
  ])

  const setEnemyList = (index: number, key: string, value: string | number | object) => {
    const result = enemyList.current.map((item: enemyInfoType, _index: number) => {
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