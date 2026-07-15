import { useState } from 'react'
import type { FormEvent } from 'react'
import type { User } from '../types'

interface UserFormProps {
  onAddUser: (user: User) => void
}

function UserForm({ onAddUser }: UserFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !email || !age) {
      alert('Nem töltötted ki')
      return
    }

    const parsedAge = Number(age)
    if (Number.isNaN(parsedAge)) {
      alert('Kérlek valós kort adj meg')
      return
    }

    onAddUser({ name, email, age: parsedAge })
    setName('')
    setEmail('')
    setAge('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Új felhasználó hozzáadása</h1>
      <input type="text" placeholder="Név" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="number" placeholder="Kor" value={age} onChange={(e) => setAge(e.target.value)} />
      <button type="submit">Hozzáadás</button>
    </form>
  )
}

export default UserForm

