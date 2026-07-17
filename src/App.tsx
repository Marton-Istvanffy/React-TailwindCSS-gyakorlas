import { useState } from 'react'
import './App.css'
import UserCard from './components/UserCard.tsx'
import UserForm from './components/UserForm.tsx'
import type { Entity } from './types'

function App() {
  const [entities, setEntities] = useState<Entity[]>([
  ])

  const handleAddEntity = (newEntity: Entity) => {
    setEntities((prev) => [...prev, newEntity])
  }

  return (
    <div>
      <header className="app-header">
        <div className="header-image-frame">
          <img
            src="https://media.istockphoto.com/id/184780378/hu/vektor/horogkereszt-szimb%C3%B3lum-buddhista-hagyom%C3%A1ny-minta.jpg?s=612x612&w=0&k=20&c=_rYdkEttHfyzftMhRqcjXIufOG3ZrL3bnqtQJ60mEfA="
            alt="Buddhista mintás kép"
            className="header-image"
          />
        </div>
        <div>
          <h1>Adatkezelő</h1>
          <p className="header-subtitle">样样, 样样稀松。</p>
        </div>
      </header>

      <div className="content-grid">
        <div className="content-column">
          <UserForm onAddEntity={handleAddEntity} />
        </div>

        <div className="content-column data-column">
          <h2>Regisztrált adatok</h2>
          <div className="data-list">
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
