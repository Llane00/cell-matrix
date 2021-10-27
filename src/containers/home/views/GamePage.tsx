import { Container, useApp } from "@inlet/react-pixi";
import React, { useContext, useEffect, useRef, useState } from "react"

import Map from "./components/Map"
import { Hero, heroInfo as defaultHeroInfo } from "./components/Hero"
import { Enemy, enemyInfo } from "./components/Enemy";
import { Bullet, bulletInfo } from "./components/Bullet";

import { hitTestObject, isBeyoundScreen, isTouchBottomScreenBorder, isTouchLeftScreenBorder, isTouchRightScreenBorder, isTouchTopScreenBorder } from "../utils/index"
import { AppContext } from "../context/appContext";
import { viewWidth, viewHeight } from "../configs";

const GamePage: React.FC = () => {
  const { ticker } = useApp()
  ticker.minFPS = 60;
  ticker.maxFPS = 90;

  const update = useState(0)[1]

  const { setPageName } = useContext(AppContext)
  const { heroInfo } = useHeroPlane()
  const { enemyList, setEnemyList } = useEnemyPlane();
  const { bulletList, setBulletList, addBullet } = useBullet();

  const mainGameTick = (delta: number) => {
    update(delta)

    enemyList.current.forEach((enemyInfo, enemyIndex) => {
      //移除超出屏幕的敌人
      if (enemyList.current?.length > 0) {
        enemyList.current = enemyList.current.filter((item) => {
          return !isBeyoundScreen(item)
        })
      }

      if (enemyList.current?.length > 0) {
        //敌人移动
        setEnemyList(enemyIndex, 'y', enemyInfo.y + enemyInfo.speed)
        //敌机碰撞检测
        if (hitTestObject(enemyInfo, heroInfo.current)) {
          setPageName("EndPage")
        }
      }
    })

    //我方子弹移动
    bulletList.current.map((bulletItem, bulletIndex) => {
      setBulletList(bulletIndex, 'y', bulletItem.y - bulletItem.speed)

      //移除超出屏幕的子弹
      if (isBeyoundScreen(bulletItem)) {
        bulletList.current.splice(bulletIndex, 1)
      }
    })

    //我方子弹碰撞检测
    bulletList.current.forEach((bulletInfo, bulletIndex) => {
      enemyList.current.forEach((enemyInfo, enemyIndex) => {
        if (hitTestObject(bulletInfo, enemyInfo)) {
          //子弹消失
          bulletList.current.splice(bulletIndex, 1);
          //敌机消失
          enemyList.current.splice(enemyIndex, 1);
        }
      });
    });
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
        onAttack={() => {
          addBullet({
            x: heroInfo.current.x + heroInfo.current.width / 2,
            y: heroInfo.current.y
          })
        }}
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
      {
        bulletList.current?.map(
          (bulletItem) =>
          (
            <Bullet
              x={bulletItem?.x}
              y={bulletItem?.y}
              key={bulletItem?.id} />
          )
        )
      }
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
        heroInfo.current.y -= speed
        isTouchTopScreenBorder(heroInfo.current) ?
          heroInfo.current.y = 0 :
          null
        break;
      case "ArrowDown":
        heroInfo.current.y += speed
        isTouchBottomScreenBorder(heroInfo.current) ?
          heroInfo.current.y = viewHeight - heroInfo.current.height :
          null
        break;
      case "ArrowLeft":
        heroInfo.current.x -= speed
        isTouchLeftScreenBorder(heroInfo.current) ?
          heroInfo.current.x = 0 :
          null
        break;
      case "ArrowRight":
        heroInfo.current.x += speed
        isTouchRightScreenBorder(heroInfo.current) ?
          heroInfo.current.x = viewWidth - heroInfo.current.width :
          null
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

function useBullet() {
  type bulletInfoType = {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number
  }

  const bulletList = useRef<bulletInfoType[]>([])

  const addBullet = (info: { x: number, y: number }) => {
    const uniqueId = Math.floor(Date.now() * Math.random());
    bulletList.current.push({
      ...bulletInfo,
      x: info.x - bulletInfo.width / 2,
      y: info.y,
      id: uniqueId
    })
  }

  const setBulletList = (index: number, key: string, value: string | number | object) => {
    const result = bulletList.current.map((item: bulletInfoType, _index: number) => {
      return (_index === index) ? {
        ...item,
        [key]: value
      } : item
    })

    bulletList.current = result
  }

  return { bulletList, setBulletList, addBullet }
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

  //敌方飞机
  const enemyList = useRef<enemyInfoType[]>([
    {
      ...enemyInfo,
      id: 1,
      x: 200,
      y: 50,
    },
  ])

  const setEnemyList = (index: number, key: string, value: string | number | object) => {
    const result = enemyList.current.map((item: enemyInfoType, _index: number) => {
      return (_index === index) ? {
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
