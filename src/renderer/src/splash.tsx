import './splash.css'
import React from 'react'
import { createRoot } from 'react-dom/client'

type Props = {}

const root = createRoot(document.getElementById('root')!)

const SplashScreen = ({}: Props) => {
  return <div className=""></div>
}

root.render(<SplashScreen />)
