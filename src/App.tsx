import { useState } from 'react'
import UserCard from './components/UserCard.tsx'
import UserForm from './components/UserForm.tsx'
import type { Entity } from './types'

function App() {
  const [entities, setEntities] = useState<Entity[]>([])

  const handleAddEntity = (newEntity: Entity) => {
    setEntities((prev) => [...prev, newEntity])
  }

  return (
    <div className="min-h-screen bg-[#0b1f3a] text-white">
      <header className="mx-auto mb-6 flex max-w-6xl items-center gap-4 rounded-[20px] border border-white/20 bg-gradient-to-r from-[#f5a623] to-[#d96c00] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        <div className="h-22 w-22 rounded-full border border-white/30 bg-gradient-to-br from-[#fff3d6] to-[#7a2e00] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <img
            src="https://static.vecteezy.com/system/resources/previews/020/647/525/original/panda-face-icon-cute-animal-icon-in-circle-png.png"
            alt="Panda"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="m-0 text-2xl font-bold uppercase tracking-[0.04em]">Adatkezelő</h1>
          <p className="mt-1 text-[0.95rem] font-semibold tracking-[0.02em] text-[#fff8e1]">样样, 样样稀松。</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-[minmax(280px,1fr)_minmax(280px,1fr)]">
        <div className="min-w-0">
          <UserForm onAddEntity={handleAddEntity} />
        </div>

        <div className="min-w-0 pt-2">
          <h2 className="mb-4 text-xl font-semibold">Regisztrált adatok</h2>
          <div className="flex flex-col gap-3">
            {entities.map((entity, index) => (
              <UserCard key={index} entity={entity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
