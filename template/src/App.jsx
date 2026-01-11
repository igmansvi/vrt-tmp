import React from 'react'
import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'
import tailwindLogo from './assets/tailwindcss.svg'

const App = () => {
  return (
    <div className="h-screen bg-linear-to-br from-slate-950 to-slate-900 text-white flex flex-col justify-center items-center gap-10">
      <div className="flex items-center gap-6">
        <img src={viteLogo} alt="Vite" className="w-20 h-20" />
        <span className="text-3xl font-light text-gray-400">+</span>
        <img src={reactLogo} alt="React" className="w-20 h-20" />
      </div>

      <h1 className="text-5xl font-bold tracking-tight">Vite + React</h1>

      <div className="flex flex-col items-center gap-4">
        <img src={tailwindLogo} alt="Tailwind CSS" className="w-20 h-20" />
        <p className="text-3xl font-bold text-gray-300">Tailwind CSS</p>
      </div>
    </div>
  )
}

export default App;