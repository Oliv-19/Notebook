import { useState } from 'react'
import { Canvas } from './Canvas/Canvas'
import { CanvasNav } from './Nav/CanvasNav'
import { CanvasProvider } from './Canvas/CanvasContext'
import { CanvasSettingsProvider } from './Canvas/CanvasSettingsContext'
import { PdfViewer } from './Canvas/PdfViewer'
import { Route, Routes } from 'react-router'
import { AuthProvider } from './AuthContext'
import { Auth } from './Auth'
import { Notebooks } from './Notebooks/Notebooks'
import { Notebook } from './Notebooks/Notebook'

function Content(){
  return (
    <>
      <CanvasNav/>
      <div className="relative min-h-screen h-fit">
        <Canvas/>
        <PdfViewer/>
      </div>
    </>
  )
}

function App() {
  return (
    <>
    <AuthProvider>
      <CanvasProvider>
        <CanvasSettingsProvider>
          <div className="overflow-y-hidden">
            <Routes>
                <Route path='/' element={<Content/>} />
                <Route path='/notebooks' element={<Notebooks/>} />
                <Route path='/notebooks/:name' element={<Notebook/>} />
                <Route path='/login' element={<Auth/>} />
            </Routes>
          </div>
        </CanvasSettingsProvider>
      </CanvasProvider>
    </AuthProvider>
    </>
  )
}

export default App
