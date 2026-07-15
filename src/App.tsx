import { useState } from 'react'
import './App.css'
import UserCard from './components/UserCard.tsx'
import UserForm from './components/UserForm.tsx'
// A User tulajdonságai ki lettek rakva egy külön types.ts fájlba, így importálni kell a User típust az App komponensben is.
import type { User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([
    { name: 'Teszt Elek', email: 'teszt@elek.hu', age: 30 }
  ])

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser])
  }

  return (
    <div>
      <h1>Felhasználó kezelő</h1>
      <UserForm onAddUser={handleAddUser} />
      <hr />
      <h2>Regisztrált felhasználók</h2>
      <div>
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  )
}

export default App
