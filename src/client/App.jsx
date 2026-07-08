import { useState } from 'react'
import { Canvas } from './Canvas/Canvas'
import { CanvasNav } from './Nav/CanvasNav'
import { CanvasProvider } from './Canvas/CanvasContext'

function App() {
  

  return (
    <>
    <CanvasProvider>
      <CanvasNav/>
      <Canvas/>
    </CanvasProvider>
    </>
  )
}

export default App
