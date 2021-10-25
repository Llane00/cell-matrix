import React, { useContext } from "react"
import { AppContext } from "../context/appContext";
import { Stage } from "@inlet/react-pixi";
import { StartPage } from "./StartPage";
import { GamePage } from "./GamePage";
import { EndPage } from "./EndPage";
import ContextBridge from "../context/contextBridge";

// import { Stage } from "../game";

const CurrentPage: React.FC = ({ children, ...props }) => {
  const { pageName } = useContext(AppContext)

  return (
    <ContextBridge
      Context={AppContext}
      render={(children) => (
        <Stage
          width={375}
          height={812}
          options={{
            transparent: false, // 背景透明
            resolution: 2, // 渲染倍数，避免模糊
            resizeTo: window
          }}
          {...props}
        >
          {children}
        </Stage>
      )
      }>
      {pageName === "StartPage" && <StartPage />}
      {pageName === "GamePage" && <GamePage />}
      {pageName === "EndPage" && <EndPage />}
    </ContextBridge>
  );
};

export {
  CurrentPage
}