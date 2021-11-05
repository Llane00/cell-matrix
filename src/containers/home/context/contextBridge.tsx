// react-pixi使用context时有问题 https://github.com/inlet/react-pixi/issues/281

import React from 'react'

export default function ContextBridge<T> (props: {
  children: React.ReactNode
  Context: React.Context<T>
  render: (children: React.ReactNode) => JSX.Element
}): JSX.Element {
  const Context = props.Context
  const result = <Context.Consumer>
    {(value) => props.render(<Context.Provider value={value}>{props.children}</Context.Provider>)}
  </Context.Consumer>
  return result
}
