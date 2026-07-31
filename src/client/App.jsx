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
import { NotebookProvider } from './Notebooks/NotebooksContext'

function Content(){
  return (
    <>
    <div className="flex justify-center items-center w-full">
      <PdfViewer/>
      <div className="h-screen w-full flex flex-col">
        <CanvasNav/>
        <div className="relative h-[92%]">
          <Canvas/>
        </div>
      </div>
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
      <NotebookProvider>
        <CanvasProvider>
          <CanvasSettingsProvider>
            <div className="overflow-y-hidden w-screen">
              <Routes>
                  <Route path='/' element={<Root/>} />
                  <Route path='/notebooks' element={<Notebooks/>} />
                  <Route path='/notebooks/:name' element={<Content/>} />
                  <Route path='/login' element={<Auth/>} />
              </Routes>
            </div>
          </CanvasSettingsProvider>
        </CanvasProvider>
      </NotebookProvider>
    </AuthProvider>
    </>
  )
}

export default App
