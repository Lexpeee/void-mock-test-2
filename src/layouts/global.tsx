import { FC, useState, useEffect } from 'react'

type GlobalLayoutProps = {
  children: any
}

const GlobalLayout:FC<GlobalLayoutProps> = ({children}) => {
  return (
    <>
      {children}
    </>
  )
}

export default GlobalLayout