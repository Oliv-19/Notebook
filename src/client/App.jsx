import { useState } from 'react'
import { Canvas } from './Canvas'
import { CanvasNav } from './Nav/CanvasNav'
import { CanvasProvider } from './CanvasContext'

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
