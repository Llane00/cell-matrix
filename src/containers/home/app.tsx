import React from "react";
import Background from "./assets/background_1.jpeg";
import { Stage, Sprite } from '@inlet/react-pixi';

const App: React.FC = () => {
  return (
    <Stage
      width={375}
      height={812}
      options={{
        // antialiasing: true, // 抗锯齿
        transparent: false, // 背景透明
        resolution: 2 // 渲染倍数，避免模糊
      }}
    >
      <Sprite
        image={Background}
        x={0}
        y={0}
        width={375}
        height={812}
      />
    </Stage>
  )
}

export {
  App
}