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
    { name: 'isAdult', label: 'Felnőtt-e?', type: 'checkbox' },
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
        if (f.name === 'age' && (n < 0 || n > 120)) {
          alert('A kor értéke 0 és 120 között kell legyen')
          return
        }
        if(f.name === 'height' && (n < 150 || n > 220)){
          alert('A magasság legyen 150 és 220 cm között.')
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


    onAddEntity(entity as unknown as Entity)
    setValues({})
  }

  const fields = schema[type]

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-[18px] bg-gradient-to-br from-[#f8b24f] to-[#f4d9a0] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
    >
      <h1 className="mb-3 text-xl font-bold text-[#7a2e00]">Új adat hozzáadása</h1>

      <label className="mt-3 flex flex-col gap-2 text-sm font-semibold text-[#4a1d00]">
        Típus
        <select
          value={type}
          onChange={(e) => setType(e.target.value as EntityType)}
          className="rounded-[10px] border-2 border-[#7a2e00] bg-[#fff7e8] px-3 py-2 text-[#3f1b00] shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] focus:border-[#d62828] focus:outline-none focus:ring-0"
        >
          <option value="user">Személy</option>
          <option value="animal">Állat</option>
          <option value="drink">Ital</option>
        </select>
      </label>

      {fields.map((f) => (
        <div key={f.name} className="mt-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#4a1d00]">
            {f.label}
            {f.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={Boolean(values[f.name])}
                onChange={(e) => handleChange(f.name, e.target.checked)}
                className="h-4 w-4 accent-[#d62828]"
              />
            ) : (
              <input
                type={f.type === 'date' ? 'date' : f.type}
                min={f.name === 'age' || f.name === 'price' ? '0' : f.name === 'height' ? '150' : undefined}
                max={f.name === 'age' ? '120' : f.name === 'height' ? '220' : undefined}
                value={typeof values[f.name] === 'boolean' ? undefined : (values[f.name] as string) ?? ''}
                onChange={(e) => handleChange(f.name, e.target.value)}
                className="rounded-[10px] border-2 border-[#7a2e00] bg-[#fff7e8] px-3 py-2 text-[#3f1b00] shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] focus:border-[#d62828] focus:outline-none focus:ring-0"
              />
            )}
          </label>
        </div>
      ))}

      <button
        type="submit"
        className="mt-4 rounded-full border-2 border-[#d62828] bg-[#fff3f3] px-4 py-2 font-bold text-[#d62828] transition hover:bg-[#ffe2e2]"
      >
        Hozzáadás
      </button>
    </form>
  )
}

export default UserForm

