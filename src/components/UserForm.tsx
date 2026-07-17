import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Entity, EntityType } from '../types'

type FieldType = 'text' | 'email' | 'number' | 'date' | 'checkbox'

interface FieldDef {
  name: string
  label: string
  type: FieldType
  required?: boolean
  integer?: boolean
}

interface UserFormProps {
  onAddEntity: (entity: Entity) => void
}

const schema: Record<EntityType, FieldDef[]> = {
  user: [
    { name: 'name', label: 'Név', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'age', label: 'Kor', type: 'number', required: true, integer: true },
    { name: 'race', label: 'Származás', type: 'text' },
    { name: 'height', label: 'Magasság (cm)', type: 'number' },
    { name: 'starSign', label: 'Csillagjegy', type: 'text' },
    { name: 'isRacist', label: 'Rasszista', type: 'checkbox' },
  ],
  animal: [
    { name: 'name', label: 'Név', type: 'text', required: true },
    { name: 'dateOfBirth', label: 'Születési dátum', type: 'date' },
    { name: 'species', label: 'Faj', type: 'text' },
    { name: 'age', label: 'Kor', type: 'number', integer: true },
    { name: 'numberOfLegs', label: 'Lábak száma', type: 'number', integer: true },
  ],
  drink: [
    { name: 'name', label: 'Név', type: 'text', required: true },
    { name: 'isFizzy', label: 'Szénsavas', type: 'checkbox' },
    { name: 'isAlcoholic', label: 'Alkoholos', type: 'checkbox' },
    { name: 'dateOfExpiration', label: 'Lejárat', type: 'date' },
    { name: 'price', label: 'Ár', type: 'number' },
  ],
}

function UserForm({ onAddEntity }: UserFormProps) {
  const getInitialValues = (entityType: EntityType) => {
    const initial: Record<string, string | boolean> = {}
    for (const field of schema[entityType]) {
      initial[field.name] = field.type === 'checkbox' ? false : ''
    }
    return initial
  }

  const [type, setType] = useState<EntityType>('user')
  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    getInitialValues('user'),
  )

  const handleChange = (name: string, value: string | boolean) => {
    setValues((v) => ({ ...v, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fields = schema[type]

    for (const f of fields) {
      const val = values[f.name]
      if (f.required && (val === undefined || val === '' || val === false)) {
        alert(`${f.label} mező kitöltése kötelező`)
        return
      }

      if (f.type === 'number' && val !== undefined && val !== '') {
        const n = Number(val)
        if (Number.isNaN(n)) {
          alert(`${f.label} szám kell legyen`)
          return
        }
        if (f.integer && !Number.isInteger(n)) {
          alert(`${f.label} egész szám kell legyen`)
          return
        }
      }
    }

    const entity: Record<string, unknown> = {}
    for (const f of fields) {
      const raw = values[f.name]
      if (raw === undefined) continue

      if (f.type === 'number') {
        entity[f.name] = Number(raw)
      } else if (f.type === 'date') {
        // convert to Date
        entity[f.name] = new Date(String(raw))
      } else if (f.type === 'checkbox') {
        entity[f.name] = Boolean(raw)
      } else {
        entity[f.name] = String(raw)
      }
    }

    onAddEntity(entity as Entity)

    setValues({})
  }

  const fields = schema[type]

  return (
    <form onSubmit={handleSubmit}>
      <h1>Új adat hozzáadása</h1>

      <label>
        Típus
        <select value={type} onChange={(e) => setType(e.target.value as EntityType)}>
          <option value="user">Személy</option>
          <option value="animal">Állat</option>
          <option value="drink">Ital</option>
        </select>
      </label>

      {fields.map((f) => (
        <div key={f.name} style={{ marginTop: 8 }}>
          <label>
            {f.label}
            {f.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={Boolean(values[f.name])}
                onChange={(e) => handleChange(f.name, e.target.checked)}
              />
            ) : (
              <input
                type={f.type === 'date' ? 'date' : f.type}
                value={typeof values[f.name] === 'boolean' ? undefined : (values[f.name] as string) ?? ''}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            )}
          </label>
        </div>
      ))}

      <button type="submit" style={{ marginTop: 12 }}>
        Hozzáadás
      </button>
    </form>
  )
}

export default UserForm

