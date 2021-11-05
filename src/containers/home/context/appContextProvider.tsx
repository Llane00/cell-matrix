import React from 'react'
import { AppContext, IAppContext } from './appContext'

// action type
export type ACTIONTYPE = { type: 'setPageName', payload: string }

const AppProvider = ({ children }: React.Props<{ value: IAppContext }>) => {
  // set操作抽离出来
  const setPageName = (newPageName: string) => {
    changeAppState((prevState) => ({
      ...prevState,
      pageName: newPageName
    }))
  }
  
  const initAppStore: IAppContext = {
    pageName: 'StartPage',
    setPageName: setPageName
  }

  const [appstate, changeAppState] = React.useState(initAppStore)

  return (
    <AppContext.Provider value={ appstate }>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
