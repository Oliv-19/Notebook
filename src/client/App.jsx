import { useState } from 'react'
import { Canvas } from './Canvas/Canvas'
import { CanvasNav } from './Nav/CanvasNav'
import { CanvasProvider } from './Canvas/CanvasContext'
import { CanvasSettingsProvider } from './Canvas/CanvasSettingsContext'
import { PdfViewer } from './Canvas/PdfViewer'
import { Route, Routes } from 'react-router'
import { AuthProvider } from './AuthContext'
import { Auth } from './Auth'

function Home (){
  return (
    <>
      <CanvasNav/>
      <div className="relative">
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
          <div className="">
            <Routes>
                <Route path='/' element={<Home/>} />
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
