import { useState } from 'react'
import { Canvas } from './Canvas/Canvas'
import { CanvasNav } from './Nav/CanvasNav'
import { CanvasProvider } from './Canvas/CanvasContext'
import { CanvasSettingsProvider } from './Canvas/CanvasSettingsContext'
import { PdfViewer } from './PdfViewer'

function App() {
  

  return (
    <>
    <CanvasProvider>
      <CanvasSettingsProvider>
        <CanvasNav/>
        <div className="relative">
          <Canvas/>
          <PdfViewer/>
        </div>
      </CanvasSettingsProvider>
    </CanvasProvider>
    </>
  )
}

export default App
