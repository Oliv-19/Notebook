import { useState } from 'react'
import { Canvas } from './Canvas/Canvas'
import { CanvasNav } from './Nav/CanvasNav'
import { CanvasProvider } from './Canvas/CanvasContext'
import { CanvasSettingsProvider } from './Canvas/CanvasSettingsContext'
import { PdfViewer } from './Canvas/PdfViewer'
import { Navigate, Route, Routes } from 'react-router'
import { AuthProvider, useAuth } from './AuthContext'
import { Auth } from './Auth'
import { Notebooks } from './Notebooks/Notebooks'

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
function Root(){
  const {user, isLoading} = useAuth()
  if(isLoading) return <div>loading...</div>
  return user ? (
      <Navigate to={'/notebooks'} replace/>
  ) : (
    <Navigate to={'/login'} replace/>
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
                <Route path='/' element={<Root/>} />
                <Route path='/notebooks' element={<Notebooks/>} />
                <Route path='/notebooks/:name' element={<Content/>} />
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
