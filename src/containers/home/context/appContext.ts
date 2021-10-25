import React from "react";

export interface IappContext {
  pageName: string,
  setPageName(pageName: string): void
}

//初始化 context
const globalState: IappContext = {
  pageName: '',
  setPageName: () => { }
}

//创建app全局上下文
export const AppContext = React.createContext<IappContext>(globalState);
