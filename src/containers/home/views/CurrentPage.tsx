import React, { FC, useContext } from 'react'
import { AppContext } from '../context/appContext'
import { Stage } from '@inlet/react-pixi'
import { StartPage } from './StartPage'
import { GamePage } from './GamePage'
import { EndPage } from './EndPage'
import ContextBridge from '../context/contextBridge'
import { viewHeight, viewWidth } from '../configs'

const CurrentPage: FC = ({ children, ...props }) => {
  const { pageName } = useContext(AppContext)

  return (
    <ContextBridge
      Context={AppContext}
      render={(children) => (
        <Stage
          width={viewWidth}
          height={viewHeight}
          options={{
            antialias: true, // 锯齿,使字体和图形边缘更加平滑
            transparent: false, // 背景透明
            resolution: 1, // 分辨率
            resizeTo: window
          }}
          {...props}
        >
          {children}
        </Stage>
      )
      }>
      {pageName === 'StartPage' && <StartPage />}
      {pageName === 'GamePage' && <GamePage />}
      {pageName === 'EndPage' && <EndPage />}
    </ContextBridge>
  )
}

export {
  CurrentPage
}
