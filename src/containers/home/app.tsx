import React, { FC } from 'react'
import './styles/public.scss'
import { CurrentPage } from './views/CurrentPage'
import AppProvider from './context/appContextProvider'

const App: FC = () => {
  return (
    <AppProvider>
      <CurrentPage />
    </AppProvider>
  )
}

export {
  App
}
