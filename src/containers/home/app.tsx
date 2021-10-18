import React from "react";
import Background from "./assets/background_1.jpeg";

const App: React.FC = () => {
  return (
    <div>
      <p>Hello cell matrix!</p>
      <img src={Background} alt="" />
    </div>
  )
}

export {
  App
}