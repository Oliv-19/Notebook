import { useState } from 'react'
import { Canvas } from './Canvas/Canvas'
import { CanvasNav } from './CanvasNav/CanvasNav'
import { CanvasProvider } from './Canvas/CanvasContext'
import { CanvasSettingsProvider } from './Canvas/CanvasSettingsContext'
import { PdfViewer } from './Canvas/PdfViewer'
import { Navigate, Route, Routes } from 'react-router'
import { AuthProvider, useAuth } from './AuthContext'
import { Auth } from './Auth'
import { Notebooks } from './Notebooks/Notebooks'
import { NotebookProvider } from './Notebooks/NotebooksContext'
import { CanvasActionsProvider } from './Canvas/CanvasActionsContext'

function Content(){
  return (
    <>
      <CanvasProvider>
        <CanvasSettingsProvider>
          <CanvasActionsProvider>
            <div className="flex justify-center items-center w-full">
              <PdfViewer/>
              <div className="h-screen w-fit flex flex-col">
                <CanvasNav/>
                <div className="relative h-[92%]">
                  <Canvas/>
                </div>
              </div>
            </div>
          </CanvasActionsProvider>
        </CanvasSettingsProvider>
      </CanvasProvider>
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
        <div className="overflow-y-hidden w-screen">
          <Routes>
              <Route path='/' element={<Root/>} />
              <Route path='/notebooks' element={<Notebooks/>} />
              <Route path='/notebooks/:name' element={<Content/>} />
              <Route path='/login' element={<Auth/>} />
          </Routes>
        </div>
      </NotebookProvider>
    </AuthProvider>
    </>
  )
}

export default App
